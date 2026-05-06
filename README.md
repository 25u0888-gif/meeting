# Lumina Scheduler - Meeting Booking Application

A modern meeting scheduler application built with React, Vite, and advanced animations.

## Project Structure

```
frontend2/
├── frontend/
│   └── lumina-scheduler/    # Main React Vite application
│       ├── src/
│       │   ├── pages/       # Page components
│       │   ├── components/  # Reusable components
│       │   ├── assets/      # Static assets
│       │   ├── App.jsx      # Main app component
│       │   └── main.jsx     # Entry point
│       ├── public/          # Public static files
│       ├── package.json     # Dependencies
│       └── vite.config.js   # Vite configuration
├── vercel.json              # Vercel deployment configuration
└── package.json             # Root package.json for workspace
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
cd frontend/lumina-scheduler
npm install
```

### Development

```bash
# Run development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel
```

### Option 2: Using Git Integration

1. Push your code to GitHub
2. Import the project in Vercel dashboard (vercel.com)
3. Configure build settings:
   - **Build Command:** `cd frontend/lumina-scheduler && npm run build`
   - **Output Directory:** `frontend/lumina-scheduler/dist`
4. Deploy

### Environment Variables

Create a `.env.local` file in `frontend/lumina-scheduler/`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Lumina Scheduler
```

For Vercel production, add these environment variables in the Vercel dashboard.

## Features

- 🎨 Beautiful UI with animations and gradients
- 📱 Responsive design
- 🔐 User authentication
- 📅 Meeting scheduling
- 👥 Organization management
- ⚡ Built with Vite for fast development

## Technologies

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics
- **GSAP** - Animation library
- **Lucide React** - Icon library

## License

MIT
