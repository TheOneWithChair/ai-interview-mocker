"use client"

import React, { createContext, useState } from "react"

// Create the context
export const WebCamContext = createContext({
  webCamEnabled: false,
  setWebCamEnabled: () => {}
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