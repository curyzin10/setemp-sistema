"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Search, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  FileText,
  BarChart3,
  Shield,
  Menu,
  X,
  UserCheck,
  Settings,
  LogIn
} from 'lucide-react'
import { CadastroCandidato, CadastroEmpresa } from '@/components/CadastroForms'
import { RelatoriosAdmin, DashboardCharts, GerenciarEmpresas, GerenciarCandidatos, GerenciarNoticias } from '@/components/AdminComponents'
import { CarrosselNoticias } from '@/components/CarrosselNoticias'
import { NoticiasPage, NoticiaIndividual } from '@/components/NoticiasComponents'
import { type NoticiaData } from '@/lib/backend-simulation'

// Componente de navegação principal
function Navigation({ currentView, setCurrentView }: { currentView: string, setCurrentView: (view: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Início', icon: <Globe className="w-4 h-4" /> },
    { id: 'noticias', label: 'Notícias', icon: <FileText className="w-4 h-4" /> },
    { id: 'vagas', label: 'Vagas', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'candidato', label: 'Área do Candidato', icon: <Users className="w-4 h-4" /> },
    { id: 'empresa', label: 'Área da Empresa', icon: <Building2 className="w-4 h-4" /> },
    { id: 'admin', label: 'Administração', icon: <Settings className="w-4 h-4" /> },
  ]

  return (
    <header className="bg-white shadow-sm border-b-4 border-blue-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SETEMP</h1>
              <p className="text-sm text-gray-600">Secretaria Executiva do Trabalho e Empreendedorismo</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Página inicial institucional
function HomePage({ onNoticiaClick }: { onNoticiaClick: (noticia: NoticiaData) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCadastroCandidato, setShowCadastroCandidato] = useState(false)
  const [showCadastroEmpresa, setShowCadastroEmpresa] = useState(false)

  const stats = {
    candidatos: 15420,
    empresas: 1250,
    vagasAbertas: 890,
    vagasPreenchidas: 3240
  }

  const vagasDestaque = [
    {
      id: 1,
      cargo: "Desenvolvedor Full Stack",
      empresa: "Tech Solutions Ltda",
      cidade: "Manaus",
      salario: "R$ 4.500 - R$ 6.000",
      tipo: "CLT",
      publicada: "2 dias atrás"
    },
    {
      id: 2,
      cargo: "Assistente Administrativo",
      empresa: "Comércio Amazonas S.A",
      cidade: "Manaus",
      salario: "R$ 1.800 - R$ 2.200",
      tipo: "CLT",
      publicada: "1 dia atrás"
    },
    {
      id: 3,
      cargo: "Operador de Máquinas",
      empresa: "Indústria Norte Brasil",
      cidade: "Itacoatiara",
      salario: "R$ 2.500 - R$ 3.000",
      tipo: "CLT",
      publicada: "3 horas atrás"
    }
  ]

  const programas = [
    {
      titulo: "Qualifica Amazonas",
      descricao: "Cursos de capacitação profissional gratuitos",
      icone: <FileText className="w-8 h-8 text-blue-600" />
    },
    {
      titulo: "Empreende AM",
      descricao: "Apoio ao empreendedorismo e microcrédito",
      icone: <TrendingUp className="w-8 h-8 text-green-600" />
    },
    {
      titulo: "Primeiro Emprego",
      descricao: "Programa especial para jovens profissionais",
      icone: <Users className="w-8 h-8 text-purple-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Conectando <span className="text-blue-600">Talentos</span> e <span className="text-green-600">Oportunidades</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A SETEMP – Secretaria Executiva do Trabalho e Empreendedorismo é a ponte entre trabalhadores e empresas no Amazonas, oferecendo oportunidades de emprego e programas de capacitação profissional.
          </p>
          
          {/* Botões de Acesso Rápido */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowCadastroCandidato(true)}
            >
              <Users className="w-5 h-5 mr-2" />
              Sou Candidato
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg"
              onClick={() => setShowCadastroEmpresa(true)}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Sou Empresa
            </Button>
          </div>

          {/* Busca Rápida de Vagas */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar vagas por cargo ou empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar Vagas
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Carrossel de Notícias */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Últimas Notícias</h3>
            <p className="text-xl text-gray-600">Fique por dentro das novidades da SETEMP</p>
          </div>
          
          <CarrosselNoticias onNoticiaClick={onNoticiaClick} />
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stats.candidatos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="text-gray-600 font-medium">Candidatos Cadastrados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stats.empresas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="text-gray-600 font-medium">Empresas Parceiras</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {stats.vagasAbertas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="text-gray-600 font-medium">Vagas Abertas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {stats.vagasPreenchidas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="text-gray-600 font-medium">Vagas Preenchidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vagas em Destaque */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Vagas em Destaque</h3>
            <p className="text-xl text-gray-600">Oportunidades selecionadas para você</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {vagasDestaque.map((vaga) => (
              <Card key={vaga.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {vaga.tipo}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {vaga.publicada}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{vaga.cargo}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-1" />
                    {vaga.empresa}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {vaga.cidade}
                    </div>
                    <div className="text-green-600 font-semibold">
                      {vaga.salario}
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Ver Todas as Vagas
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Programas e Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nossos Programas</h3>
            <p className="text-xl text-gray-600">Capacitação e apoio ao desenvolvimento profissional</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {programas.map((programa, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {programa.icone}
                  </div>
                  <CardTitle className="text-xl">{programa.titulo}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {programa.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Saiba Mais
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a SETEMP */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Sobre a SETEMP</h3>
              <p className="text-xl mb-6 text-blue-100">
                A Secretaria Executiva do Trabalho e Empreendedorismo do Amazonas é o órgão responsável por promover políticas públicas de geração de emprego, renda e desenvolvimento econômico no estado.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                  <span>Intermediação de mão de obra qualificada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                  <span>Programas de capacitação profissional</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                  <span>Apoio ao empreendedorismo local</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                  <span>Integração com o SINE Nacional</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold mb-2">98%</div>
                  <div className="text-sm text-blue-100">Taxa de Satisfação</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-sm text-blue-100">Segurança de Dados</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Entre em Contato</h3>
            <p className="text-xl text-gray-600">Estamos aqui para ajudar você</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h4 className="text-lg font-semibold mb-2">Telefone</h4>
                <p className="text-gray-600">(92) 3215-4000</p>
                <p className="text-gray-600">0800 092 1512</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h4 className="text-lg font-semibold mb-2">E-mail</h4>
                <p className="text-gray-600">contato@setemp.am.gov.br</p>
                <p className="text-gray-600">atendimento@setemp.am.gov.br</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h4 className="text-lg font-semibold mb-2">Endereço</h4>
                <p className="text-gray-600">Av. Djalma Batista, 1018</p>
                <p className="text-gray-600">Chapada, Manaus - AM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modais de Cadastro */}
      {showCadastroCandidato && (
        <CadastroCandidato onClose={() => setShowCadastroCandidato(false)} />
      )}
      
      {showCadastroEmpresa && (
        <CadastroEmpresa onClose={() => setShowCadastroEmpresa(false)} />
      )}
    </div>
  )
}

// Página de Vagas Públicas
function VagasPage() {
  const [filtros, setFiltros] = useState({
    cargo: '',
    cidade: '',
    empresa: '',
    tipoContrato: ''
  })

  const vagas = [
    {
      id: 1,
      cargo: "Desenvolvedor Full Stack",
      empresa: "Tech Solutions Ltda",
      cidade: "Manaus",
      salario: "R$ 4.500 - R$ 6.000",
      tipo: "CLT",
      modalidade: "Híbrido",
      publicada: "2 dias atrás",
      descricao: "Desenvolvimento de aplicações web usando React, Node.js e PostgreSQL",
      requisitos: ["React", "Node.js", "PostgreSQL", "2+ anos experiência"]
    },
    {
      id: 2,
      cargo: "Assistente Administrativo",
      empresa: "Comércio Amazonas S.A",
      cidade: "Manaus",
      salario: "R$ 1.800 - R$ 2.200",
      tipo: "CLT",
      modalidade: "Presencial",
      publicada: "1 dia atrás",
      descricao: "Apoio administrativo geral, atendimento ao cliente e organização de documentos",
      requisitos: ["Ensino médio completo", "Conhecimento em Excel", "Boa comunicação"]
    },
    {
      id: 3,
      cargo: "Operador de Máquinas",
      empresa: "Indústria Norte Brasil",
      cidade: "Itacoatiara",
      salario: "R$ 2.500 - R$ 3.000",
      tipo: "CLT",
      modalidade: "Presencial",
      publicada: "3 horas atrás",
      descricao: "Operação de máquinas industriais e controle de qualidade",
      requisitos: ["Curso técnico", "Experiência com máquinas industriais", "Disponibilidade para turnos"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vagas de Emprego</h1>
          <p className="text-lg text-gray-600">Encontre a oportunidade ideal para você</p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrar Vagas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Input
                placeholder="Cargo"
                value={filtros.cargo}
                onChange={(e) => setFiltros({...filtros, cargo: e.target.value})}
              />
              <Input
                placeholder="Cidade"
                value={filtros.cidade}
                onChange={(e) => setFiltros({...filtros, cidade: e.target.value})}
              />
              <Input
                placeholder="Empresa"
                value={filtros.empresa}
                onChange={(e) => setFiltros({...filtros, empresa: e.target.value})}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={filtros.tipoContrato}
                onChange={(e) => setFiltros({...filtros, tipoContrato: e.target.value})}
              >
                <option value="">Tipo de Contrato</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
                <option value="Temporário">Temporário</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Vagas */}
        <div className="space-y-6">
          {vagas.map((vaga) => (
            <Card key={vaga.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{vaga.cargo}</CardTitle>
                    <CardDescription className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-1" />
                      {vaga.empresa}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vaga.cidade}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {vaga.publicada}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold mb-2">{vaga.salario}</div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{vaga.tipo}</Badge>
                      <Badge variant="outline">{vaga.modalidade}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{vaga.descricao}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requisitos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vaga.requisitos.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <LogIn className="w-4 h-4 mr-2" />
                    Candidatar-se
                  </Button>
                  <Button variant="outline">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Painel do Candidato
function CandidatoPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('perfil')

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Área do Candidato</CardTitle>
              <CardDescription>Faça login ou cadastre-se para acessar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <Input type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsLoggedIn(true)}
              >
                Entrar
              </Button>
              <div className="text-center">
                <Button variant="link" className="text-blue-600">
                  Não tem conta? Cadastre-se
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel do Candidato</h1>
          <p className="text-gray-600">Bem-vindo, João Silva!</p>
        </div>

        {/* Navegação do Painel */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'perfil', label: 'Meu Perfil' },
              { id: 'vagas', label: 'Vagas Disponíveis' },
              { id: 'candidaturas', label: 'Minhas Candidaturas' },
              { id: 'notificacoes', label: 'Notificações' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo do Painel */}
        {activeTab === 'perfil' && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nome Completo</label>
                    <Input defaultValue="João Silva Santos" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CPF</label>
                    <Input defaultValue="123.456.789-00" disabled />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Telefone</label>
                    <Input defaultValue="(92) 99999-1234" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail</label>
                    <Input defaultValue="joao@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Cidade</label>
                  <Input defaultValue="Manaus" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experiência Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold">Desenvolvedor Junior</h4>
                    <p className="text-sm text-gray-600">Tech Company - 2020 a 2023</p>
                    <p className="text-sm">Desenvolvimento de aplicações web</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    + Adicionar Experiência
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'candidaturas' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Candidaturas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { vaga: 'Desenvolvedor Full Stack', empresa: 'Tech Solutions', status: 'Em análise', data: '15/01/2024' },
                    { vaga: 'Analista de Sistemas', empresa: 'Software Corp', status: 'Entrevista', data: '12/01/2024' },
                    { vaga: 'Programador Junior', empresa: 'StartupAM', status: 'Aprovado', data: '10/01/2024' }
                  ].map((candidatura, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{candidatura.vaga}</h4>
                        <p className="text-sm text-gray-600">{candidatura.empresa}</p>
                        <p className="text-xs text-gray-500">Candidatura em {candidatura.data}</p>
                      </div>
                      <Badge 
                        variant={candidatura.status === 'Aprovado' ? 'default' : 'secondary'}
                        className={
                          candidatura.status === 'Aprovado' ? 'bg-green-600' :
                          candidatura.status === 'Entrevista' ? 'bg-yellow-600' : 'bg-blue-600'
                        }
                      >
                        {candidatura.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Painel da Empresa
function EmpresaPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Área da Empresa</CardTitle>
              <CardDescription>Acesso para empresas parceiras</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">CNPJ</label>
                <Input placeholder="00.000.000/0001-00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setIsLoggedIn(true)}
              >
                Entrar
              </Button>
              <div className="text-center">
                <Button variant="link" className="text-green-600">
                  Cadastrar Empresa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel da Empresa</h1>
          <p className="text-gray-600">Tech Solutions Ltda</p>
        </div>

        {/* Navegação do Painel */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'vagas', label: 'Minhas Vagas' },
              { id: 'candidatos', label: 'Candidatos' },
              { id: 'nova-vaga', label: 'Nova Vaga' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <div className="text-2xl font-bold mb-2">5</div>
                <div className="text-sm text-gray-600">Vagas Ativas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <div className="text-2xl font-bold mb-2">127</div>
                <div className="text-sm text-gray-600">Candidaturas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <UserCheck className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <div className="text-2xl font-bold mb-2">8</div>
                <div className="text-sm text-gray-600">Contratações</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <div className="text-2xl font-bold mb-2">92%</div>
                <div className="text-sm text-gray-600">Taxa de Sucesso</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Nova Vaga */}
        {activeTab === 'nova-vaga' && (
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Nova Vaga</CardTitle>
              <CardDescription>Preencha os dados da vaga para publicação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Cargo</label>
                  <Input placeholder="Ex: Desenvolvedor Full Stack" />
                </div>
                <div>
                  <label className="text-sm font-medium">Cidade</label>
                  <Input placeholder="Ex: Manaus" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Descrição da Vaga</label>
                <textarea 
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Descreva as principais atividades e responsabilidades..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Salário Mínimo</label>
                  <Input placeholder="R$ 0,00" />
                </div>
                <div>
                  <label className="text-sm font-medium">Salário Máximo</label>
                  <Input placeholder="R$ 0,00" />
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo de Contrato</label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                    <option>CLT</option>
                    <option>PJ</option>
                    <option>Estágio</option>
                    <option>Temporário</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Requisitos</label>
                <textarea 
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Liste os requisitos necessários..."
                />
              </div>

              <Button className="bg-green-600 hover:bg-green-700">
                Publicar Vaga
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Painel Administrativo
function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Administração SETEMP</CardTitle>
              <CardDescription>Acesso restrito aos administradores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Usuário</label>
                <Input placeholder="admin@setemp.am.gov.br" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => setIsLoggedIn(true)}
              >
                Entrar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gestão completa do sistema SETEMP</p>
        </div>

        {/* Navegação do Painel */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'candidatos', label: 'Candidatos' },
              { id: 'empresas', label: 'Empresas' },
              { id: 'noticias', label: 'Notícias' },
              { id: 'vagas', label: 'Vagas' },
              { id: 'relatorios', label: 'Relatórios' },
              { id: 'sine', label: 'Integração SINE' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Administrativo */}
        {activeTab === 'dashboard' && (
          <DashboardCharts />
        )}

        {/* Gerenciar Candidatos */}
        {activeTab === 'candidatos' && (
          <GerenciarCandidatos />
        )}

        {/* Gerenciar Empresas */}
        {activeTab === 'empresas' && (
          <GerenciarEmpresas />
        )}

        {/* Gerenciar Notícias */}
        {activeTab === 'noticias' && (
          <GerenciarNoticias />
        )}

        {/* Relatórios */}
        {activeTab === 'relatorios' && (
          <RelatoriosAdmin />
        )}

        {/* Integração SINE */}
        {activeTab === 'sine' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integração com SINE</CardTitle>
                <CardDescription>Sincronização de dados com o Sistema Nacional de Emprego</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Exportar Candidatos</h3>
                      <p className="text-sm text-gray-600 mb-4">Enviar dados de candidatos para o SINE</p>
                      <Button className="w-full">Exportar</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="w-6 h-6 text-green-600 rotate-180" />
                      </div>
                      <h3 className="font-semibold mb-2">Importar Vagas</h3>
                      <p className="text-sm text-gray-600 mb-4">Receber vagas do SINE Nacional</p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Importar</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Sincronização</h3>
                      <p className="text-sm text-gray-600 mb-4">Sincronização automática completa</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Sincronizar</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Sincronizações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tipo: 'Exportação de Candidatos', status: 'Concluída', data: '15/01/2024 14:30', registros: 1250 },
                    { tipo: 'Importação de Vagas', status: 'Concluída', data: '15/01/2024 09:15', registros: 45 },
                    { tipo: 'Sincronização Completa', status: 'Em andamento', data: '15/01/2024 16:00', registros: 0 },
                    { tipo: 'Exportação de Candidatos', status: 'Erro', data: '14/01/2024 11:20', registros: 0 }
                  ].map((sync, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{sync.tipo}</h4>
                        <p className="text-sm text-gray-600">{sync.data}</p>
                        {sync.registros > 0 && (
                          <p className="text-xs text-gray-500">{sync.registros} registros processados</p>
                        )}
                      </div>
                      <Badge 
                        variant={
                          sync.status === 'Concluída' ? 'default' :
                          sync.status === 'Em andamento' ? 'secondary' : 'destructive'
                        }
                        className={
                          sync.status === 'Concluída' ? 'bg-green-600' :
                          sync.status === 'Em andamento' ? 'bg-yellow-600' : 'bg-red-600'
                        }
                      >
                        {sync.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold">SETEMP</h4>
                <p className="text-sm text-gray-400">Amazonas</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Conectando talentos e oportunidades no Estado do Amazonas.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Serviços</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Busca de Vagas</a></li>
              <li><a href="#" className="hover:text-white">Cadastro de Candidatos</a></li>
              <li><a href="#" className="hover:text-white">Portal da Empresa</a></li>
              <li><a href="#" className="hover:text-white">Capacitação</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Programas</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Qualifica Amazonas</a></li>
              <li><a href="#" className="hover:text-white">Empreende AM</a></li>
              <li><a href="#" className="hover:text-white">Primeiro Emprego</a></li>
              <li><a href="#" className="hover:text-white">SINE Amazonas</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Institucional</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Sobre a SETEMP</a></li>
              <li><a href="#" className="hover:text-white">Notícias</a></li>
              <li><a href="#" className="hover:text-white">Transparência</a></li>
              <li><a href="#" className="hover:text-white">Ouvidoria</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 SETEMP - Secretaria Executiva do Trabalho e Empreendedorismo do Amazonas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Componente principal
export default function Home() {
  const [currentView, setCurrentView] = useState('home')
  const [noticiaAtual, setNoticiaAtual] = useState<NoticiaData | null>(null)

  const handleNoticiaClick = (noticia: NoticiaData) => {
    setNoticiaAtual(noticia)
    setCurrentView('noticia-individual')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNoticiaClick={handleNoticiaClick} />
      case 'noticias':
        return <NoticiasPage onVoltar={() => setCurrentView('home')} />
      case 'noticia-individual':
        return noticiaAtual ? (
          <NoticiaIndividual 
            slug={noticiaAtual.slug} 
            onVoltar={() => setCurrentView('noticias')} 
          />
        ) : <HomePage onNoticiaClick={handleNoticiaClick} />
      case 'vagas':
        return <VagasPage />
      case 'candidato':
        return <CandidatoPanel />
      case 'empresa':
        return <EmpresaPanel />
      case 'admin':
        return <AdminPanel />
      default:
        return <HomePage onNoticiaClick={handleNoticiaClick} />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
      <Footer />
    </div>
  )
}