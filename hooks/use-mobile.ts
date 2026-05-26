import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value inside a small timeout to avoid React warning
    const initTimer = setTimeout(onChange, 0)
    
    mql.addEventListener("change", onChange)
    return () => {
      clearTimeout(initTimer)
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
