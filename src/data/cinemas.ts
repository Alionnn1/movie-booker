import { Cinema, CinemaScreen } from '../models/types';

export const CINEMAS: Cinema[] = [
  {
    id: 'c1',
    name: 'Nile Cinemas – Maadi',
    area: 'Maadi',
    address: 'Road 9, Maadi, Cairo',
    amenities: ['IMAX', 'Parking', 'Food court'],
  },
  {
    id: 'c2',
    name: 'Cairo Star Cinema – New Cairo',
    area: 'New Cairo',
    address: 'Fifth Settlement, New Cairo',
    amenities: ['VIP', '4DX', 'Parking'],
  },
  {
    id: 'c3',
    name: 'Skyline Cinema – 6th October',
    area: '6th October',
    address: 'Central Axis, 6th of October City',
    amenities: ['Parking', 'Food court'],
  },
  {
    id: 'c4',
    name: 'Heliopolis Palace Cinema',
    area: 'Heliopolis',
    address: 'Korba, Heliopolis, Cairo',
    amenities: ['IMAX', 'VIP'],
  },
];

export const SCREENS: CinemaScreen[] = [
  { id: 'c1-s1', cinemaId: 'c1', name: 'Screen 1', format: 'IMAX', rows: 8, seatsPerRow: 10 },
  { id: 'c1-s2', cinemaId: 'c1', name: 'Screen 2', format: 'Standard', rows: 8, seatsPerRow: 10 },
  { id: 'c2-s1', cinemaId: 'c2', name: 'Screen 1', format: 'VIP', rows: 8, seatsPerRow: 10 },
  { id: 'c2-s2', cinemaId: 'c2', name: 'Screen 2', format: '4DX', rows: 8, seatsPerRow: 10 },
  { id: 'c2-s3', cinemaId: 'c2', name: 'Screen 3', format: 'Standard', rows: 8, seatsPerRow: 10 },
  { id: 'c3-s1', cinemaId: 'c3', name: 'Screen 1', format: 'Standard', rows: 8, seatsPerRow: 10 },
  { id: 'c3-s2', cinemaId: 'c3', name: 'Screen 2', format: 'Standard', rows: 8, seatsPerRow: 10 },
  { id: 'c4-s1', cinemaId: 'c4', name: 'Screen 1', format: 'IMAX', rows: 8, seatsPerRow: 10 },
  { id: 'c4-s2', cinemaId: 'c4', name: 'Screen 2', format: 'VIP', rows: 8, seatsPerRow: 10 },
];
