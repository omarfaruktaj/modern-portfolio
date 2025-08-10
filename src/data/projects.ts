const projects = [
  {
    id: 1,
    title: "Bazaaro",
    tagline:
      "A responsive and intuitive multi-role e-commerce platform for customers, vendors, and administrators.",
    description:
      "Bazaaro is a full-featured multi-role e-commerce platform designed to provide a seamless experience for customers, vendors, and admins. It addresses the common UX issues in typical marketplaces by offering dedicated dashboards, Stripe-based checkout, and intelligent cart behavior. Built with React, TypeScript, and Redux Toolkit Query, it ensures scalable frontend logic, smooth vendor management, and secure JWT-based authentication.",
    images: ["/projects/1.png"],

    features: [
      "Flash sale and featured product highlights on Home",
      "Detailed product views with vendor and review data",
      "Vendor shop pages with follow/unfollow and cart integration",
      "Single-vendor cart restriction and replacement logic",
      "Stripe-powered checkout with coupon support",
      "JWT-secured authentication and password recovery",
      "Vendor dashboard for shop and product management",
      "Recent product views and product comparison tools",
    ],
    techStack: [
      "React.js",
      "Vite",
      "TypeScript",
      "Redux",
      "Redux Toolkit Query",
      "React Router",
      "Tailwind CSS",
      "React Hook Form",
      "Stripe",
    ],

    links: {
      liveDemo: "https://bazaaro-three.vercel.app/",
      frontendCode: "https://github.com/omarfaruktaj/bazaaro-frontend",
      backendCode: "https://github.com/omarfaruktaj/bazaaro-backend",
    },
    status: "completed",
  },
  {
    id: 2,
    title: "Gardenia - Frontend",
    tagline:
      "A vibrant gardening tips and advice platform with rich user interaction, content creation, and premium access.",
    description:
      "Gardenia is a visually engaging gardening community platform where users can create rich posts, interact with others, and access premium advice. It solves the lack of community-centered gardening platforms by allowing secure authentication, commenting, upvoting, and paid premium access through Stripe and Aamarpay. Built with Next.js and TypeScript, Gardenia supports a dynamic frontend and real-time user engagement.",
    images: ["/projects/2.png"],

    features: [
      "JWT-based user authentication (register, login, logout)",
      "Responsive and mobile-first UI with smooth micro-animations",
      "Rich text editor for multimedia gardening content",
      "Upvoting and commenting on community posts",
      "Stripe payment integration for premium content",
      "Advanced search and filtering by category and popularity",
      "Admin dashboard for managing posts, users, and payments",
      "Social features like following users and favoriting posts",
      "Challenges page to promote community engagement",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Context API",
      "Redux",
      "Quill",
      "Draft.js",
      "Slate",
      "React Icons",
      "Lucide-react",
      "Stripe",
      "Aamarpay",
    ],

    links: {
      liveDemo: "https://gardenia-sigma.vercel.app/",
      frontendCode: "https://github.com/omarfaruktaj/gardenia-frontend",
      backendCode: "https://github.com/omarfaruktaj/gardenia-backend",
    },
    status: "completed",
  },
  {
    id: 3,
    title: "Iron Keys",
    tagline:
      "An e-commerce frontend platform dedicated to high-quality mechanical keyboards.",
    description:
      "Iron Keys is a niche e-commerce frontend designed for mechanical keyboard enthusiasts. It offers fast performance, clean UI, and product filtering for an optimized shopping experience. Solving the gap for focused keyboard marketplaces, it is built with React, TypeScript, Redux, and Tailwind, ensuring modular components and scalable architecture.",
    images: ["/projects/3.png"],

    features: [
      "Homepage with featured products, brands, and customer reviews",
      "Products listing page with search and filter options",
      "Detailed product view with add-to-cart functionality",
      "Cart page with quantity controls and total calculation",
      "Checkout page for collecting user details and handling payment",
      "Informational pages: About Us and Contact Us with interactive form",
    ],
    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "Redux",
      "RTK Query",
      "Tailwind CSS",
    ],

    links: {
      liveDemo: "https://ironkeys.vercel.app",
      frontendCode: "https://github.com/omarfaruktaj/iron-keys",
    },
    status: "completed",
  },
];

export default projects;
