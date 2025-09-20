"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

interface Department {
  id: string
  name: string
  description: string
  managerName: string
  managerId?: string
  userCount: number
  documentCount: number
  createdAt: string
  updatedAt?: string
  status: 'active' | 'inactive' | 'archived'
  parentId?: string | null
  children?: Department[]
  level: number
  budget?: number
  costCenter?: string
  location?: string
  phone?: string
  email?: string
  headCount: {
    current: number
    approved: number
    variance: number
  }
  performance: {
    efficiency: number
    satisfaction: number
    compliance: number
  }
  projects: {
    active: number
    completed: number
    pending: number
  }
  isExpanded?: boolean
}

interface DepartmentsListProps {
  departments: Department[]
  onEdit: (department: Department) => void
  onDelete: (departmentId: string) => void
}

export function DepartmentsList({ departments, onEdit, onDelete }: DepartmentsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Departmanlar</CardTitle>
        <CardDescription>Tüm departmanların listesi ve detayları</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departman Adı</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Müdür</TableHead>
              <TableHead>Personel</TableHead>
              <TableHead>Doküman</TableHead>
              <TableHead>Oluşturma Tarihi</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department: Department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                <TableCell>{department.managerName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{department.userCount}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{department.documentCount}</Badge>
                </TableCell>
                <TableCell>{new Date(department.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(department)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(department.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}