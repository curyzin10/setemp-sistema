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
  Search
} from 'lucide-react'
import { 
  obterEmpresasPendentes, 
  obterCandidatos, 
  obterEmpresas, 
  obterNotificacoesAdmin,
  obterEstatisticas,
  aprovarEmpresa,
  marcarNotificacaoComoLida,
  type EmpresaData,
  type CandidatoData,
  type NotificacaoAdmin
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
                <p className="text-sm font-medium text-gray-600">Taxa de Aprovação</p>
                <p className="text-2xl font-bold text-purple-600">
                  {estatisticas.totalEmpresas > 0 
                    ? Math.round((estatisticas.empresasAprovadas / estatisticas.totalEmpresas) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-gray-500">Empresas aprovadas</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
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

// Componente para Gerenciar Candidatos
export function GerenciarCandidatos() {
  const [candidatos, setCandidatos] = useState<CandidatoData[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    setLoading(true)
    try {
      const todosCandidatos = obterCandidatos()
      setCandidatos(todosCandidatos)
    } catch (error) {
      console.error('Erro ao carregar candidatos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const candidatosFiltrados = candidatos.filter(candidato => 
    candidato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    candidato.cpf.includes(filtro) ||
    candidato.email.toLowerCase().includes(filtro.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Candidatos Cadastrados ({candidatos.length})
        </CardTitle>
        <CardDescription>
          Gerenciar todos os candidatos do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtro */}
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Buscar por nome, CPF ou e-mail..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Lista de Candidatos */}
        <div className="space-y-4">
          {candidatosFiltrados.map((candidato) => (
            <div key={candidato.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{candidato.nome}</h4>
                    <Badge 
                      variant={
                        candidato.status === 'ativo' ? 'default' :
                        candidato.status === 'pendente' ? 'secondary' : 'destructive'
                      }
                      className={
                        candidato.status === 'ativo' ? 'bg-green-600' :
                        candidato.status === 'pendente' ? 'bg-yellow-600' : 'bg-red-600'
                      }
                    >
                      {candidato.status === 'ativo' ? 'Ativo' :
                       candidato.status === 'pendente' ? 'Pendente' : 'Inativo'}
                    </Badge>
                    {!candidato.emailConfirmado && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        E-mail não confirmado
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>CPF:</strong> {candidato.cpf}</p>
                      <p><strong>E-mail:</strong> {candidato.email}</p>
                    </div>
                    <div>
                      <p><strong>Telefone:</strong> {candidato.telefone}</p>
                      <p><strong>Cidade:</strong> {candidato.endereco.cidade}</p>
                    </div>
                    <div>
                      <p><strong>Escolaridade:</strong> {candidato.escolaridade}</p>
                      <p><strong>Cadastro:</strong> {new Date(candidato.dataCadastro).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm"><strong>Áreas de Interesse:</strong></p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidato.areaInteresse.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
          
          {candidatosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {filtro ? 'Nenhum candidato encontrado com os filtros aplicados' : 'Nenhum candidato cadastrado'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}