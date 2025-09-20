/**
 * Document Utilities
 * @description Doküman yönetimi için ortak utility fonksiyonları
 */

import { DOCUMENT_CONSTANTS } from "@/lib/constants/dashboard"

export interface Document {
  id: string
  code: string
  title: string
  category: {
    id: string
    code: string
    name: string
    color: string
    icon: string
  }
  version: string
  status: string
  description: string
  content: string
  author: string
  reviewer: string
  approver: string | null
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
  nextReviewDate: string | null
  distributionList: string[]
  relatedDocuments: string[]
  tags: string[]
  fileSize: number
  fileType: string
  isActive: boolean
  securityLevel: string
  isExternal: boolean
  digitalSignature: {
    signed: boolean
    signer: string | null
    signatureDate: string | null
    certificateValid: boolean
  }
}

/**
 * Get status icon for document status
 */
export const getStatusIcon = (status: string) => {
  const statusColors = {
    "draft": "bg-gray-400",
    "review": "bg-yellow-400", 
    "approved": "bg-green-400",
    "published": "bg-blue-400",
    "obsolete": "bg-red-400",
    "active": "bg-emerald-400"
  }
  return `w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors] || "bg-gray-400"}`
}

/**
 * Get status variant for badge styling
 */
export const getStatusVariant = (status: string | undefined) => {
  if (!status) return "secondary"
  const variants = {
    "draft": "secondary",
    "review": "outline", 
    "approved": "default",
    "published": "default",
    "obsolete": "destructive",
    "active": "default"
  }
  return variants[status as keyof typeof variants] || "secondary"
}

/**
 * Get localized status text
 */
export const getStatusText = (status: string | undefined) => {
  if (!status) return "Bilinmiyor"
  const texts = {
    "draft": "Taslak",
    "review": "İnceleme",
    "approved": "Onaylandı", 
    "published": "Yayınlandı",
    "obsolete": "Eski",
    "active": "Aktif"
  }
  return texts[status as keyof typeof texts] || status
}

/**
 * Format file size with proper units
 */
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B"
  const k = DOCUMENT_CONSTANTS.FILE_SIZE.CONVERSION_FACTOR
  const sizes = DOCUMENT_CONSTANTS.FILE_SIZE.UNITS
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}

/**
 * Format date to Turkish locale
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit", 
    year: "numeric"
  })
}

/**
 * Calculate days ago from date string
 */
export const getDaysAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Generate search suggestions based on query
 */
export const generateSearchSuggestions = (query: string, documents: Document[]) => {
  if (query.length < DOCUMENT_CONSTANTS.SEARCH.MIN_LENGTH) return []
  
  const suggestions: string[] = []
  const lowerQuery = query.toLowerCase()
  
  documents.forEach(doc => {
    if (doc.title.toLowerCase().includes(lowerQuery)) {
      suggestions.push(doc.title)
    }
    if (doc.author.toLowerCase().includes(lowerQuery)) {
      suggestions.push(doc.author)
    }
    if (doc.category.name.toLowerCase().includes(lowerQuery)) {
      suggestions.push(doc.category.name)
    }
    doc.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        suggestions.push(tag)
      }
    })
  })
  
  return [...new Set(suggestions)].slice(0, DOCUMENT_CONSTANTS.SEARCH.SUGGESTIONS_LIMIT)
}

/**
 * Validate user permissions for document operations
 */
export const hasPermission = (userPermissions: string[], permission: string) => {
  return userPermissions.includes(permission)
}

/**
 * Check if document can be edited
 */
export const canEdit = (doc: Document, userPermissions: string[]) => {
  return hasPermission(userPermissions, "write") && (doc.status === "draft" || doc.status === "review")
}

/**
 * Check if document can be deleted
 */
export const canDelete = (doc: Document, userPermissions: string[]) => {
  return hasPermission(userPermissions, "delete") && (doc.status === "draft" || doc.status === "obsolete")
}

/**
 * Check if document can be approved
 */
export const canApprove = (doc: Document, userPermissions: string[]) => {
  return hasPermission(userPermissions, "approve") && doc.status === "review"
}