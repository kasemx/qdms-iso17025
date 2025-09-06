// Erişilebilirlik (Accessibility) Optimizasyonları
// WCAG 2.1 AA uyumlu erişilebilirlik yönetimi

export interface AccessibilityIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  element: string
  message: string
  wcagLevel: 'A' | 'AA' | 'AAA'
  wcagGuideline: string
  suggestion: string
  severity: 'high' | 'medium' | 'low'
}

export interface AccessibilityConfig {
  enableMonitoring: boolean
  checkOnLoad: boolean
  checkOnInteraction: boolean
  reportIssues: boolean
  wcagLevel: 'A' | 'AA' | 'AAA'
}

// Erişilebilirlik konfigürasyonu
export const accessibilityConfig: AccessibilityConfig = {
  enableMonitoring: true,
  checkOnLoad: true,
  checkOnInteraction: true,
  reportIssues: true,
  wcagLevel: 'AA'
}

// Erişilebilirlik denetimi
class AccessibilityAuditor {
  private issues: AccessibilityIssue[] = []
  private config: AccessibilityConfig = accessibilityConfig

  // Sayfa yüklendiğinde erişilebilirlik kontrolü
  auditPageOnLoad(): void {
    if (!this.config.enableMonitoring || !this.config.checkOnLoad) {
      return
    }

    // DOM yüklendikten sonra kontrol et
    setTimeout(() => {
      this.checkImages()
      this.checkHeadings()
      this.checkLinks()
      this.checkButtons()
      this.checkFormElements()
      this.checkColorContrast()
      this.checkKeyboardNavigation()
      this.checkFocusManagement()
    }, 1000)
  }

  // Görsel öğeleri kontrol et
  private checkImages(): void {
    const images = document.querySelectorAll('img')
    images.forEach((img, index) => {
      // Alt text kontrolü
      if (!img.alt && !img.getAttribute('aria-label')) {
        this.addIssue({
          id: `img_alt_${index}`,
          type: 'error',
          element: `img[${index}]`,
          message: 'Görsel için alt text eksik',
          wcagLevel: 'A',
          wcagGuideline: '1.1.1',
          suggestion: 'Tüm görseller için anlamlı alt text ekleyin',
          severity: 'high'
        })
      }

      // Decorative image kontrolü
      if (img.alt === '' && !img.getAttribute('role') === 'presentation') {
        this.addIssue({
          id: `img_decorative_${index}`,
          type: 'warning',
          element: `img[${index}]`,
          message: 'Dekoratif görsel için role="presentation" ekleyin',
          wcagLevel: 'A',
          wcagGuideline: '1.1.1',
          suggestion: 'Dekoratif görseller için role="presentation" kullanın',
          severity: 'medium'
        })
      }
    })
  }

  // Başlık yapısını kontrol et
  private checkHeadings(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const headingLevels: number[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      headingLevels.push(level)

      // Başlık sırası kontrolü
      if (index > 0) {
        const prevLevel = headingLevels[index - 1]
        if (level > prevLevel + 1) {
          this.addIssue({
            id: `heading_sequence_${index}`,
            type: 'warning',
            element: heading.tagName.toLowerCase(),
            message: 'Başlık sırası atlanmış',
            wcagLevel: 'A',
            wcagGuideline: '1.3.1',
            suggestion: 'Başlık seviyelerini sıralı kullanın',
            severity: 'medium'
          })
        }
      }

      // Boş başlık kontrolü
      if (!heading.textContent?.trim()) {
        this.addIssue({
          id: `heading_empty_${index}`,
          type: 'error',
          element: heading.tagName.toLowerCase(),
          message: 'Boş başlık tespit edildi',
          wcagLevel: 'A',
          wcagGuideline: '1.3.1',
          suggestion: 'Tüm başlıklar için anlamlı metin ekleyin',
          severity: 'high'
        })
      }
    })

    // H1 kontrolü
    const h1Count = document.querySelectorAll('h1').length
    if (h1Count === 0) {
      this.addIssue({
        id: 'no_h1',
        type: 'error',
        element: 'page',
        message: 'Sayfada H1 başlığı yok',
        wcagLevel: 'A',
        wcagGuideline: '1.3.1',
        suggestion: 'Her sayfada en az bir H1 başlığı bulunmalı',
        severity: 'high'
      })
    } else if (h1Count > 1) {
      this.addIssue({
        id: 'multiple_h1',
        type: 'warning',
        element: 'page',
        message: 'Sayfada birden fazla H1 başlığı var',
        wcagLevel: 'A',
        wcagGuideline: '1.3.1',
        suggestion: 'Her sayfada sadece bir H1 başlığı kullanın',
        severity: 'medium'
      })
    }
  }

  // Linkleri kontrol et
  private checkLinks(): void {
    const links = document.querySelectorAll('a')
    links.forEach((link, index) => {
      // Link metni kontrolü
      const linkText = link.textContent?.trim()
      if (!linkText || linkText.length < 2) {
        this.addIssue({
          id: `link_text_${index}`,
          type: 'error',
          element: `a[${index}]`,
          message: 'Link metni çok kısa veya boş',
          wcagLevel: 'A',
          wcagGuideline: '2.4.4',
          suggestion: 'Tüm linkler için anlamlı metin ekleyin',
          severity: 'high'
        })
      }

      // Aynı metinli linkler kontrolü
      const sameTextLinks = Array.from(links).filter(l => l.textContent?.trim() === linkText)
      if (sameTextLinks.length > 1) {
        this.addIssue({
          id: `link_duplicate_${index}`,
          type: 'warning',
          element: `a[${index}]`,
          message: 'Aynı metinli birden fazla link var',
          wcagLevel: 'A',
          wcagGuideline: '2.4.4',
          suggestion: 'Aynı metinli linkler için farklı açıklamalar ekleyin',
          severity: 'medium'
        })
      }

      // External link kontrolü
      if (link.href && !link.href.startsWith(window.location.origin)) {
        if (!link.getAttribute('aria-label')?.includes('external') && 
            !link.textContent?.includes('external')) {
          this.addIssue({
            id: `link_external_${index}`,
            type: 'info',
            element: `a[${index}]`,
            message: 'External link için açıklama eksik',
            wcagLevel: 'A',
            wcagGuideline: '2.4.4',
            suggestion: 'External linkler için açıklama ekleyin',
            severity: 'low'
          })
        }
      }
    })
  }

  // Butonları kontrol et
  private checkButtons(): void {
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button, index) => {
      // Buton metni kontrolü
      const buttonText = button.textContent?.trim()
      if (!buttonText && !button.getAttribute('aria-label')) {
        this.addIssue({
          id: `button_text_${index}`,
          type: 'error',
          element: `button[${index}]`,
          message: 'Buton için metin veya aria-label eksik',
          wcagLevel: 'A',
          wcagGuideline: '4.1.2',
          suggestion: 'Tüm butonlar için metin veya aria-label ekleyin',
          severity: 'high'
        })
      }

      // Disabled buton kontrolü
      if (button.disabled && !button.getAttribute('aria-disabled')) {
        this.addIssue({
          id: `button_disabled_${index}`,
          type: 'warning',
          element: `button[${index}]`,
          message: 'Disabled buton için aria-disabled eksik',
          wcagLevel: 'A',
          wcagGuideline: '4.1.2',
          suggestion: 'Disabled butonlar için aria-disabled="true" ekleyin',
          severity: 'medium'
        })
      }
    })
  }

  // Form elemanlarını kontrol et
  private checkFormElements(): void {
    const inputs = document.querySelectorAll('input, textarea, select')
    inputs.forEach((input, index) => {
      const inputElement = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      
      // Label kontrolü
      const id = inputElement.id
      const label = id ? document.querySelector(`label[for="${id}"]`) : null
      const ariaLabel = inputElement.getAttribute('aria-label')
      const ariaLabelledBy = inputElement.getAttribute('aria-labelledby')
      
      if (!label && !ariaLabel && !ariaLabelledBy) {
        this.addIssue({
          id: `input_label_${index}`,
          type: 'error',
          element: inputElement.tagName.toLowerCase(),
          message: 'Form elemanı için label eksik',
          wcagLevel: 'A',
          wcagGuideline: '1.3.1',
          suggestion: 'Tüm form elemanları için label ekleyin',
          severity: 'high'
        })
      }

      // Required field kontrolü
      if (inputElement.required && !inputElement.getAttribute('aria-required')) {
        this.addIssue({
          id: `input_required_${index}`,
          type: 'warning',
          element: inputElement.tagName.toLowerCase(),
          message: 'Required field için aria-required eksik',
          wcagLevel: 'A',
          wcagGuideline: '1.3.1',
          suggestion: 'Required fieldlar için aria-required="true" ekleyin',
          severity: 'medium'
        })
      }
    })
  }

  // Renk kontrastını kontrol et
  private checkColorContrast(): void {
    // Bu basit bir kontrol - gerçek uygulamada daha gelişmiş kontrast hesaplaması gerekir
    const elements = document.querySelectorAll('*')
    elements.forEach((element, index) => {
      const computedStyle = window.getComputedStyle(element)
      const color = computedStyle.color
      const backgroundColor = computedStyle.backgroundColor
      
      // Basit kontrast kontrolü (gerçek uygulamada daha gelişmiş algoritma gerekir)
      if (color === backgroundColor) {
        this.addIssue({
          id: `contrast_${index}`,
          type: 'error',
          element: element.tagName.toLowerCase(),
          message: 'Metin ve arka plan rengi aynı',
          wcagLevel: 'AA',
          wcagGuideline: '1.4.3',
          suggestion: 'Metin ve arka plan rengi arasında yeterli kontrast sağlayın',
          severity: 'high'
        })
      }
    })
  }

  // Klavye navigasyonunu kontrol et
  private checkKeyboardNavigation(): void {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    
    // Tab order kontrolü
    const tabIndexes = Array.from(focusableElements).map(el => {
      const tabIndex = el.getAttribute('tabindex')
      return tabIndex ? parseInt(tabIndex) : 0
    })
    
    const sortedTabIndexes = [...tabIndexes].sort((a, b) => a - b)
    if (JSON.stringify(tabIndexes) !== JSON.stringify(sortedTabIndexes)) {
      this.addIssue({
        id: 'tab_order',
        type: 'warning',
        element: 'page',
        message: 'Tab sırası düzensiz',
        wcagLevel: 'A',
        wcagGuideline: '2.4.3',
        suggestion: 'Tab sırasını mantıklı bir şekilde düzenleyin',
        severity: 'medium'
      })
    }
  }

  // Focus yönetimini kontrol et
  private checkFocusManagement(): void {
    // Focus trap kontrolü (modal, dialog gibi)
    const modals = document.querySelectorAll('[role="dialog"], [role="modal"]')
    modals.forEach((modal, index) => {
      const focusableElements = modal.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements.length === 0) {
        this.addIssue({
          id: `modal_focus_${index}`,
          type: 'error',
          element: 'modal',
          message: 'Modal içinde focusable element yok',
          wcagLevel: 'A',
          wcagGuideline: '2.1.2',
          suggestion: 'Modal içinde en az bir focusable element bulunmalı',
          severity: 'high'
        })
      }
    })
  }

  // Issue ekle
  private addIssue(issue: AccessibilityIssue): void {
    this.issues.push(issue)
    
    if (this.config.reportIssues) {
      console.warn(`Accessibility Issue [${issue.severity}]: ${issue.message}`, {
        element: issue.element,
        wcag: issue.wcagGuideline,
        suggestion: issue.suggestion
      })
    }
  }

  // Issue'ları al
  getIssues(severity?: 'high' | 'medium' | 'low'): AccessibilityIssue[] {
    if (severity) {
      return this.issues.filter(issue => issue.severity === severity)
    }
    return this.issues
  }

  // Issue'ları temizle
  clearIssues(): void {
    this.issues = []
  }

  // Erişilebilirlik skoru hesapla
  calculateAccessibilityScore(): number {
    const totalIssues = this.issues.length
    const highIssues = this.issues.filter(i => i.severity === 'high').length
    const mediumIssues = this.issues.filter(i => i.severity === 'medium').length
    const lowIssues = this.issues.filter(i => i.severity === 'low').length

    // Skor hesaplama: 100 - (high*10 + medium*5 + low*2)
    const score = Math.max(0, 100 - (highIssues * 10 + mediumIssues * 5 + lowIssues * 2))
    return Math.round(score)
  }

  // Erişilebilirlik raporu oluştur
  generateAccessibilityReport(): {
    score: number
    totalIssues: number
    issuesBySeverity: {
      high: number
      medium: number
      low: number
    }
    wcagCompliance: {
      levelA: number
      levelAA: number
      levelAAA: number
    }
    recommendations: string[]
  } {
    const score = this.calculateAccessibilityScore()
    const totalIssues = this.issues.length
    const highIssues = this.issues.filter(i => i.severity === 'high').length
    const mediumIssues = this.issues.filter(i => i.severity === 'medium').length
    const lowIssues = this.issues.filter(i => i.severity === 'low').length

    const levelAIssues = this.issues.filter(i => i.wcagLevel === 'A').length
    const levelAAIssues = this.issues.filter(i => i.wcagLevel === 'AA').length
    const levelAAAIssues = this.issues.filter(i => i.wcagLevel === 'AAA').length

    const recommendations: string[] = []
    
    if (highIssues > 0) {
      recommendations.push(`${highIssues} yüksek öncelikli erişilebilirlik sorunu düzeltilmeli`)
    }
    
    if (mediumIssues > 0) {
      recommendations.push(`${mediumIssues} orta öncelikli erişilebilirlik sorunu düzeltilmeli`)
    }
    
    if (score < 80) {
      recommendations.push('Genel erişilebilirlik skoru iyileştirilmeli')
    }

    return {
      score,
      totalIssues,
      issuesBySeverity: {
        high: highIssues,
        medium: mediumIssues,
        low: lowIssues
      },
      wcagCompliance: {
        levelA: levelAIssues,
        levelAA: levelAAIssues,
        levelAAA: levelAAAIssues
      },
      recommendations
    }
  }
}

// Global erişilebilirlik denetçisi
export const accessibilityAuditor = new AccessibilityAuditor()

// Erişilebilirlik yardımcı fonksiyonları
export const accessibilityHelpers = {
  // Sayfa yüklendiğinde denetim yap
  auditOnLoad: () => {
    accessibilityAuditor.auditPageOnLoad()
  },

  // Issue'ları al
  getIssues: (severity?: 'high' | 'medium' | 'low') => {
    return accessibilityAuditor.getIssues(severity)
  },

  // Erişilebilirlik skorunu al
  getScore: () => {
    return accessibilityAuditor.calculateAccessibilityScore()
  },

  // Erişilebilirlik raporunu oluştur
  generateReport: () => {
    return accessibilityAuditor.generateAccessibilityReport()
  },

  // Issue'ları temizle
  clearIssues: () => {
    accessibilityAuditor.clearIssues()
  }
}

// Erişilebilirlik optimizasyon fonksiyonları
export const accessibilityOptimizations = {
  // ARIA label ekle
  addAriaLabel: (element: HTMLElement, label: string) => {
    element.setAttribute('aria-label', label)
  },

  // ARIA describedby ekle
  addAriaDescribedBy: (element: HTMLElement, describedBy: string) => {
    element.setAttribute('aria-describedby', describedBy)
  },

  // ARIA expanded ekle
  setAriaExpanded: (element: HTMLElement, expanded: boolean) => {
    element.setAttribute('aria-expanded', expanded.toString())
  },

  // ARIA hidden ekle
  setAriaHidden: (element: HTMLElement, hidden: boolean) => {
    element.setAttribute('aria-hidden', hidden.toString())
  },

  // Focus yönetimi
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    
    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  },

  // Skip link ekle
  addSkipLink: (targetId: string, text: string = 'Ana içeriğe geç') => {
    const skipLink = document.createElement('a')
    skipLink.href = `#${targetId}`
    skipLink.textContent = text
    skipLink.className = 'skip-link'
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
    `
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px'
    })
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px'
    })
    
    document.body.insertBefore(skipLink, document.body.firstChild)
  }
}
