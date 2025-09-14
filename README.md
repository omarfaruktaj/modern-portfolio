# Modern Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring smooth animations, dark mode, and a beautiful UI.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-green)](https://greensock.com/gsap/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1-purple)](https://www.radix-ui.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)

## Overview

This portfolio website showcases a modern web development stack with smooth animations, responsive design, and a focus on user experience. It features a clean, minimalist design with interactive components and seamless navigation.

## Features

- 🎨 **Modern UI/UX** - Clean and professional design with attention to detail
- 🌓 **Dark/Light Mode** - Automatic and manual theme switching
- 🎭 **GSAP Animations** - Smooth scroll animations and transitions
- 📱 **Fully Responsive** - Works perfectly on all screen sizes
- 💼 **Project Showcase** - Dynamic project gallery with detailed views
- 📝 **Blog Section** - Integrated blog with markdown support
- 📬 **Contact Form** - Interactive contact form with email integration
- 🎯 **Custom Cursor** - Smooth follower cursor with interactive effects
- 🏃 **Performance Optimized** - Fast loading times and smooth interactions

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) with custom animations
- **UI Components:** [Radix UI](https://www.radix-ui.com/) for accessible components
- **Animations:** [GSAP](https://greensock.com/gsap/) for smooth animations
- **Form Handling:** React Hook Form with Zod validation
- **Icons:** Tabler Icons React
- **Linting:** ESLint with custom configuration
- **Code Quality:** TypeScript strict mode enabled

## Project Structure

````
src/
├── app/                # Next.js App Router
│   ├── (main)/        # Main route group
│   │   ├── page.tsx   # Homepage
│   │   ├── projects/  # Projects section
│   │   └── blogs/     # Blog section
├── components/         # Reusable components
│   ├── ui/            # UI components
│   └── effects/       # Animation effects
├── data/              # Static data
└── lib/               # Utility functions

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/omarfaruktaj/modern-portfolio.git
   cd modern-portfolio
````

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_EMAIL_SERVICE=your_email_service
   NEXT_PUBLIC_EMAIL_TEMPLATE=your_template_id
   NEXT_PUBLIC_EMAIL_USER=your_user_id
   ```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Create a production build:

```bash
pnpm build
# or
npm run build
```

### Production

Run the production server:

```bash
pnpm start
# or
npm start
```

## Deployment

The project can be deployed to any platform that supports Next.js applications. Some recommended platforms:

- [Vercel](https://vercel.com) (Recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository
2. Import your repository on Vercel
3. Add your environment variables
4. Click "Deploy"

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Team](https://nextjs.org)
- [Radix UI](https://www.radix-ui.com)
- [GSAP](https://greensock.com/gsap)
- All open-source contributors

---

```
pnpm dev
```

# or

```
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Simply connect your GitHub repository and deploy with a click.

## Attribution

This project incorporates and builds upon several open-source components and inspirations:

### Theme Effect Component

- Original concept by [rudrodip](https://github.com/rudrodip/theme-toggle-effect)
- Inspired by Skiper 26 Theme_buttons_002 by [@gurvinder-singh02](https://gxuri.in)
- Uses [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/)

### UI Components and Design

- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [GSAP](https://greensock.com/gsap/) - Professional-grade animation library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

### Development Framework

- [Next.js](https://nextjs.org/) - React framework by Vercel
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

Special thanks to all the creators and maintainers of these amazing tools and libraries that made this project possible.

Built with ❤️ by [Omar Faruk](https://github.com/omarfaruktaj)
