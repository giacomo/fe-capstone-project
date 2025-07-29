# Little Lemon Restaurant

![Little Lemon Logo](./src/assets/logo.svg)

## 📋 Overview

Little Lemon is a modern, responsive web application for a Mediterranean restaurant, allowing customers to browse the menu, learn about the restaurant, and make table reservations online.

## ✨ Features

- **Interactive Menu Display** - Showcase restaurant specials with beautiful images and descriptions
- **Table Reservation System** - Complete booking form with validation and confirmation
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **Testimonials Section** - Display customer reviews and ratings
- **About Section** - Information about the restaurant and its chefs

## 🛠️ Technologies

- **React 19** - Frontend library for building the user interface
- **React Router** - For handling navigation between pages
- **Formik & Yup** - Form handling and validation
- **CSS3** - Custom styling with responsive design principles
- **Jest & React Testing Library** - For component and integration testing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/little-lemon.git
   cd little-lemon
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`.

## 📱 Usage

### Home Page
Browse restaurant highlights, special dishes, and testimonials from satisfied customers.

### Reservations
Make a table reservation by filling out the booking form with your details:
- Name and contact information
- Preferred date and time
- Number of guests
- Special occasion

After submission, you'll receive a confirmation with your booking details.

## 🧪 Testing

Run the test suite to ensure all components work as expected:

```bash
npm test
```

The project includes tests for:
- Form validation
- Component rendering
- User interactions
- API integration

## 📂 Project Structure

```
src/
├── assets/            # Images and static resources
├── components/        # Reusable UI components
│   ├── About/         # Restaurant information section
│   ├── BookingForm/   # Reservation form component
│   ├── Footer/        # Site footer
│   ├── Header/        # Navigation and branding
│   ├── Hero/          # Hero banner component
│   ├── Main/          # Main content wrapper
│   ├── MealCard/      # Menu item display
│   ├── Specials/      # Featured dishes section
│   └── Testimonials/  # Customer reviews section
├── pages/             # Full page components
│   ├── BookingPage    # Reservation page
│   ├── ConfirmedBookingPage # Booking confirmation
│   ├── HomePage       # Landing page
│   └── NotFoundPage   # 404 error page
└── App.js             # Main application component
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Images and inspiration from the real Little Lemon restaurant
- React team for the amazing framework
- All contributors who have helped improve this project
