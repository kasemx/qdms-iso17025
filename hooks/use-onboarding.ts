"use client"

import { useState, useEffect } from "react"

const ONBOARDING_KEY = "qdms-onboarding-completed"
const SHOW_AGAIN_KEY = "qdms-onboarding-show-again"

export function useOnboarding() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [showAgain, setShowAgain] = useState(true)

  useEffect(() => {
    // Check if onboarding was completed before
    const completed = localStorage.getItem(ONBOARDING_KEY)
    const showAgainPref = localStorage.getItem(SHOW_AGAIN_KEY)
    
    if (completed === "true") {
      setIsCompleted(true)
    } else {
      // Show wizard for new users
      setShowWizard(true)
    }
    
    if (showAgainPref === "false") {
      setShowAgain(false)
    }
  }, [])

  const completeOnboarding = () => {
    setIsCompleted(true)
    setShowWizard(false)
    localStorage.setItem(ONBOARDING_KEY, "true")
  }

  const resetOnboarding = () => {
    setIsCompleted(false)
    setShowWizard(true)
    localStorage.removeItem(ONBOARDING_KEY)
  }

  const openWizard = () => {
    setShowWizard(true)
  }

  const closeWizard = () => {
    setShowWizard(false)
  }

  const handleShowAgainChange = (show: boolean) => {
    setShowAgain(show)
    localStorage.setItem(SHOW_AGAIN_KEY, show.toString())
  }

  return {
    isCompleted,
    showWizard,
    showAgain,
    completeOnboarding,
    resetOnboarding,
    openWizard,
    closeWizard,
    onShowAgainChange: handleShowAgainChange,
  }
}
