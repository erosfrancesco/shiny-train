import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '@components/ProfileHeader';
import AvailabilityCalendar from '@components/AvailabilityCalendar';
import ServiceCard from '@components/ServiceCard';
import ReviewCard from '@components/ReviewCard';
import BookingForm from '@components/BookingForm';
import { fetchAvailability, fetchProfileById, fetchReviews, fetchServices } from '@services/profileService';
import { createBooking } from '@services/bookingService';
import { useToastStore } from '@store/uiStore';
import type { Profile, Service, Availability, Review } from '@codeTypes/index';

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([fetchProfileById(id), fetchServices(id), fetchAvailability(id), fetchReviews(id)])
      .then(([profileData, serviceData, availabilityData, reviewData]) => {
        setProfile(profileData);
        setServices(serviceData);
        setAvailability(availabilityData);
        setReviews(reviewData);
        setSelectedService(serviceData[0]?.id ?? '');
      })
      .catch((error) => showToast(error.message || 'Errore nel caricamento del profilo', 'error'))
      .finally(() => setLoading(false));
  }, [id, showToast]);

  const handleBook = async (payload: { serviceId: string; date: string; time: string; notes: string }) => {
    if (!profile) return;
    setBookingLoading(true);
    const { data, error } = await createBooking({
      client_id: 'client-1',
      professional_id: profile.id,
      service_id: payload.serviceId,
      booking_date: payload.date,
      booking_time: payload.time,
      notes: payload.notes,
    });
    setBookingLoading(false);
    if (error) {
      showToast('Impossibile inviare la richiesta di prenotazione', 'error');
      return;
    }
    showToast('Richiesta di prenotazione inviata con successo', 'success');
  };

  if (loading) {
    return <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">Caricamento profilo...</div>;
  }

  if (!profile) {
    return <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">Profilo non trovato.</div>;
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-8">
        <ProfileHeader profile={profile} />
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Informazioni</h2>
          <p className="mt-4 text-slate-600">{profile.bio}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {profile.certifications.map((cert) => (
              <span key={cert} className="rounded-3xl bg-blueglass px-4 py-3 text-sm text-slate-700">{cert}</span>
            ))}
          </div>
        </section>
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recensioni</h2>
              <p className="text-sm text-slate-500">Feedback dei clienti da appuntamenti recenti.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {reviews.length === 0 ? <p className="text-slate-500">Ancora nessuna recensione.</p> : reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        </section>
      </div>
      <div className="space-y-6">
        <AvailabilityCalendar availability={availability} />
        <div className="space-y-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Servizi</h2>
            <p className="text-sm text-slate-500">Seleziona un servizio per la richiesta di appuntamento.</p>
          </div>
          <div className="grid gap-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} selected={service.id === selectedService} onSelect={() => setSelectedService(service.id)} />
            ))}
          </div>
        </div>
        <BookingForm services={services} onBook={handleBook} />
      </div>
    </div>
  );
}
