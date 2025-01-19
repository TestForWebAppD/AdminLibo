/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'lg': {'max': '1024px'},
      'md': {'max': '768px'},
      'sm': {'max': '640px'},
      'usm': {'max': '440px'},
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        lightblack: "#4d4244",
        EIO: "#b3190d",
        darkred: "#d70026",
        lightgray: "#747474",
        darkgray: "#272727",
        likegray: "#eaf0f5",
        footerblack: "#292929",
        crabs: "#e54b5d",
        sonicsilver: "#747474"
      },
      perspective: {
        '1500': '1500px',
      },
      spacing: {
        'space-screen': 'calc(100vh - 450px)',
      },
    },
  },
  plugins: [

  ],
}

