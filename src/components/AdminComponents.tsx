"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  FileText,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Bell,
  Search,
  X,
  User,
  GraduationCap,
  MapPinIcon,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Save,
  Image as ImageIcon,
  Globe
} from 'lucide-react'
import { 
  obterEmpresasPendentes, 
  obterCandidatos, 
  obterEmpresas, 
  obterNotificacoesAdmin,
  obterEstatisticas,
  aprovarEmpresa,
  marcarNotificacaoComoLida,
  obterNoticias,
  obterNoticiaPorId,
  criarNoticia,
  atualizarNoticia,
  excluirNoticia,
  obterCategorias,
  type EmpresaData,
  type CandidatoData,
  type NotificacaoAdmin,
  type NoticiaData
} from '@/lib/backend-simulation'

// Componente de Relatórios
export function RelatoriosAdmin() {
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    tipo: '',
    cidade: ''
  })

  const tiposRelatorio = [
    { value: 'candidatos', label: 'Relatório de Candidatos', icon: <Users className="w-4 h-4" /> },
    { value: 'empresas', label: 'Relatório de Empresas', icon: <Building2 className="w-4 h-4" /> },
    { value: 'vagas', label: 'Relatório de Vagas', icon: <Briefcase className="w-4 h-4" /> },
    { value: 'candidaturas', label: 'Relatório de Candidaturas', icon: <FileText className="w-4 h-4" /> },
    { value: 'geral', label: 'Relatório Geral', icon: <BarChart3 className="w-4 h-4" /> }
  ]

  const relatoriosRecentes = [
    {
      id: 1,
      nome: 'Candidatos por Cidade - Janeiro 2024',
      tipo: 'candidatos',
      dataGeracao: '2024-01-20',
      tamanho: '2.3 MB',
      formato: 'PDF'
    },
    {
      id: 2,
      nome: 'Vagas Preenchidas - Dezembro 2023',
      tipo: 'vagas',
      dataGeracao: '2024-01-15',
      tamanho: '1.8 MB',
      formato: 'Excel'
    },
    {
      id: 3,
      nome: 'Empresas Cadastradas - 2023',
      tipo: 'empresas',
      dataGeracao: '2024-01-10',
      tamanho: '950 KB',
      formato: 'PDF'
    }
  ]

  const gerarRelatorio = () => {
    console.log('Gerando relatório com filtros:', filtros)
    alert('Relatório sendo gerado! Você receberá um e-mail quando estiver pronto.')
  }

  return (
    <div className="space-y-6">
      {/* Filtros para Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Gerar Novo Relatório
          </CardTitle>
          <CardDescription>
            Configure os parâmetros para gerar um relatório personalizado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filtros.tipo}
                onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
              >
                <option value="">Selecione o tipo</option>
                {tiposRelatorio.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Data Início</label>
              <Input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({...filtros, dataInicio: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Data Fim</label>
              <Input
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({...filtros, dataFim: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Cidade</label>
              <Input
                placeholder="Todas as cidades"
                value={filtros.cidade}
                onChange={(e) => setFiltros({...filtros, cidade: e.target.value})}
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <Button onClick={gerarRelatorio} className="bg-purple-600 hover:bg-purple-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Últimos relatórios gerados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatoriosRecentes.map((relatorio) => (
              <div key={relatorio.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{relatorio.nome}</h4>
                    <p className="text-sm text-gray-600">
                      Gerado em {relatorio.dataGeracao} • {relatorio.tamanho} • {relatorio.formato}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente de Dashboard com Gráficos
export function DashboardCharts() {
  const [estatisticas, setEstatisticas] = useState<any>(null)
  const [notificacoes, setNotificacoes] = useState<NotificacaoAdmin[]>([])

  useEffect(() => {
    // Carregar dados do sistema
    const stats = obterEstatisticas()
    const notifs = obterNotificacoesAdmin()
    
    setEstatisticas(stats)
    setNotificacoes(notifs.slice(0, 5)) // Últimas 5 notificações
  }, [])

  if (!estatisticas) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const estatisticasGraficos = {
    candidatosPorMes: [
      { mes: 'Jan', valor: 1250 },
      { mes: 'Fev', valor: 1380 },
      { mes: 'Mar', valor: 1420 },
      { mes: 'Abr', valor: 1650 },
      { mes: 'Mai', valor: 1580 },
      { mes: 'Jun', valor: 1720 }
    ],
    vagasPorArea: [
      { area: 'Tecnologia', vagas: 145, cor: 'bg-blue-500' },
      { area: 'Administração', vagas: 98, cor: 'bg-green-500' },
      { area: 'Vendas', vagas: 87, cor: 'bg-purple-500' },
      { area: 'Saúde', vagas: 76, cor: 'bg-red-500' },
      { area: 'Educação', vagas: 65, cor: 'bg-yellow-500' }
    ],
    candidaturasPorStatus: [
      { status: 'Em Análise', quantidade: 450, cor: 'bg-blue-500' },
      { status: 'Entrevista', quantidade: 180, cor: 'bg-yellow-500' },
      { status: 'Aprovado', quantidade: 95, cor: 'bg-green-500' },
      { status: 'Contratado', quantidade: 67, cor: 'bg-emerald-500' },
      { status: 'Rejeitado', quantidade: 234, cor: 'bg-red-500' }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Candidatos Ativos</p>
                <p className="text-2xl font-bold text-blue-600">{estatisticas.candidatosAtivos}</p>
                <p className="text-xs text-gray-500">
                  {estatisticas.candidatosPendentes} pendentes
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Empresas Aprovadas</p>
                <p className="text-2xl font-bold text-green-600">{estatisticas.empresasAprovadas}</p>
                <p className="text-xs text-gray-500">
                  {estatisticas.empresasPendentes} aguardando
                </p>
              </div>
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notificações</p>
                <p className="text-2xl font-bold text-orange-600">{estatisticas.notificacoesNaoLidas}</p>
                <p className="text-xs text-gray-500">Não lidas</p>
              </div>
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notícias Publicadas</p>
                <p className="text-2xl font-bold text-purple-600">{estatisticas.noticiasPublicadas}</p>
                <p className="text-xs text-gray-500">
                  {estatisticas.totalNoticias} total
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notificações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificações Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificacoes.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nenhuma notificação</p>
            ) : (
              notificacoes.map((notificacao) => (
                <div key={notificacao.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notificacao.prioridade === 'alta' ? 'bg-red-500' :
                    notificacao.prioridade === 'urgente' ? 'bg-red-600' :
                    notificacao.prioridade === 'normal' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium">{notificacao.titulo}</h4>
                    <p className="text-sm text-gray-600">{notificacao.mensagem}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notificacao.data).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  {!notificacao.lida && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Nova
                    </Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Candidatos por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Candidatos por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {estatisticasGraficos.candidatosPorMes.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.mes}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(item.valor / 2000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{item.valor}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vagas por Área */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Vagas por Área
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {estatisticasGraficos.vagasPorArea.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.cor}`} />
                    <span className="text-sm font-medium">{item.area}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.cor}`}
                        style={{ width: `${(item.vagas / 150) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{item.vagas}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status das Candidaturas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Status das Candidaturas
          </CardTitle>
          <CardDescription>
            Distribuição atual das candidaturas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {estatisticasGraficos.candidaturasPorStatus.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full ${item.cor} mx-auto mb-2 flex items-center justify-center`}>
                  <span className="text-white font-bold">{item.quantidade}</span>
                </div>
                <p className="text-sm font-medium">{item.status}</p>
                <p className="text-xs text-gray-500">
                  {((item.quantidade / 1026) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente para Gerenciar Empresas
export function GerenciarEmpresas() {
  const [empresas, setEmpresas] = useState<EmpresaData[]>([])
  const [empresasPendentes, setEmpresasPendentes] = useState<EmpresaData[]>([])
  const [loading, setLoading] = useState(true)
  const [processando, setProcessando] = useState<string | null>(null)
  const [filtro, setFiltro] = useState('')
  const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaData | null>(null)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = () => {
    setLoading(true)
    try {
      const todasEmpresas = obterEmpresas()
      const pendentes = obterEmpresasPendentes()
      
      setEmpresas(todasEmpresas)
      setEmpresasPendentes(pendentes)
    } catch (error) {
      console.error('Erro ao carregar empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAprovarEmpresa = async (empresaId: string, aprovado: boolean, motivo?: string) => {
    setProcessando(empresaId)
    
    try {
      const resultado = await aprovarEmpresa(empresaId, aprovado, motivo)
      
      if (resultado.sucesso) {
        alert(`✅ ${resultado.mensagem}`)
        carregarDados() // Recarregar dados
      } else {
        alert(`❌ ${resultado.mensagem}`)
      }
    } catch (error) {
      console.error('Erro ao processar empresa:', error)
      alert('Erro interno do sistema')
    } finally {
      setProcessando(null)
    }
  }

  const empresasFiltradas = empresas.filter(empresa => 
    empresa.razaoSocial.toLowerCase().includes(filtro.toLowerCase()) ||
    empresa.cnpj.includes(filtro) ||
    empresa.contato.email.toLowerCase().includes(filtro.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Empresas Pendentes de Aprovação */}
      {empresasPendentes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <Clock className="w-5 h-5 mr-2" />
              Empresas Aguardando Aprovação ({empresasPendentes.length})
            </CardTitle>
            <CardDescription>
              Empresas que precisam ser analisadas e aprovadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {empresasPendentes.map((empresa) => (
                <div key={empresa.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{empresa.razaoSocial}</h4>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Pendente
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                          <p><strong>Nome Fantasia:</strong> {empresa.nomeFantasia || 'Não informado'}</p>
                          <p><strong>Área:</strong> {empresa.areaAtuacao}</p>
                          <p><strong>Porte:</strong> {empresa.porte}</p>
                        </div>
                        <div>
                          <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {empresa.contato.email}
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {empresa.contato.telefone}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {empresa.endereco.cidade}
                          </p>
                          <p><strong>Responsável:</strong> {empresa.responsavelRH.nome}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500">
                        Cadastrado em: {new Date(empresa.dataCadastro).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEmpresaSelecionada(empresa)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalhes
                      </Button>
                      
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAprovarEmpresa(empresa.id!, true)}
                        disabled={processando === empresa.id}
                      >
                        {processando === empresa.id ? (
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        )}
                        Aprovar
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const motivo = prompt('Motivo da rejeição:')
                          if (motivo) {
                            handleAprovarEmpresa(empresa.id!, false, motivo)
                          }
                        }}
                        disabled={processando === empresa.id}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Todas as Empresas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Todas as Empresas ({empresas.length})
          </CardTitle>
          <CardDescription>
            Gerenciar todas as empresas cadastradas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtro */}
          <div className="mb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Buscar por razão social, CNPJ ou e-mail..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Lista de Empresas */}
          <div className="space-y-4">
            {empresasFiltradas.map((empresa) => (
              <div key={empresa.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{empresa.razaoSocial}</h4>
                      <Badge 
                        variant={
                          empresa.status === 'aprovada' ? 'default' :
                          empresa.status === 'pendente' ? 'secondary' :
                          empresa.status === 'rejeitada' ? 'destructive' : 'outline'
                        }
                        className={
                          empresa.status === 'aprovada' ? 'bg-green-600' :
                          empresa.status === 'pendente' ? 'bg-yellow-600' :
                          empresa.status === 'rejeitada' ? 'bg-red-600' : ''
                        }
                      >
                        {empresa.status === 'aprovada' ? 'Aprovada' :
                         empresa.status === 'pendente' ? 'Pendente' :
                         empresa.status === 'rejeitada' ? 'Rejeitada' : 'Suspensa'}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                        <p><strong>Área:</strong> {empresa.areaAtuacao}</p>
                      </div>
                      <div>
                        <p><strong>E-mail:</strong> {empresa.contato.email}</p>
                        <p><strong>Cidade:</strong> {empresa.endereco.cidade}</p>
                      </div>
                      <div>
                        <p><strong>Responsável:</strong> {empresa.responsavelRH.nome}</p>
                        <p><strong>Cadastro:</strong> {new Date(empresa.dataCadastro).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEmpresaSelecionada(empresa)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
            
            {empresasFiltradas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {filtro ? 'Nenhuma empresa encontrada com os filtros aplicados' : 'Nenhuma empresa cadastrada'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes da Empresa */}
      {empresaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Detalhes da Empresa</CardTitle>
                  <Button variant="outline" onClick={() => setEmpresaSelecionada(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Dados da Empresa</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Razão Social:</strong> {empresaSelecionada.razaoSocial}</p>
                      <p><strong>Nome Fantasia:</strong> {empresaSelecionada.nomeFantasia || 'Não informado'}</p>
                      <p><strong>CNPJ:</strong> {empresaSelecionada.cnpj}</p>
                      <p><strong>Área de Atuação:</strong> {empresaSelecionada.areaAtuacao}</p>
                      <p><strong>Porte:</strong> {empresaSelecionada.porte}</p>
                      {empresaSelecionada.contato.site && (
                        <p><strong>Site:</strong> {empresaSelecionada.contato.site}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Endereço</h4>
                    <div className="space-y-1 text-sm">
                      <p>{empresaSelecionada.endereco.rua}, {empresaSelecionada.endereco.numero}</p>
                      <p>{empresaSelecionada.endereco.bairro}</p>
                      <p>{empresaSelecionada.endereco.cidade} - AM</p>
                      <p>CEP: {empresaSelecionada.endereco.cep}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Contato</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Telefone:</strong> {empresaSelecionada.contato.telefone}</p>
                      <p><strong>E-mail:</strong> {empresaSelecionada.contato.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Responsável RH</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nome:</strong> {empresaSelecionada.responsavelRH.nome}</p>
                      <p><strong>Cargo:</strong> {empresaSelecionada.responsavelRH.cargo}</p>
                      <p><strong>E-mail:</strong> {empresaSelecionada.responsavelRH.email}</p>
                      <p><strong>Telefone:</strong> {empresaSelecionada.responsavelRH.telefone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Status e Datas</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Status:</strong> 
                      <Badge className="ml-2" variant={
                        empresaSelecionada.status === 'aprovada' ? 'default' :
                        empresaSelecionada.status === 'pendente' ? 'secondary' : 'destructive'
                      }>
                        {empresaSelecionada.status === 'aprovada' ? 'Aprovada' :
                         empresaSelecionada.status === 'pendente' ? 'Pendente' : 'Rejeitada'}
                      </Badge>
                    </p>
                    <p><strong>Data de Cadastro:</strong> {new Date(empresaSelecionada.dataCadastro).toLocaleString('pt-BR')}</p>
                    {empresaSelecionada.dataAprovacao && (
                      <p><strong>Data de Aprovação:</strong> {new Date(empresaSelecionada.dataAprovacao).toLocaleString('pt-BR')}</p>
                    )}
                    {empresaSelecionada.motivoRejeicao && (
                      <p><strong>Motivo da Rejeição:</strong> {empresaSelecionada.motivoRejeicao}</p>
                    )}
                  </div>
                </div>
                
                {empresaSelecionada.status === 'pendente' && (
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleAprovarEmpresa(empresaSelecionada.id!, true)
                        setEmpresaSelecionada(null)
                      }}
                      disabled={processando === empresaSelecionada.id}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovar Empresa
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const motivo = prompt('Motivo da rejeição:')
                        if (motivo) {
                          handleAprovarEmpresa(empresaSelecionada.id!, false, motivo)
                          setEmpresaSelecionada(null)
                        }
                      }}
                      disabled={processando === empresaSelecionada.id}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar Empresa
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para Gerenciar Candidatos com Busca Avançada
export function GerenciarCandidatos() {
  const [candidatos, setCandidatos] = useState<CandidatoData[]>([])
  const [candidatosFiltrados, setCandidatosFiltrados] = useState<CandidatoData[]>([])
  const [loading, setLoading] = useState(true)
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<CandidatoData | null>(null)
  
  // Estados dos filtros
  const [buscaRapida, setBuscaRapida] = useState('')
  const [filtros, setFiltros] = useState({
    experiencia: '',
    idadeMin: '',
    idadeMax: '',
    bairro: '',
    sexo: '',
    escolaridade: ''
  })
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false)

  useEffect(() => {
    carregarCandidatos()
  }, [])

  useEffect(() => {
    aplicarFiltros()
  }, [candidatos, buscaRapida, filtros])

  const carregarCandidatos = () => {
    setLoading(true)
    try {
      // Adicionar dados de exemplo para demonstração
      const candidatosExemplo: CandidatoData[] = [
        {
          id: '1',
          nome: 'Maria Silva Santos',
          cpf: '123.456.789-00',
          dataNascimento: '1990-05-15',
          telefone: '(92) 99999-1234',
          email: 'maria.silva@email.com',
          senha: 'senha123',
          endereco: {
            rua: 'Rua das Flores',
            numero: '123',
            bairro: 'Compensa',
            cidade: 'Manaus',
            cep: '69057-000'
          },
          escolaridade: 'superior',
          areasInteresse: ['Enfermagem', 'Saúde'],
          experiencias: [
            {
              empresa: 'Hospital Adventista',
              cargo: 'Enfermeira',
              dataInicio: '2020-01-01',
              dataFim: '2023-12-31',
              descricao: 'Atendimento em UTI e emergência',
              ativo: false
            }
          ],
          status: 'ativo',
          dataCadastro: '2024-01-15T10:30:00Z',
          emailConfirmado: true
        },
        {
          id: '2',
          nome: 'João Carlos Oliveira',
          cpf: '987.654.321-00',
          dataNascimento: '1985-08-22',
          telefone: '(92) 98888-5678',
          email: 'joao.carlos@email.com',
          senha: 'senha123',
          endereco: {
            rua: 'Av. Constantino Nery',
            numero: '456',
            bairro: 'Chapada',
            cidade: 'Manaus',
            cep: '69050-000'
          },
          escolaridade: 'tecnico',
          areasInteresse: ['Mecânica', 'Automobilística'],
          experiencias: [
            {
              empresa: 'Oficina Central',
              cargo: 'Mecânico Automotivo',
              dataInicio: '2018-03-01',
              dataFim: null,
              descricao: 'Manutenção e reparo de veículos',
              ativo: true
            }
          ],
          status: 'ativo',
          dataCadastro: '2024-01-10T14:20:00Z',
          emailConfirmado: true
        },
        {
          id: '3',
          nome: 'Ana Paula Costa',
          cpf: '456.789.123-00',
          dataNascimento: '1995-12-03',
          telefone: '(92) 97777-9012',
          email: 'ana.paula@email.com',
          senha: 'senha123',
          endereco: {
            rua: 'Rua Recife',
            numero: '789',
            bairro: 'Adrianópolis',
            cidade: 'Manaus',
            cep: '69057-001'
          },
          escolaridade: 'superior',
          areasInteresse: ['Administração', 'Recursos Humanos'],
          experiencias: [
            {
              empresa: 'Empresa ABC',
              cargo: 'Assistente Administrativo',
              dataInicio: '2019-06-01',
              dataFim: '2023-05-31',
              descricao: 'Gestão de documentos e atendimento ao cliente',
              ativo: false
            }
          ],
          status: 'ativo',
          dataCadastro: '2024-01-08T09:15:00Z',
          emailConfirmado: true
        },
        {
          id: '4',
          nome: 'Carlos Eduardo Lima',
          cpf: '321.654.987-00',
          dataNascimento: '1988-03-18',
          telefone: '(92) 96666-3456',
          email: 'carlos.eduardo@email.com',
          senha: 'senha123',
          endereco: {
            rua: 'Av. Torquato Tapajós',
            numero: '321',
            bairro: 'Compensa',
            cidade: 'Manaus',
            cep: '69036-000'
          },
          escolaridade: 'medio',
          areasInteresse: ['Elétrica', 'Manutenção'],
          experiencias: [
            {
              empresa: 'Eletro Norte',
              cargo: 'Eletricista',
              dataInicio: '2015-01-01',
              dataFim: null,
              descricao: 'Instalações elétricas residenciais e comerciais',
              ativo: true
            }
          ],
          status: 'ativo',
          dataCadastro: '2024-01-05T16:45:00Z',
          emailConfirmado: true
        },
        {
          id: '5',
          nome: 'Fernanda Souza',
          cpf: '654.321.987-00',
          dataNascimento: '1992-07-25',
          telefone: '(92) 95555-7890',
          email: 'fernanda.souza@email.com',
          senha: 'senha123',
          endereco: {
            rua: 'Rua Lobo D\'Almada',
            numero: '654',
            bairro: 'Centro',
            cidade: 'Manaus',
            cep: '69010-030'
          },
          escolaridade: 'superior',
          areasInteresse: ['Enfermagem', 'Pediatria'],
          experiencias: [
            {
              empresa: 'Clínica Infantil',
              cargo: 'Enfermeira Pediatra',
              dataInicio: '2017-09-01',
              dataFim: '2023-08-31',
              descricao: 'Cuidados especializados em pediatria',
              ativo: false
            }
          ],
          status: 'ativo',
          dataCadastro: '2024-01-03T11:30:00Z',
          emailConfirmado: true
        }
      ]

      const candidatosReais = obterCandidatos()
      const todosCandidatos = [...candidatosReais, ...candidatosExemplo]
      setCandidatos(todosCandidatos)
    } catch (error) {
      console.error('Erro ao carregar candidatos:', error)
    } finally {
      setLoading(false)
    }
  }

  const calcularIdade = (dataNascimento: string): number => {
    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }
    
    return idade
  }

  const obterSexoPorNome = (nome: string): string => {
    // Lógica simples para determinar sexo pelo nome (em produção seria um campo específico)
    const nomesPrimeiros = nome.split(' ')[0].toLowerCase()
    const nomesFemininos = ['maria', 'ana', 'fernanda', 'carla', 'patricia', 'sandra', 'lucia', 'julia', 'beatriz', 'camila']
    const nomesMasculinos = ['joão', 'carlos', 'josé', 'antonio', 'francisco', 'paulo', 'pedro', 'luis', 'marcos', 'rafael']
    
    if (nomesFemininos.some(n => nomesPrimeiros.includes(n))) return 'feminino'
    if (nomesMasculinos.some(n => nomesPrimeiros.includes(n))) return 'masculino'
    return 'outro'
  }

  const aplicarFiltros = () => {
    let resultado = candidatos

    // Busca rápida
    if (buscaRapida.trim()) {
      const termo = buscaRapida.toLowerCase()
      resultado = resultado.filter(candidato => 
        candidato.nome.toLowerCase().includes(termo) ||
        candidato.cpf.includes(termo) ||
        candidato.email.toLowerCase().includes(termo) ||
        candidato.endereco.bairro.toLowerCase().includes(termo) ||
        candidato.endereco.cidade.toLowerCase().includes(termo) ||
        candidato.areasInteresse.some(area => area.toLowerCase().includes(termo)) ||
        candidato.experiencias.some(exp => 
          exp.cargo.toLowerCase().includes(termo) ||
          exp.empresa.toLowerCase().includes(termo) ||
          (exp.descricao && exp.descricao.toLowerCase().includes(termo))
        )
      )
    }

    // Filtros avançados
    if (filtros.experiencia.trim()) {
      const termo = filtros.experiencia.toLowerCase()
      resultado = resultado.filter(candidato =>
        candidato.areasInteresse.some(area => area.toLowerCase().includes(termo)) ||
        candidato.experiencias.some(exp => 
          exp.cargo.toLowerCase().includes(termo) ||
          exp.empresa.toLowerCase().includes(termo) ||
          (exp.descricao && exp.descricao.toLowerCase().includes(termo))
        )
      )
    }

    if (filtros.idadeMin || filtros.idadeMax) {
      resultado = resultado.filter(candidato => {
        const idade = calcularIdade(candidato.dataNascimento)
        const min = filtros.idadeMin ? parseInt(filtros.idadeMin) : 0
        const max = filtros.idadeMax ? parseInt(filtros.idadeMax) : 120
        return idade >= min && idade <= max
      })
    }

    if (filtros.bairro.trim()) {
      const termo = filtros.bairro.toLowerCase()
      resultado = resultado.filter(candidato =>
        candidato.endereco.bairro.toLowerCase().includes(termo)
      )
    }

    if (filtros.sexo) {
      resultado = resultado.filter(candidato => {
        const sexo = obterSexoPorNome(candidato.nome)
        return sexo === filtros.sexo
      })
    }

    if (filtros.escolaridade) {
      resultado = resultado.filter(candidato =>
        candidato.escolaridade === filtros.escolaridade
      )
    }

    setCandidatosFiltrados(resultado)
  }

  const limparFiltros = () => {
    setBuscaRapida('')
    setFiltros({
      experiencia: '',
      idadeMin: '',
      idadeMax: '',
      bairro: '',
      sexo: '',
      escolaridade: ''
    })
  }

  const baixarCurriculo = (candidato: CandidatoData) => {
    // Simular download do currículo
    alert(`Baixando currículo de ${candidato.nome}...`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            SETEMP - Busca Avançada de Candidatos ({candidatosFiltrados.length})
          </CardTitle>
          <CardDescription>
            Sistema inteligente de busca e filtragem de candidatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Busca Rápida */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Busca rápida: nome, área, experiência, bairro..."
                value={buscaRapida}
                onChange={(e) => setBuscaRapida(e.target.value)}
                className="pl-10 text-base"
              />
            </div>

            {/* Toggle Filtros Avançados */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
                className="flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
                {mostrarFiltrosAvancados ? (
                  <X className="w-4 h-4 ml-2" />
                ) : (
                  <span className="ml-2">▼</span>
                )}
              </Button>
              
              {(buscaRapida || Object.values(filtros).some(v => v)) && (
                <Button variant="ghost" onClick={limparFiltros} className="text-red-600">
                  <X className="w-4 h-4 mr-1" />
                  Limpar Filtros
                </Button>
              )}
            </div>

            {/* Filtros Avançados */}
            {mostrarFiltrosAvancados && (
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Experiência/Área */}
                    <div>
                      <label className="text-sm font-medium flex items-center mb-2">
                        <Briefcase className="w-4 h-4 mr-1" />
                        Experiência/Área
                      </label>
                      <Input
                        placeholder="Ex: enfermagem, mecânica..."
                        value={filtros.experiencia}
                        onChange={(e) => setFiltros({...filtros, experiencia: e.target.value})}
                      />
                    </div>

                    {/* Idade */}
                    <div>
                      <label className="text-sm font-medium flex items-center mb-2">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        Faixa de Idade
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filtros.idadeMin}
                          onChange={(e) => setFiltros({...filtros, idadeMin: e.target.value})}
                          className="w-20"
                        />
                        <span className="self-center">até</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filtros.idadeMax}
                          onChange={(e) => setFiltros({...filtros, idadeMax: e.target.value})}
                          className="w-20"
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div>
                      <label className="text-sm font-medium flex items-center mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        Bairro
                      </label>
                      <Input
                        placeholder="Ex: Compensa, Centro..."
                        value={filtros.bairro}
                        onChange={(e) => setFiltros({...filtros, bairro: e.target.value})}
                      />
                    </div>

                    {/* Sexo */}
                    <div>
                      <label className="text-sm font-medium flex items-center mb-2">
                        <User className="w-4 h-4 mr-1" />
                        Sexo
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filtros.sexo}
                        onChange={(e) => setFiltros({...filtros, sexo: e.target.value})}
                      >
                        <option value="">Todos</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    {/* Escolaridade */}
                    <div>
                      <label className="text-sm font-medium flex items-center mb-2">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        Escolaridade
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filtros.escolaridade}
                        onChange={(e) => setFiltros({...filtros, escolaridade: e.target.value})}
                      >
                        <option value="">Todas</option>
                        <option value="fundamental">Fundamental</option>
                        <option value="medio">Médio</option>
                        <option value="tecnico">Técnico</option>
                        <option value="superior">Superior</option>
                        <option value="pos-graduacao">Pós-Graduação</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resultados */}
          <div className="mt-6">
            {candidatosFiltrados.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Nenhum candidato encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
              </div>
            ) : (
              <div className="space-y-4">
                {candidatosFiltrados.map((candidato) => {
                  const idade = calcularIdade(candidato.dataNascimento)
                  const sexo = obterSexoPorNome(candidato.nome)
                  
                  return (
                    <div key={candidato.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            <h4 className="font-semibold text-lg">{candidato.nome}</h4>
                            <Badge 
                              variant={candidato.status === 'ativo' ? 'default' : 'secondary'}
                              className={candidato.status === 'ativo' ? 'bg-green-600' : 'bg-yellow-600'}
                            >
                              {candidato.status === 'ativo' ? 'Ativo' : 'Pendente'}
                            </Badge>
                            {!candidato.emailConfirmado && (
                              <Badge variant="outline" className="text-orange-600 border-orange-600">
                                E-mail não confirmado
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700">Dados Pessoais</p>
                              <p><strong>Idade:</strong> {idade} anos</p>
                              <p><strong>Sexo:</strong> {sexo === 'masculino' ? 'Masculino' : sexo === 'feminino' ? 'Feminino' : 'Outro'}</p>
                              <p><strong>CPF:</strong> {candidato.cpf}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Localização</p>
                              <p><strong>Bairro:</strong> {candidato.endereco.bairro}</p>
                              <p><strong>Cidade:</strong> {candidato.endereco.cidade}</p>
                              <p className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {candidato.telefone}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Formação</p>
                              <p><strong>Escolaridade:</strong> {
                                candidato.escolaridade === 'fundamental' ? 'Fundamental' :
                                candidato.escolaridade === 'medio' ? 'Médio' :
                                candidato.escolaridade === 'tecnico' ? 'Técnico' :
                                candidato.escolaridade === 'superior' ? 'Superior' :
                                candidato.escolaridade === 'pos-graduacao' ? 'Pós-Graduação' :
                                candidato.escolaridade
                              }</p>
                              <p className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {candidato.email}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Experiência</p>
                              {candidato.experiencias.length > 0 ? (
                                <div>
                                  <p><strong>Último cargo:</strong> {candidato.experiencias[0].cargo}</p>
                                  <p><strong>Empresa:</strong> {candidato.experiencias[0].empresa}</p>
                                </div>
                              ) : (
                                <p className="text-gray-500">Sem experiência cadastrada</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Áreas de Interesse:</p>
                            <div className="flex flex-wrap gap-1">
                              {candidato.areasInteresse.map((area, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            Cadastrado em: {new Date(candidato.dataCadastro).toLocaleString('pt-BR')}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCandidatoSelecionado(candidato)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Perfil
                          </Button>
                          
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => baixarCurriculo(candidato)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Currículo
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Candidato */}
      {candidatoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Perfil Completo do Candidato</CardTitle>
                  <Button variant="outline" onClick={() => setCandidatoSelecionado(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Dados Pessoais</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nome:</strong> {candidatoSelecionado.nome}</p>
                      <p><strong>CPF:</strong> {candidatoSelecionado.cpf}</p>
                      <p><strong>Data de Nascimento:</strong> {new Date(candidatoSelecionado.dataNascimento).toLocaleDateString('pt-BR')}</p>
                      <p><strong>Idade:</strong> {calcularIdade(candidatoSelecionado.dataNascimento)} anos</p>
                      <p><strong>Sexo:</strong> {
                        obterSexoPorNome(candidatoSelecionado.nome) === 'masculino' ? 'Masculino' :
                        obterSexoPorNome(candidatoSelecionado.nome) === 'feminino' ? 'Feminino' : 'Outro'
                      }</p>
                      <p><strong>E-mail:</strong> {candidatoSelecionado.email}</p>
                      <p><strong>Telefone:</strong> {candidatoSelecionado.telefone}</p>
                      <p><strong>Escolaridade:</strong> {
                        candidatoSelecionado.escolaridade === 'fundamental' ? 'Ensino Fundamental' :
                        candidatoSelecionado.escolaridade === 'medio' ? 'Ensino Médio' :
                        candidatoSelecionado.escolaridade === 'tecnico' ? 'Ensino Técnico' :
                        candidatoSelecionado.escolaridade === 'superior' ? 'Ensino Superior' :
                        candidatoSelecionado.escolaridade === 'pos-graduacao' ? 'Pós-Graduação' :
                        candidatoSelecionado.escolaridade
                      }</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Endereço</h4>
                    <div className="space-y-2 text-sm">
                      <p>{candidatoSelecionado.endereco.rua}, {candidatoSelecionado.endereco.numero}</p>
                      <p><strong>Bairro:</strong> {candidatoSelecionado.endereco.bairro}</p>
                      <p><strong>Cidade:</strong> {candidatoSelecionado.endereco.cidade}</p>
                      <p><strong>CEP:</strong> {candidatoSelecionado.endereco.cep}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Áreas de Interesse</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidatoSelecionado.areasInteresse.map((area, index) => (
                      <Badge key={index} className="bg-blue-600">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Experiências Profissionais</h4>
                  {candidatoSelecionado.experiencias.length > 0 ? (
                    <div className="space-y-4">
                      {candidatoSelecionado.experiencias.map((exp, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{exp.cargo}</h5>
                            <Badge variant={exp.ativo ? 'default' : 'secondary'}>
                              {exp.ativo ? 'Atual' : 'Anterior'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1"><strong>Empresa:</strong> {exp.empresa}</p>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Período:</strong> {new Date(exp.dataInicio).toLocaleDateString('pt-BR')} - {
                              exp.dataFim ? new Date(exp.dataFim).toLocaleDateString('pt-BR') : 'Atual'
                            }
                          </p>
                          {exp.descricao && (
                            <p className="text-sm"><strong>Descrição:</strong> {exp.descricao}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhuma experiência profissional cadastrada</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Status da Conta</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Status:</strong> 
                      <Badge className="ml-2" variant={candidatoSelecionado.status === 'ativo' ? 'default' : 'secondary'}>
                        {candidatoSelecionado.status === 'ativo' ? 'Ativo' : 'Pendente'}
                      </Badge>
                    </p>
                    <p><strong>E-mail Confirmado:</strong> 
                      <Badge className="ml-2" variant={candidatoSelecionado.emailConfirmado ? 'default' : 'destructive'}>
                        {candidatoSelecionado.emailConfirmado ? 'Sim' : 'Não'}
                      </Badge>
                    </p>
                    <p><strong>Data de Cadastro:</strong> {new Date(candidatoSelecionado.dataCadastro).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4 border-t">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => baixarCurriculo(candidatoSelecionado)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Currículo
                  </Button>
                  
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar E-mail
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para Gerenciar Notícias
export function GerenciarNoticias() {
  const [noticias, setNoticias] = useState<NoticiaData[]>([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: '',
    status: ''
  })
  const [categorias, setCategorias] = useState<string[]>([])
  const [noticiaEditando, setNoticiaEditando] = useState<NoticiaData | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  useEffect(() => {
    aplicarFiltros()
  }, [filtros])

  const carregarDados = () => {
    setLoading(true)
    try {
      const resultado = obterNoticias()
      setNoticias(resultado.noticias)
      
      const cats = obterCategorias()
      setCategorias(cats)
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
    } finally {
      setLoading(false)
    }
  }

  const aplicarFiltros = () => {
    const resultado = obterNoticias({
      busca: filtros.busca || undefined,
      categoria: filtros.categoria || undefined,
      status: filtros.status || undefined
    })
    setNoticias(resultado.noticias)
  }

  const handleSalvarNoticia = async (dados: any) => {
    setProcessando(true)
    try {
      let resultado
      
      if (noticiaEditando) {
        resultado = await atualizarNoticia(noticiaEditando.id!, dados)
      } else {
        resultado = await criarNoticia({
          ...dados,
          autor: 'Administrador SETEMP',
          dataPublicacao: dados.status === 'publicada' ? new Date().toISOString() : dados.dataPublicacao
        })
      }

      if (resultado.sucesso) {
        alert(`✅ ${resultado.mensagem}`)
        setMostrarFormulario(false)
        setNoticiaEditando(null)
        carregarDados()
      } else {
        alert(`❌ ${resultado.mensagem}`)
      }
    } catch (error) {
      console.error('Erro ao salvar notícia:', error)
      alert('Erro interno do sistema')
    } finally {
      setProcessando(false)
    }
  }

  const handleExcluirNoticia = async (noticiaId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return

    setProcessando(true)
    try {
      const resultado = await excluirNoticia(noticiaId)
      
      if (resultado.sucesso) {
        alert(`✅ ${resultado.mensagem}`)
        carregarDados()
      } else {
        alert(`❌ ${resultado.mensagem}`)
      }
    } catch (error) {
      console.error('Erro ao excluir notícia:', error)
      alert('Erro interno do sistema')
    } finally {
      setProcessando(false)
    }
  }

  const limparFiltros = () => {
    setFiltros({
      busca: '',
      categoria: '',
      status: ''
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Gerenciar Notícias ({noticias.length})
              </CardTitle>
              <CardDescription>
                Criar, editar e gerenciar notícias do sistema
              </CardDescription>
            </div>
            <Button 
              onClick={() => {
                setNoticiaEditando(null)
                setMostrarFormulario(true)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Notícia
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Buscar notícias..."
                value={filtros.busca}
                onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
                className="pl-10"
              />
            </div>
            
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={filtros.categoria}
              onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
            >
              <option value="">Todas as categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
            
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={filtros.status}
              onChange={(e) => setFiltros({...filtros, status: e.target.value})}
            >
              <option value="">Todos os status</option>
              <option value="rascunho">Rascunho</option>
              <option value="publicada">Publicada</option>
              <option value="arquivada">Arquivada</option>
            </select>
            
            {(filtros.busca || filtros.categoria || filtros.status) && (
              <Button variant="ghost" onClick={limparFiltros} className="text-red-600">
                <X className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Notícias */}
      <div className="space-y-4">
        {noticias.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma notícia encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                {filtros.busca || filtros.categoria || filtros.status 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece criando sua primeira notícia'
                }
              </p>
              <Button 
                onClick={() => {
                  setNoticiaEditando(null)
                  setMostrarFormulario(true)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Notícia
              </Button>
            </CardContent>
          </Card>
        ) : (
          noticias.map((noticia) => (
            <Card key={noticia.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold text-lg">{noticia.titulo}</h3>
                      <Badge 
                        variant={
                          noticia.status === 'publicada' ? 'default' :
                          noticia.status === 'rascunho' ? 'secondary' : 'outline'
                        }
                        className={
                          noticia.status === 'publicada' ? 'bg-green-600' :
                          noticia.status === 'rascunho' ? 'bg-yellow-600' : 'bg-gray-600'
                        }
                      >
                        {noticia.status === 'publicada' ? 'Publicada' :
                         noticia.status === 'rascunho' ? 'Rascunho' : 'Arquivada'}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {noticia.categoria}
                      </Badge>
                    </div>
                    
                    {noticia.subtitulo && (
                      <p className="text-gray-600 mb-2">{noticia.subtitulo}</p>
                    )}
                    
                    <p className="text-gray-700 mb-4 line-clamp-2">{noticia.resumo}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {noticia.status === 'publicada' 
                          ? `Publicada em ${new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}`
                          : `Criada em ${new Date(noticia.dataCriacao).toLocaleDateString('pt-BR')}`
                        }
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {noticia.visualizacoes} visualizações
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {noticia.autor}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {noticia.status === 'publicada' && (
                      <Button size="sm" variant="outline">
                        <Globe className="w-4 h-4 mr-1" />
                        Ver Online
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setNoticiaEditando(noticia)
                        setMostrarFormulario(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleExcluirNoticia(noticia.id!)}
                      disabled={processando}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal do Formulário */}
      {mostrarFormulario && (
        <FormularioNoticia
          noticia={noticiaEditando}
          categorias={categorias}
          onSalvar={handleSalvarNoticia}
          onCancelar={() => {
            setMostrarFormulario(false)
            setNoticiaEditando(null)
          }}
          processando={processando}
        />
      )}
    </div>
  )
}

// Componente do Formulário de Notícia
interface FormularioNoticiaProps {
  noticia?: NoticiaData | null
  categorias: string[]
  onSalvar: (dados: any) => void
  onCancelar: () => void
  processando: boolean
}

function FormularioNoticia({ noticia, categorias, onSalvar, onCancelar, processando }: FormularioNoticiaProps) {
  const [dados, setDados] = useState({
    titulo: noticia?.titulo || '',
    subtitulo: noticia?.subtitulo || '',
    resumo: noticia?.resumo || '',
    conteudo: noticia?.conteudo || '',
    categoria: noticia?.categoria || '',
    imagemDestaque: noticia?.imagemDestaque || '',
    status: noticia?.status || 'rascunho',
    dataPublicacao: noticia?.dataPublicacao || new Date().toISOString()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!dados.titulo.trim()) {
      alert('Título é obrigatório')
      return
    }
    
    if (!dados.conteudo.trim()) {
      alert('Conteúdo é obrigatório')
      return
    }
    
    if (!dados.categoria.trim()) {
      alert('Categoria é obrigatória')
      return
    }

    onSalvar(dados)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {noticia ? 'Editar Notícia' : 'Nova Notícia'}
              </CardTitle>
              <Button variant="outline" onClick={onCancelar}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Título *
                </label>
                <Input
                  value={dados.titulo}
                  onChange={(e) => setDados({...dados, titulo: e.target.value})}
                  placeholder="Digite o título da notícia..."
                  className="text-lg"
                />
              </div>

              {/* Subtítulo */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Subtítulo
                </label>
                <Input
                  value={dados.subtitulo}
                  onChange={(e) => setDados({...dados, subtitulo: e.target.value})}
                  placeholder="Subtítulo opcional..."
                />
              </div>

              {/* Categoria e Status */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Categoria *
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={dados.categoria}
                    onChange={(e) => setDados({...dados, categoria: e.target.value})}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                    <option value="nova">+ Nova categoria</option>
                  </select>
                  {dados.categoria === 'nova' && (
                    <Input
                      className="mt-2"
                      placeholder="Nome da nova categoria"
                      onChange={(e) => setDados({...dados, categoria: e.target.value})}
                    />
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Status
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={dados.status}
                    onChange={(e) => setDados({...dados, status: e.target.value})}
                  >
                    <option value="rascunho">Rascunho</option>
                    <option value="publicada">Publicada</option>
                    <option value="arquivada">Arquivada</option>
                  </select>
                </div>
              </div>

              {/* Imagem de destaque */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  URL da Imagem de Destaque
                </label>
                <Input
                  value={dados.imagemDestaque}
                  onChange={(e) => setDados({...dados, imagemDestaque: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {dados.imagemDestaque && (
                  <div className="mt-2">
                    <img 
                      src={dados.imagemDestaque} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Resumo */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Resumo *
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  value={dados.resumo}
                  onChange={(e) => setDados({...dados, resumo: e.target.value})}
                  placeholder="Breve resumo da notícia (será exibido nos cards)..."
                />
              </div>

              {/* Conteúdo */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Conteúdo *
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={12}
                  value={dados.conteudo}
                  onChange={(e) => setDados({...dados, conteudo: e.target.value})}
                  placeholder="Conteúdo completo da notícia (HTML é suportado)..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Você pode usar HTML básico: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
                </p>
              </div>

              {/* Data de publicação */}
              {dados.status === 'publicada' && (
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Data de Publicação
                  </label>
                  <Input
                    type="datetime-local"
                    value={dados.dataPublicacao.slice(0, 16)}
                    onChange={(e) => setDados({...dados, dataPublicacao: e.target.value + ':00.000Z'})}
                  />
                </div>
              )}

              {/* Botões */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={processando}
                >
                  {processando ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {noticia ? 'Atualizar' : 'Criar'} Notícia
                </Button>
                
                <Button type="button" variant="outline" onClick={onCancelar}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}