/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx,md,mdx}",
    "./node_modules/@jay-js/ui/**/*.styled"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#ffd10b"
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#ffd10b"
        },
      },
    ]
  }
}