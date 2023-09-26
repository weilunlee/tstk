/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue_1': '#7FC7EB',
        // 'pink': '#ff49db',
        // 'orange': '#ff7849',
        // 'green': '#13ce66',
        // 'gray-dark': '#273444',
        // 'gray': '#8492a6',
        // 'gray-light': '#d3dce6',
        'beige':'rgb(245, 245, 220)',
        'blue_2':'#b7dde0'
      },
      theme: {
        fontFamily: {
          'lato': ['Lato-Regular', 'ui-sans-serif'],
          'sans': ['ui-sans-serif', 'system-ui'],
          'serif': ['ui-serif', 'Georgia'],
          'mono': ['ui-monospace', 'SFMono-Regular'],
          'display': ['Oswald'],
          'body': ['"Open Sans"'],
        },
        
      }
    },
  },
  plugins: [],
}
