"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Sparkles,
  Zap,
  Bot,
  Workflow,
  Users,
  BarChart3,
  Shield,
  MessageSquare,
  Bookmark,
  History
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMenu } from "@/contexts/menu-context"

// Modern UI Components
const GlassCard = ({ children, className, ...props }: any) => (
  <div 
    className={cn(
      "backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-2xl shadow-xl transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const ModernButton = ({ children, variant = "primary", size = "default", className, ...props }: any) => (
  <Button
    className={cn(
      "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-2xl",
      variant === "primary" && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0",
      variant === "secondary" && "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border-0",
      variant === "accent" && "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0",
      variant === "glass" && "backdrop-blur-md bg-white/60 hover:bg-blue-500 dark:bg-gray-800/70 dark:hover:bg-blue-600 border border-gray-300/40 dark:border-gray-600/40 hover:text-white hover:border-blue-500 shadow-md hover:shadow-lg",
      size === "sm" && "px-3 py-1.5 text-sm",
      size === "lg" && "px-6 py-3 text-lg",
      className
    )}
    {...props}
  >
    {children}
  </Button>
)

// Mock search data
const searchData = [
  {
    id: "1",
    title: "Doküman Kontrol Prosedürü",
    code: "PR-KG-001",
    url: "/documents/1",
    type: "document",
    category: "Prosedür"
  },
  {
    id: "2",
    title: "Laboratuvar Cihaz Kalibrasyonu Talimatı",
    code: "TL-LAB-001",
    url: "/documents/2",
    type: "document",
    category: "Talimat"
  },
  {
    id: "3",
    title: "Güvenlik Prosedürleri",
    code: "PR-GV-002",
    url: "/documents/3",
    type: "document",
    category: "Prosedür"
  },
  {
    id: "4",
    title: "Müşteri Şikayetleri Yönetimi",
    code: "PR-MŞ-001",
    url: "/iso/customer-complaints",
    type: "process",
    category: "Süreç"
  },
  {
    id: "5",
    title: "İç Denetim Raporu",
    code: "FR-İD-001",
    url: "/iso/internal-audit",
    type: "form",
    category: "Form"
  }
]

// Recent searches
const recentSearches = [
  "Kalibrasyon Talimatı",
  "Müşteri Şikayetleri",
  "İç Denetim",
  "Personel Eğitimi"
]

// Quick actions
const quickActions = [
  { id: "ai-assistant", name: "AI Asistan", icon: Bot, color: "text-blue-500", href: "/ai-assistant" },
  { id: "workflow", name: "Akıllı İş Akışı", icon: Workflow, color: "text-purple-500", href: "/workflows" },
  { id: "collaboration", name: "İşbirliği", icon: Users, color: "text-green-500", href: "/collaboration" },
  { id: "analytics", name: "Analitik", icon: BarChart3, color: "text-pink-500", href: "/analytics" },
  { id: "compliance", name: "Uyumluluk", icon: Shield, color: "text-orange-500", href: "/compliance" },
  { id: "feedback", name: "Geri Bildirim", icon: MessageSquare, color: "text-teal-500", href: "/feedback" }
]

export function ModernHeader() {
  const router = useRouter()
  const { state, actions } = useMenu()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
        setIsSearchOpen(true)
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        searchInputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const performSearch = async (query: string) => {
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.code.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered)
  }

  const handleSearchSelect = (item: any) => {
    setIsSearchOpen(false)
    setSearchQuery("")
    router.push(item.url)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Search */}
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative max-w-md w-full">
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <form onSubmit={handleSearchSubmit}>
                    <Input
                      ref={searchInputRef}
                      placeholder="Doküman, süreç veya form ara... (Ctrl+K)"
                      className="pl-10 w-full rounded-2xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchOpen(true)}
                    />
                  </form>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 rounded-full">
                      Ctrl+K
                    </Badge>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 rounded-2xl" align="start">
                <Command className="rounded-2xl">
                  <CommandList>
                    {searchQuery.trim() !== "" ? (
                      <>
                        {searchResults.length > 0 ? (
                          <CommandGroup heading="Arama Sonuçları">
                            {searchResults.map((item) => (
                              <CommandItem key={item.id} onSelect={() => handleSearchSelect(item)}>
                                <div className="flex items-center space-x-3 w-full">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium truncate">{item.title}</span>
                                      <Badge variant="secondary" className="text-xs">
                                        {item.category}
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      <span>{item.code}</span>
                                    </div>
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ) : (
                          <CommandEmpty>
                            <div className="text-center py-6">
                              <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">"{searchQuery}" için sonuç bulunamadı</p>
                            </div>
                          </CommandEmpty>
                        )}

                        <CommandGroup>
                          <CommandItem onSelect={() => handleSearchSubmit(new Event("submit") as any)}>
                            <Search className="mr-2 h-4 w-4" />"{searchQuery}" için tüm sonuçları görüntüle
                          </CommandItem>
                        </CommandGroup>
                      </>
                    ) : (
                      <>
                        <CommandGroup heading="Hızlı Eylemler">
                          <div className="grid grid-cols-3 gap-2 p-2">
                            {quickActions.map((action) => {
                              const Icon = action.icon
                              return (
                                <Button
                                  key={action.id}
                                  variant="ghost"
                                  size="sm"
                                  className="flex flex-col items-center justify-center h-16 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                                  onClick={() => {
                                    router.push(action.href)
                                    setIsSearchOpen(false)
                                  }}
                                >
                                  <Icon className={cn("h-5 w-5 mb-1", action.color)} />
                                  <span className="text-xs">{action.name}</span>
                                </Button>
                              )
                            })}
                          </div>
                        </CommandGroup>
                        
                        <CommandGroup heading="Son Aramalar">
                          {recentSearches.map((search, index) => (
                            <CommandItem 
                              key={index} 
                              onSelect={() => {
                                setSearchQuery(search)
                                performSearch(search)
                              }}
                              className="flex items-center"
                            >
                              <History className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{search}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <DropdownMenu open={showQuickActions} onOpenChange={setShowQuickActions}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Sparkles className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl p-0">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Hızlı Eylemler</h3>
                <p className="text-sm text-muted-foreground">AI destekli özellikler</p>
              </div>
              <div className="grid grid-cols-2 gap-1 p-2">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <DropdownMenuItem 
                      key={action.id} 
                      className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        router.push(action.href)
                        setShowQuickActions(false)
                      }}
                    >
                      <Icon className={cn("h-5 w-5 mb-1", action.color)} />
                      <span className="text-xs">{action.name}</span>
                    </DropdownMenuItem>
                  )
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive text-xs flex items-center justify-center text-destructive-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Onay Bekleyen Doküman</p>
                  <p className="text-xs text-muted-foreground">PR-KG-002 dokümanı onayınızı bekliyor</p>
                  <p className="text-xs text-muted-foreground">2 saat önce</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Revizyon Hatırlatması</p>
                  <p className="text-xs text-muted-foreground">TL-LAB-001 revizyonu yaklaşıyor</p>
                  <p className="text-xs text-muted-foreground">1 gün önce</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Yeni Eğitim Ataması</p>
                  <p className="text-xs text-muted-foreground">Kalite prosedürleri eğitimi atandı</p>
                  <p className="text-xs text-muted-foreground">3 gün önce</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">SA</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Sistem Yöneticisi</p>
                  <p className="text-xs text-muted-foreground">admin@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Ayarlar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}