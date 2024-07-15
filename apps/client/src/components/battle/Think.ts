import { Box, Typography } from "@jay-js/ui";

export function ThinkBallon() {
  return Box({
    className: "cloud-container",
    children: [
      Box({
        className: "cloud cloud-body",
        children: Array(10).fill(null).map((item, index) => {
          return Typography({
            className: `cloud-circle cloud-move pos-${index} ${(index % 3) ? `animate-delay-${index % 2}` : ""}`
          })
        })
      }),
      Box({
        className: "cloud-container cloud-stroke",
        children: Array(8).fill(null).map((item, index) => {
          return Typography({
            className: `cloud-circle cloud-move pos-${index} ${(index % 3) ? `animate-delay-${index % 2}` : ""}`
          })
        })
      })
    ]
  })
}