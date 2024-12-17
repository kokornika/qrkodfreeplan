# Digital Business Card Generator

A modern web application for creating and managing digital business cards with QR codes.

## Features

- Digital business card creation
- QR code generation
- Stripe payment integration
- Email notifications
- Responsive design
- Multi-language support

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables
4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_OWNER=your_github_username
VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_USER_ID=your_emailjs_user_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── lib/           # Core functionality
│   ├── pages/         # Page components
│   ├── types/         # TypeScript types
│   └── styles/        # CSS styles
├── netlify/
│   └── functions/     # Serverless functions
└── public/            # Static assets
```

## License

MIT