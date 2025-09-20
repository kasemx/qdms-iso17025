/**
 * Modern Search Box Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun search component
 */

import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModernInput } from './modern-input'
import { ModernButton } from './modern-button'

export interface ModernSearchBoxProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeVariants = {
  sm: 'text-sm py-2',
  md: 'text-base py-3', 
  lg: 'text-lg py-4'
}

export const ModernSearchBox: React.FC<ModernSearchBoxProps> = ({
  placeholder = "Ara...",
  value = "",
  onChange,
  onSearch,
  className,
  size = 'md'
}) => {
  const [searchValue, setSearchValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setSearchValue("")
    onChange?.("")
  }

  const handleSearch = () => {
    onSearch?.(searchValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <ModernInput
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "pl-12 pr-12",
            sizeVariants[size]
          )}
        />
        {searchValue && (
          <ModernButton
            variant="glass"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
          </ModernButton>
        )}
      </div>
    </div>
  )
}