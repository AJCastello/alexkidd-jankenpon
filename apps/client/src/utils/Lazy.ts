import { LazyModule } from "@jay-js/system"

export function Lazy(module: string) {
  return () => {
    return LazyModule({
      import: () => import(`../pages/${module}`),
      module
    })
  }
}