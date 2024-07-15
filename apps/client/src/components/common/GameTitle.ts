import { Box, Typography } from "@jay-js/ui";

export function GameTitle() {
  return Box({
    className: "pt-16 flex items-center justify-center flex-col",
    children: [
      Typography({
        tag: "h1",
        className: "title",
        children: [
          Typography({
            tag: "span",
            children: "ALEX"
          }),
          Typography({
            tag: "span",
            children: "KIDD"
          })
        ]
      }),
      Typography({
        tag: "h2",
        className: "subtitle",
        children: "JanKenPon"
      })
    ]
  })
}