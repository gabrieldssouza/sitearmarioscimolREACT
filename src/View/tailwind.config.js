/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Para projetos com Next.js (versão "app" do Next.js)
    './pages/**/*.{js,ts,jsx,tsx}', // Para projetos com Next.js padrão
    './components/**/*.{js,ts,jsx,tsx}', // Inclua componentes se você os usa
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
