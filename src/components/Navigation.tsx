"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, 
  Menu, 
  X, 
  Users, 
  Building2, 
  BarChart3, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react'

interface NavigationProps {
  userType?: 'candidato' | 'empresa' | 'admin' | null
  userName?: string
  onLogout?: () => void
}

export function Navigation({ userType, userName, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const publicLinks = [
    { href: '#vagas', label: 'Vagas' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#programas', label: 'Programas' },
    { href: '#contato', label: 'Contato' }
  ]

  const candidatoLinks = [
    { href: '/dashboard', label: 'Meu Painel', icon: BarChart3 },
    { href: '/vagas', label: 'Buscar Vagas', icon: Briefcase },
    { href: '/candidaturas', label: 'Minhas Candidaturas', icon: Users },
    { href: '/perfil', label: 'Meu Perfil', icon: Settings }
  ]

  const empresaLinks = [
    { href: '/dashboard', label: 'Painel Empresa', icon: BarChart3 },
    { href: '/vagas', label: 'Minhas Vagas', icon: Briefcase },
    { href: '/candidatos', label: 'Candidatos', icon: Users },
    { href: '/perfil', label: 'Perfil Empresa', icon: Building2 }
  ]

  const adminLinks = [
    { href: '/admin', label: 'Administração', icon: Settings },
    { href: '/admin/candidatos', label: 'Candidatos', icon: Users },
    { href: '/admin/empresas', label: 'Empresas', icon: Building2 },
    { href: '/admin/vagas', label: 'Vagas', icon: Briefcase },
    { href: '/admin/relatorios', label: 'Relatórios', icon: BarChart3 }
  ]

  const getLinks = () => {
    switch (userType) {
      case 'candidato': return candidatoLinks
      case 'empresa': return empresaLinks
      case 'admin': return adminLinks
      default: return []
    }
  }

  const links = getLinks()

  return (
    <header className="bg-white shadow-sm border-b-4 border-blue-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SETEMP</h1>
              <p className="text-sm text-gray-600">Secretaria de Empreendedorismo e Trabalho</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {userType ? (
              // Navegação para usuários logados
              <>
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </a>
                  )
                })}
                
                {/* Notificações */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>

                {/* Perfil do usuário */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Olá, {userName}</span>
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              // Navegação pública
              <>
                {publicLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Botões de login */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    Entrar
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Cadastrar-se
                  </Button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {userType ? (
                // Menu mobile para usuários logados
                <>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Logado como:</p>
                    <p className="font-medium text-gray-900">{userName}</p>
                  </div>
                  
                  {links.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </a>
                    )
                  })}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        onLogout?.()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sair
                    </Button>
                  </div>
                </>
              ) : (
                // Menu mobile público
                <>
                  {publicLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-blue-600 hover:text-blue-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Entrar
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cadastrar-se
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}