export type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Horror'
  | 'Sci-Fi'
  | 'Animation'
  | 'Romance';

export const GENRES: Genre[] = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Animation',
  'Romance',
];

export type MovieStatus = 'now_showing' | 'coming_soon';

export interface Movie {
  id: string;
  title: string;
  genres: Genre[];
  durationMin: number;
  ageRating: string;
  score: number;
  releaseYear: number;
  releaseLabel: string;
  language: string;
  director: string;
  cast: string[];
  synopsis: string;
  color: string;
  status: MovieStatus;
}

export interface Cinema {
  id: string;
  name: string;
  area: string;
  address: string;
  amenities: Amenity[];
}

export type Amenity = 'IMAX' | 'VIP' | '4DX' | 'Parking' | 'Food court';

export type ScreenFormat = 'Standard' | 'IMAX' | 'VIP' | '4DX';

export interface CinemaScreen {
  id: string;
  cinemaId: string;
  name: string;
  format: ScreenFormat;
  rows: number;
  seatsPerRow: number;
}

export type SeatCategory = 'standard' | 'premium' | 'vip';

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  screenId: string;
  startsAt: string;
  prices: Record<SeatCategory, number>;
}

export type SeatStatus = 'available' | 'booked';

export interface Seat {
  id: string;
  row: string;
  number: number;
  category: SeatCategory;
  status: SeatStatus;
  price: number;
}

export type PaymentMethod = 'card' | 'wallet' | 'fawry';

export type BookingStatus = 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  showtimeId: string;
  movieId: string;
  movieTitle: string;
  posterColor: string;
  cinemaName: string;
  screenName: string;
  startsAt: string;
  seats: string[];
  total: number;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
