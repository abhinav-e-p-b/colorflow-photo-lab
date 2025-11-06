# LUTify - Photo Color Grading Application

A modern, web-based photo editing application that allows users to apply cinematic color grading to their photos using LUT (Look-Up Table) files. Built with React, TypeScript, and Supabase.

![LUTify](https://img.shields.io/badge/LUTify-Photo%20Editing-ff6b6b)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38bdf8)

## 🌟 Features

### Core Functionality
- **Photo Upload**: Support for multiple image formats (JPG, PNG, HEIF)
- **Camera Capture**: Direct photo capture from device camera
- **LUT Processing**: Apply professional color grading using .cube and .3dl LUT files
- **Intensity Control**: Adjust LUT effect intensity with a smooth slider (0-100%)
- **Before/After Comparison**: Toggle between original and edited images
- **Side-by-Side View**: Resizable panels for comparing original and processed images

### User Interface
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Fully responsive layout for mobile and desktop
- **Modern UI Components**: Built with shadcn/ui and Radix UI primitives
- **Smooth Animations**: Polished transitions and interactive elements
- **Wave Effect**: Fun animated wave background feature

### Export & Share
- **Download**: Save edited images as high-quality JPEGs
- **Social Sharing**: Share directly to social media platforms
- **Web Share API**: Native sharing on supported devices

### Authentication
- **Secure Login/Signup**: Powered by Supabase Auth
- **Password Reset**: Email-based password recovery
- **Protected Routes**: Authenticated access to editing features
- **User Sessions**: Persistent login state

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lutify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `src/integrations/supabase/client.ts` with your credentials

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 📁 Project Structure

```
lutify/
├── src/
│   ├── components/          # React components
│   │   ├── editor/         # Editor-specific components
│   │   │   ├── EditorContext.tsx
│   │   │   ├── EditorLayout.tsx
│   │   │   └── ImageDisplay.tsx
│   │   ├── ui/             # Reusable UI components (shadcn)
│   │   ├── Editor.tsx
│   │   ├── EditorControls.tsx
│   │   ├── Header.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── LutUploader.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WaveBackground.tsx
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/       # External service integrations
│   │   └── supabase/
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── PasswordReset.tsx
│   │   └── UpdatePassword.tsx
│   ├── utils/              # Utility functions
│   │   ├── imageProcessor.ts
│   │   └── lutProcessor.ts
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Technology Stack

### Frontend Framework
- **React 18.3.1**: UI library with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development
- **Vite 5.4.1**: Fast build tool and dev server

### Styling
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **Radix UI**: Unstyled, accessible component primitives

### State Management
- **React Context API**: Global state management for auth and theme
- **React Query**: Server state management

### Authentication
- **Supabase Auth**: Secure authentication and user management

### Routing
- **React Router 6.26.2**: Client-side routing

### UI Components
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications
- **Embla Carousel**: Smooth carousel functionality

## 🔧 Configuration

### Environment Variables
While the current setup includes hardcoded Supabase credentials, for production, you should use environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tailwind Configuration
Custom theme colors and utilities are defined in `tailwind.config.ts`:
- Custom editor colors (dark, darker, accent, muted)
- Dark/light mode support
- Custom animations (fade-in, slide-up, wave)

## 🎯 Key Components

### EditorContext
Central state management for the editor, providing:
- Image and LUT file management
- Intensity control
- Canvas references for original and processed images
- Share and save functionality
- Fullscreen toggle

### ImageProcessor
Utilities for image manipulation:
- `loadImageToCanvas()`: Load images onto HTML canvas
- `cloneCanvas()`: Create canvas copies
- `exportCanvasImage()`: Export canvas as image data
- `downloadCanvasImage()`: Download edited images
- `shareCanvasImage()`: Native share functionality

### LutProcessor
LUT file handling (placeholder implementation):
- `validateLutFile()`: Validate .cube and .3dl files
- `applyLutToCanvas()`: Apply color grading to images
- `parseLutFile()`: Parse LUT file formats

## 🎨 Theming

The application supports both dark and light themes:

### Dark Theme (Default)
- Background: `#121212`
- Accent: `#ff6b6b`
- Text: White/Light gray

### Light Theme
- Background: White
- Accent: `#ff6b6b`
- Text: Dark slate

Theme preference is:
1. Stored in localStorage
2. Synced with system preferences
3. Persistent across sessions

## 🔐 Authentication Flow

1. **Registration**: Users sign up with email and password
2. **Email Verification**: Supabase sends verification email
3. **Login**: Authenticated users access the editor
4. **Password Reset**: Email-based password recovery
5. **Session Management**: Automatic session handling

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Gestures**: Full touch support for mobile devices
- **Adaptive Layouts**: Components adjust to screen size

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Lovable
The project is configured for deployment on Lovable.dev:
- URL: https://lovable.dev/projects/39b747e7-0e61-4b98-b0c9-4bdf1df78bbd
- Auto-deployment from main branch
- Custom domain support available

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build in development mode
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Code Style
- ESLint configuration for React and TypeScript
- Prettier recommended for code formatting
- Tailwind CSS for styling consistency

## 🔮 Future Enhancements

### Planned Features
1. **Advanced LUT Processing**: Full WebGL-based LUT implementation
2. **Preset Filters**: Built-in color grading presets
3. **Batch Processing**: Edit multiple images at once
4. **History/Undo**: Multi-level undo/redo functionality
5. **Cloud Storage**: Save edited images to cloud
6. **Collaboration**: Share and collaborate on edits
7. **Advanced Adjustments**: Brightness, contrast, saturation controls
8. **Custom LUT Creation**: Build your own LUTs

## 🐛 Known Issues

1. **LUT Processing**: Current implementation is a placeholder; full LUT parsing not yet implemented
2. **Large Files**: May experience performance issues with very large images
3. **Browser Compatibility**: Web Share API not supported in all browsers

## 📄 License

This project is part of a Lovable.dev project. Please refer to the project's license agreement.

## 🤝 Contributing

Since this is a Lovable.dev project, contributions are managed through the Lovable platform. You can:
1. Use Lovable's prompting interface
2. Clone and make changes locally
3. Push changes that sync with Lovable

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Radix UI** for accessible primitives
- **Supabase** for authentication infrastructure
- **Lovable.dev** for the development platform

## 📞 Support

For support and questions:
- Check the [Lovable documentation](https://docs.lovable.dev)
- Visit the project URL: https://lovable.dev/projects/39b747e7-0e61-4b98-b0c9-4bdf1df78bbd

---

**Built with ❤️ using React, TypeScript, and Lovable.dev**