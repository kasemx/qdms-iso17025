/**
 * Modern Table Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun table (card layout tercih edilir)
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { modernTable, modernAnimations } from '@/lib/modern-design-utils'

export interface ModernTableProps {
  children: React.ReactNode
  className?: string
}

export interface ModernTableHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface ModernTableBodyProps {
  children: React.ReactNode
  className?: string
}

export interface ModernTableRowProps {
  children: React.ReactNode
  className?: string
  clickable?: boolean
  onClick?: () => void
}

export interface ModernTableCellProps {
  children: React.ReactNode
  className?: string
}

export const ModernTable: React.FC<ModernTableProps> = ({ children, className }) => {
  return (
    <div className={cn(modernTable.container, className)}>
      <table className="w-full">
        {children}
      </table>
    </div>
  )
}

export const ModernTableHeader: React.FC<ModernTableHeaderProps> = ({ children, className }) => {
  return (
    <thead className={cn(modernTable.header, className)}>
      {children}
    </thead>
  )
}

export const ModernTableBody: React.FC<ModernTableBodyProps> = ({ children, className }) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  )
}

export const ModernTableRow: React.FC<ModernTableRowProps> = ({ 
  children, 
  className, 
  clickable = false,
  onClick 
}) => {
  return (
    <tr 
      className={cn(
        modernTable.row,
        clickable && "cursor-pointer hover:scale-[1.01]",
        modernAnimations.transition,
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export const ModernTableCell: React.FC<ModernTableCellProps> = ({ children, className }) => {
  return (
    <td className={cn(modernTable.cell, className)}>
      {children}
    </td>
  )
}