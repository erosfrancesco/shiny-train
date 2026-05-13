-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('client', 'professional', 'association')),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  city TEXT NOT NULL,
  profession TEXT,
  bio TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  categories TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price_label TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create availability table
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  weekday TEXT NOT NULL CHECK (weekday IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  professional_id UUID REFERENCES profiles(id),
  service_id UUID REFERENCES services(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_city ON profiles(city);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_services_professional_id ON services(professional_id);
CREATE INDEX idx_availability_professional_id ON availability(professional_id);
CREATE INDEX idx_bookings_client_id ON bookings(client_id);
CREATE INDEX idx_bookings_professional_id ON bookings(professional_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);

-- Row Level Security Policies
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Services: Only professionals can manage their services
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Professionals can insert their services" ON services FOR INSERT WITH CHECK (auth.uid() = professional_id);
CREATE POLICY "Professionals can update their services" ON services FOR UPDATE USING (auth.uid() = professional_id);
CREATE POLICY "Professionals can delete their services" ON services FOR DELETE USING (auth.uid() = professional_id);

-- Availability: Only professionals can manage their availability
CREATE POLICY "Availability is viewable by everyone" ON availability FOR SELECT USING (true);
CREATE POLICY "Professionals can insert their availability" ON availability FOR INSERT WITH CHECK (auth.uid() = professional_id);
CREATE POLICY "Professionals can update their availability" ON availability FOR UPDATE USING (auth.uid() = professional_id);
CREATE POLICY "Professionals can delete their availability" ON availability FOR DELETE USING (auth.uid() = professional_id);

-- Bookings: Clients can create bookings, professionals can update status
CREATE POLICY "Bookings are viewable by involved parties" ON bookings FOR SELECT USING (
  auth.uid() = client_id OR auth.uid() = professional_id
);
CREATE POLICY "Clients can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Involved parties can update bookings" ON bookings FOR UPDATE USING (
  auth.uid() = client_id OR auth.uid() = professional_id
);

-- Reviews: Only after booking completion, viewable by everyone
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Clients can create reviews for their completed bookings" ON reviews FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = reviews.booking_id
    AND bookings.client_id = auth.uid()
    AND bookings.status = 'accepted'
  )
);

-- Function to update profile stats after review
CREATE OR REPLACE FUNCTION update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET
    rating = (
      SELECT AVG(rating)::DECIMAL(2,1)
      FROM reviews
      WHERE booking_id IN (
        SELECT id FROM bookings WHERE professional_id = NEW.professional_id
      )
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE booking_id IN (
        SELECT id FROM bookings WHERE professional_id = NEW.professional_id
      )
    )
  WHERE id = NEW.professional_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profile rating when review is added
CREATE TRIGGER update_profile_rating_trigger
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_profile_rating();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();