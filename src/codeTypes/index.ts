export type Role = 'client' | 'professional' | 'association';

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
  avatar_url: string;
  city: string;
  profession: string;
  bio: string;
  rating: number;
  reviews_count: number;
  categories: string[];
  certifications: string[];
  created_at: string;
}

export interface Service {
  id: string;
  professional_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  price_label: string;
}

export interface Availability {
  id: string;
  professional_id: string;
  weekday: string;
  start_time: string;
  end_time: string;
}

export type BookingStatus = 'pending' | 'accepted' | 'rejected';

export interface Booking {
  id: string;
  client_id: string;
  professional_id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  status: BookingStatus;
  notes: string;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
}

export interface FilterState {
  query: string;
  category: string;
  city: string;
}
