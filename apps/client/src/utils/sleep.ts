import { Navigate } from "@jay-js/system";

export function sleepNavigate(path: string, timeout: number = 800) {
  setTimeout(() => {
    Navigate(path);
  }, timeout);
}

export function sleepCb(callback: () => void, timeout: number = 800) {
  setTimeout(() => {
    callback();
  }, timeout);
}