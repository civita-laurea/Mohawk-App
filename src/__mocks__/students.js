import { v4 as uuid } from 'uuid';

// Test student data
export default [
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street',
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Hidden',
      city: 'Hidden',
      street: 'Hidden',
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'Hidden',
    name: 'BIO10101S23',
    phone: 'Hidden',
  },
];
