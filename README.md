# Magenta Bookstore (Frontend-Only, React)

A comprehensive online bookstore with a modern dark-themed admin panel for managing users, books, orders, and more. **No backend required**—all data is stored in your browser using Web Storage (localStorage).

## Features

### Frontend
- **Modern Dark Theme**: Beautiful dark UI with gradients and modern design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **User Authentication**: Secure login and registration system (browser-based)
- **Shopping Cart**: Full cart functionality with real-time updates
- **Book Management**: Browse, search, and purchase books
- **Order Management**: Complete order tracking and history

### Admin Panel
- **Secure Admin Login**: Separate admin authentication system
- **Dashboard**: Real-time statistics and overview
- **User Management**: Add, edit, delete, and manage user accounts
- **Book Management**: Upload, edit, and manage book inventory
- **Order Management**: Track and update order statuses
- **Category Management**: Organize books by categories
- **Reports & Analytics**: Sales reports and user analytics
- **File Upload**: Support for book cover images (stored in localStorage)

## Admin Panel Features

### Dashboard
- Total users, books, orders, and revenue statistics
- Recent orders and user registrations
- Quick access to all admin functions

### User Management
- View all registered users
- Add new users with custom roles
- Edit user information and status
- Delete users with confirmation
- Search and filter users

### Book Management
- Upload new books with cover images
- Edit book details, prices, and stock
- Manage book categories and authors
- Bulk operations for inventory
- Image upload and management

### Order Management
- View all orders with customer details
- Update order status and payment status
- Order history and tracking
- Order analytics and reports

### Category Management
- Create and manage book categories
- Hierarchical category structure
- Category-based book organization

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd project-master
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**No backend or database setup is required. All data is stored in your browser using localStorage.**

## File Structure

```
project-master/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/           # Shared UI components (Button, Modal, Loader, etc.)
│   │   └── ...
│   ├── context/              # React Context for Auth, Cart, Data
│   ├── pages/                # All user and admin pages
│   ├── styles/               # CSS for theme, responsive, modal
│   ├── utils/                # Web Storage helpers, data seeding
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Usage

### User
- Register or log in as a user
- Browse and search books
- Add books to your cart and proceed to checkout
- View your order history and manage your profile

### Admin
- Log in as an admin (default admin: `admin@site.com` / `admin`)
- Access the admin dashboard for real-time stats
- Manage users, books, orders, and categories
- Upload book cover images (stored in localStorage)
- View sales reports and analytics

## Data Storage & Security
- All data (users, books, orders, categories, cart) is stored in your browser's localStorage
- No data is sent to a server or external database
- Authentication and role-based access are simulated in the frontend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team. 