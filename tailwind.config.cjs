/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //Light Theme
        "LightMyVeryLightGray": 'hsl(0, 0%, 98%)',
        "LightMyVeryLightGrayishBlue": 'hsl(236, 33%, 92%)',
        "LightMyLightGrayishBlue": 'hsl(233, 11%, 84%)',
        "LightMyDarkGrayishBlue": 'hsl(236, 9%, 61%)',
        "LightMyVeryDarkGrayishBlue": 'hsl(235, 19%, 35%)',

        //Dark Theme
        "DarkMyVeryDarkBlue": 'hsl(235, 21%, 11%)',
        "DarkMyVeryDarkDesaturatedBlue": 'hsl(235, 24%, 19%)',
        "DarkMyLightGrayishBlue": 'hsl(234, 39%, 85%)',
        "DarkMyLightGrayishBlueHover" : 'hsl(236, 33%, 92%)',
        "DarkMyDarkGrayishBlue": 'hsl(234, 11%, 52%)',
        "DarkMyVeryDarkGrayishBlue": 'hsl(233, 14%, 35%)',
        "DarkMyVeryDarkGrayishBlue2": 'hsl(237, 14%, 26%)',

        //Neutral
        "GradientBlue" : 'hsl(192, 100%, 67%)',
        "GradientPurple" : 'hsl(280, 87%, 65%)',
        "MyBrightBlue" : 'hsl(220, 98%, 61%)'
      }
    },
  },
  plugins: [],
}
