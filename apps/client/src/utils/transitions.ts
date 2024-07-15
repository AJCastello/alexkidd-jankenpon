import { ANIMATE } from "../constants"

export function outTransition(element: HTMLElement | null) {
  if (element) {
    element.classList.remove(ANIMATE.JELLY_BOUNCE_IN_RIGHT_FADE_IN)
    element.classList.add(ANIMATE.JELLY_BOUNCE_OUT_LEFT_FADE_OUT)
  }
}

export function inTransition(element: HTMLElement | null) {
  if (element) {
    element.classList.remove("fade-out-left-bounce")
    element.classList.add("fade-in-right-bounce")
  }
}

export function fadeInRightBounce(element: HTMLElement | null) {
  if (element) {
    element.classList.add("fade-in-right-bounce")
  }
}

export function fadeOutLeftBounce(element: HTMLElement | null) {
  if (element) {
    element.classList.add("fade-out-left-bounce")
  }
}

export function fadeOutTopBounce(element: HTMLElement | null) {
  if (element) {
    element.classList.add("fade-out-top-bounce")
  }
}