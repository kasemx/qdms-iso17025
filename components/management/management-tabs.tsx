"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ManagementTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
  children: React.ReactNode
}

export function ManagementTabs({ activeTab, onTabChange, children }: ManagementTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="organization">Organizasyon Yapısı</TabsTrigger>
        <TabsTrigger value="impartiality">Tarafsızlık Yönetimi</TabsTrigger>
        <TabsTrigger value="confidentiality">Gizlilik Anlaşmaları</TabsTrigger>
        <TabsTrigger value="reviews">Yönetim Gözden Geçirme</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}