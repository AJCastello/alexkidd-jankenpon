import { confetti } from "@tsparticles/confetti";

function centerElementNormalized(element: HTMLElement) {
  const { left, top, width, height } = element.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  const normalizedX = centerX / window.innerWidth;
  const normalizedY = centerY / window.innerHeight;
  return { x: normalizedX, y: normalizedY };
}

export function confettiTo(element: HTMLElement) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: centerElementNormalized(element)
  });
}