"use client"

import type React from "react"

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
import { Search, Bell, User, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const searchData = [
  {
    id: "1",
    title: "Doküman Kontrol Prosedürü",
    code: "PR-KG-001",
    url: "/documents/1",
  },
  {
    id: "2",
    title: "Laboratuvar Cihaz Kalibrasyonu Talimatı",
    code: "TL-LAB-001",
    url: "/documents/2",
  },
  {
    id: "3",
    title: "Güvenlik Prosedürleri",
    code: "PR-GV-002",
    url: "/documents/3",
  },
]

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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
        item.title.toLowerCase().includes(query.toLowerCase()) || item.code.toLowerCase().includes(query.toLowerCase()),
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
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Search */}
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative max-w-md">
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <form onSubmit={handleSearchSubmit}>
                    <Input
                      ref={searchInputRef}
                      placeholder="Doküman ara... (Ctrl+K)"
                      className="pl-10 w-80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchOpen(true)}
                    />
                  </form>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      Ctrl+K
                    </Badge>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <Command>
                  <CommandList>
                    {searchQuery.trim() !== "" && (
                      <>
                        {searchResults.length > 0 ? (
                          <CommandGroup heading="Arama Sonuçları">
                            {searchResults.map((item) => (
                              <CommandItem key={item.id} onSelect={() => handleSearchSelect(item)}>
                                <div className="flex items-center space-x-3 w-full">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium truncate">{item.title}</span>
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
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive text-xs flex items-center justify-center text-destructive-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
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
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">SA</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
