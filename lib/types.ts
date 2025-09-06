// QDMS Sistem Türleri

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  department?: string
  position?: string
  isActive: boolean
  twoFactorEnabled: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions: Record<string, any>
  createdAt: Date
}

export interface Department {
  id: string
  name: string
  description?: string
  managerId?: string
  parentDepartmentId?: string
  createdAt: Date
}

export interface Document {
  id: string
  documentCode: string
  title: string
  description?: string
  categoryId: string
  departmentId?: string
  ownerId: string
  currentVersion: number
  status: "draft" | "review" | "approved" | "published" | "archived" | "obsolete"
  filePath?: string
  fileSize?: number
  fileType?: string
  language: string
  effectiveDate?: Date
  reviewDate?: Date
  nextReviewDate?: Date
  retentionPeriod?: number
  isControlled: boolean
  isConfidential: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DocumentVersion {
  id: string
  documentId: string
  versionNumber: number
  title: string
  description?: string
  filePath?: string
  fileSize?: number
  changesSummary?: string
  createdBy: string
  createdAt: Date
}

export interface WorkflowInstance {
  id: string
  documentId: string
  templateId: string
  currentStep: number
  status: "active" | "completed" | "cancelled"
  initiatedBy: string
  initiatedAt: Date
  completedAt?: Date
}

export interface WorkflowTask {
  id: string
  workflowInstanceId: string
  stepNumber: number
  assignedTo: string
  taskType: "review" | "approve" | "acknowledge"
  status: "pending" | "completed" | "rejected" | "skipped"
  dueDate?: Date
  completedAt?: Date
  comments?: string
  decision?: "approved" | "rejected" | "needs_revision"
  createdAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Reminder {
  id: string
  title: string
  description?: string
  reminderType: "document_based" | "periodic_control" | "training" | "custom"
  frequency?: "once" | "daily" | "weekly" | "monthly" | "yearly"
  frequencyValue: number
  startDate: Date
  endDate?: Date
  nextReminderDate?: Date
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface DocumentReminder {
  id: string
  reminderId: string
  documentId: string
  triggerEvent?: "document_update" | "review_due" | "expiry_approaching"
  daysBefore: number
  createdAt: Date
}

export interface ReminderRecipient {
  id: string
  reminderId: string
  userId?: string
  roleId?: string
  departmentId?: string
  notificationChannels: ("system" | "email" | "mobile_push")[]
  isActive: boolean
  createdAt: Date
}

export interface ReminderLog {
  id: string
  reminderId: string
  recipientUserId: string
  channel: "system" | "email" | "mobile_push"
  status: "sent" | "delivered" | "failed" | "acknowledged"
  messageContent?: string
  sentAt: Date
  acknowledgedAt?: Date
  errorMessage?: string
}

export interface PeriodicControl {
  id: string
  name: string
  description?: string
  controlType: "environmental" | "procedure" | "equipment" | "safety"
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  frequencyValue: number
  responsibleRoleId?: string
  responsibleUserId?: string
  departmentId?: string
  relatedDocuments?: string[]
  controlParameters?: Record<string, any>
  isCritical: boolean
  isActive: boolean
  nextControlDate?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface PeriodicControlRecord {
  id: string
  controlId: string
  performedBy: string
  performedAt: Date
  status: "completed" | "failed" | "partial" | "skipped"
  results?: Record<string, any>
  observations?: string
  correctiveActions?: string
  nextControlDate?: Date
  attachments?: Record<string, any>
  approvedBy?: string
  approvedAt?: Date
}

export interface TrainingAssignment {
  id: string
  documentId: string
  userId: string
  assignmentType: "read_acknowledge" | "quiz" | "training_session"
  assignedBy: string
  assignedAt: Date
  dueDate?: Date
  completedAt?: Date
  status: "assigned" | "in_progress" | "completed" | "overdue" | "skipped"
  completionMethod?: string
  acknowledgmentText?: string
  digitalSignature?: string
  completionNotes?: string
  score?: number
  passingScore: number
  attemptsCount: number
  maxAttempts: number
  createdAt: Date
  updatedAt: Date
}

export interface TrainingReport {
  id: string
  reportType: "department_summary" | "user_summary" | "document_summary"
  reportPeriodStart: Date
  reportPeriodEnd: Date
  departmentId?: string
  userId?: string
  documentId?: string
  totalAssignments: number
  completedAssignments: number
  overdueAssignments: number
  completionRate: number
  reportData?: Record<string, any>
  generatedBy: string
  generatedAt: Date
}

export interface AuditTrailEntry {
  id: string
  entityType: string
  entityId: string
  action: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  changeSummary?: string
  userId: string
  userName?: string
  ipAddress?: string
  userAgent?: string
  sessionId?: string
  requestId?: string
  metadata?: Record<string, any>
  createdAt: Date
}

export interface DocumentRollback {
  id: string
  documentId: string
  fromVersion: number
  toVersion: number
  rollbackReason: string
  rollbackType: "manual" | "automatic" | "emergency"
  performedBy: string
  approvedBy?: string
  rollbackData?: Record<string, any>
  createdAt: Date
}

export interface SystemActivity {
  id: string
  activityType: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  userId?: string
  affectedEntities: string[]
  metadata?: Record<string, any>
  createdAt: Date
}
