/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "azul-toledo": "#122558",
        "azul-toledo-claro": "#d5d8e2",
      },
      backgroundImage: {
        "hero-pattern": "url('./bg-image.jpg')",
        "footer-texture": "url('./bg-image.jpg')",
        "forgot-password": "url('./forgot-password.png')",
      },
    },
  },
  plugins: [],
};
