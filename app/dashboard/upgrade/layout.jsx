"use client"

import React, { createContext, useState } from "react"

// Create the context with TypeScript-friendly defaults
export const WebCamContext = createContext({
  webCamEnabled: false,
  setWebCamEnabled: (value) => {}
})

export default function DashboardLayout({ children }) {
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  return (
    <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
      <div className="min-h-screen">
        {children}
      </div>
    </WebCamContext.Provider>
  )
}