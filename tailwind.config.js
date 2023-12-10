
export default  {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}', './src/index.html', './src/app.html'],
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('daisyui')
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk'],
        bungee: ['bungee']
      },
      colors: {
        whitebg: '#F5F5F5',
        primary: '#008080',
        secondary: '#f4be1c',
        accent: '#1B275200',
        neutral: '#382f2d',
        info: '#17a2bf',
        success: '#28a745',
        warning: '#FFA500',
        error: '#dc3545',
        graybg: '#f6f3ee'
      }
    }
  },
  daisyui: {
    themes: false
  }
};
