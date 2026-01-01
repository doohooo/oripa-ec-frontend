import type * as React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "komoju-fields": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "session-id"?: string
        "publishable-key"?: string
        theme?: string
      }
    }
  }
}

export {}
