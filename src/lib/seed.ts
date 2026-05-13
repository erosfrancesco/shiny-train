import type { Availability, Booking, Profile, Review, Service } from '../types';

export const sampleProfiles: Profile[] = [
  {
    id: 'pro-1',
    role: 'professional',
    full_name: 'Dr. Serena Hale',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    city: 'Rome',
    profession: 'Physical Therapist',
    bio: 'Expert in rehabilitation and mobility coaching. Warm, evidence-based care for every body.',
    rating: 4.9,
    reviews_count: 42,
    categories: ['Physiotherapy', 'Posture', 'Sports Therapy'],
    certifications: ['DPT', 'Board Certified', 'Manual Therapy'],
    created_at: '2025-11-09',
  },
  {
    id: 'pro-2',
    role: 'professional',
    full_name: 'Noah Rivera',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    city: 'Rome',
    profession: 'Clinical Psychologist',
    bio: 'Compassionate therapy for stress, anxiety, and personal growth. Flexible appointment planning.',
    rating: 4.8,
    reviews_count: 31,
    categories: ['Psychology', 'Counseling', 'Wellness'],
    certifications: ['PhD Psychology', 'CBT Specialist'],
    created_at: '2025-09-14',
  },
  {
    id: 'pro-3',
    role: 'association',
    full_name: 'HealWell Care Collective',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    city: 'Rome',
    profession: 'Healthcare Association',
    bio: 'Network of nurses and wellness experts offering community support and guided care plans.',
    rating: 4.7,
    reviews_count: 18,
    categories: ['Community Care', 'Nursing', 'Wellness'],
    certifications: ['Accredited Provider', 'Local Health Network'],
    created_at: '2025-06-22',
  }
];

export const sampleServices: Service[] = [
  {
    id: 'svc-1',
    professional_id: 'pro-1',
    title: 'Injury Recovery Session',
    description: 'Personalized exercise plan and hands-on therapy for fast recovery.',
    duration_minutes: 60,
    price_label: 'From 45 min',
  },
  {
    id: 'svc-2',
    professional_id: 'pro-1',
    title: 'Posture Alignment Consult',
    description: 'Guided assessment and mobility exercises for daily posture improvement.',
    duration_minutes: 45,
    price_label: 'From 30 min',
  },
  {
    id: 'svc-3',
    professional_id: 'pro-2',
    title: 'Stress & Anxiety Coaching',
    description: 'Supportive counseling with tools for resilience and emotional wellness.',
    duration_minutes: 50,
    price_label: 'From 50 min',
  },
  {
    id: 'svc-4',
    professional_id: 'pro-3',
    title: 'Nursing Support Visit',
    description: 'Home-based nursing care plan and follow-up coordination for families.',
    duration_minutes: 60,
    price_label: 'From 60 min',
  }
];

export const sampleAvailability: Availability[] = [
  { id: 'avail-1', professional_id: 'pro-1', weekday: 'Monday', start_time: '08:00', end_time: '16:00' },
  { id: 'avail-2', professional_id: 'pro-1', weekday: 'Wednesday', start_time: '10:00', end_time: '18:00' },
  { id: 'avail-3', professional_id: 'pro-2', weekday: 'Tuesday', start_time: '09:00', end_time: '15:00' },
  { id: 'avail-4', professional_id: 'pro-2', weekday: 'Thursday', start_time: '12:00', end_time: '19:00' },
  { id: 'avail-5', professional_id: 'pro-3', weekday: 'Friday', start_time: '08:00', end_time: '14:00' }
];

export const sampleBookings: Booking[] = [
  {
    id: 'book-1',
    client_id: 'client-1',
    professional_id: 'pro-1',
    service_id: 'svc-1',
    booking_date: '2026-05-18',
    booking_time: '10:00',
    status: 'pending',
    notes: 'Need help with lower back pain after running.',
    created_at: '2026-05-01'
  },
  {
    id: 'book-2',
    client_id: 'client-1',
    professional_id: 'pro-2',
    service_id: 'svc-3',
    booking_date: '2026-05-24',
    booking_time: '14:00',
    status: 'accepted',
    notes: 'Intro session for coping tools.',
    created_at: '2026-04-28'
  }
];

export const sampleReviews: Review[] = [
  { id: 'rev-1', booking_id: 'book-2', reviewer_name: 'Emily Harper', rating: 5, comment: 'Very attentive and practical advice. Felt supported from the first session.' },
  { id: 'rev-2', booking_id: 'book-1', reviewer_name: 'Alex Kim', rating: 4, comment: 'Great communication and a calm environment. Helped me understand my recovery plan.' }
];
