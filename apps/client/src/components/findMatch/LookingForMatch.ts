import { Box, Typography, Loading } from "@jay-js/ui";

export function LookingForMatch() {
  return Box({
    className: "flex items-center justify-center flex-col",
    children: [
      Typography({
        tag: "h1",
        className: "text-4xl text-center font-bold mb-4",
        children: "Find Match"
      }),
      Loading({
        size: "loading-lg",
        type: "loading-dots",
      }),
      Typography({
        className: "text-center",
        children: "Looking for a match..."
      })
    ]
  });
}