import { Typography } from "@jay-js/ui";

export function MatchFound() {
  return Typography({
    tag: "h1",
    className: "text-4xl text-center font-bold mb-4",
    children: "🕹️ Match Found! Starting..."
  });
}