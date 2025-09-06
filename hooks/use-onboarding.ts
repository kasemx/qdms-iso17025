"use client"

import { useState, useEffect } from "react"

const ONBOARDING_KEY = "qdms-onboarding-completed"

export function useOnboarding() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showWizard, setShowWizard] = useState(false)

  useEffect(() => {
    // Check if onboarding was completed before
    const completed = localStorage.getItem(ONBOARDING_KEY)
    if (completed === "true") {
      setIsCompleted(true)
    } else {
      // Show wizard for new users
      setShowWizard(true)
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

  return {
    isCompleted,
    showWizard,
    completeOnboarding,
    resetOnboarding,
    openWizard,
    closeWizard,
  }
}
