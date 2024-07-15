import { Box, Link, Typography } from "@jay-js/ui";

export function Footer() {
  return Box({
    className: "flex items-center justify-center flex-col mb-4 text-white",
    children: [
      Typography({
        className: "text-sm",
        children: [
          "A tribute to our childhood game. Made with ❤️ by ",
          Link({
            href: "https://jayjs.org",
            target: "_blank",
            children: "Jay JS",
          })
        ]
      }),
      Typography({
        className: "text-xs",
        children: "Alex Kidd and its characters are trademarks of SEGA. © SEGA"
      }),
      Link({
        href: "https://github.com",
        className: "text-xs",
        children: "Contribute on GitHub",
      })
    ]
  })
}