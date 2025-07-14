// data.js - Initial data seeding for the app
import { storage } from './storage';

const initialData = {
  users: [
    { id: 1, name: 'Admin', email: 'admin@site.com', password: 'admin', role: 'admin', createdAt: Date.now() },
    { id: 2, name: 'User', email: 'user@site.com', password: 'user', role: 'user', createdAt: Date.now() },
  ],
  books: [],
  categories: [],
  orders: [],
};

export function seedData() {
  Object.entries(initialData).forEach(([key, value]) => {
    if (!storage.get(key)) {
      storage.set(key, value);
    }
  });
} 