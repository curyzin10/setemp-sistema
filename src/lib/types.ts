// Tipos completos para o sistema SETEMP

export interface Candidato {
  id: string
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    cep: string
    estado: string
  }
  escolaridade: 'fundamental' | 'medio' | 'tecnico' | 'superior' | 'pos-graduacao'
  experienciaProfissional: ExperienciaProfissional[]
  areaInteresse: string[]
  curriculoUrl?: string
  status: 'ativo' | 'inativo' | 'suspenso'
  dataCadastro: string
  ultimoLogin?: string
  observacoes?: string
}

export interface ExperienciaProfissional {
  id: string
  empresa: string
  cargo: string
  dataInicio: string
  dataFim?: string
  descricao: string
  ativo: boolean
  salario?: number
  motivoSaida?: string
}

export interface Empresa {
  id: string
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  areaAtuacao: string
  porte: 'micro' | 'pequena' | 'media' | 'grande'
  responsavelRH: {
    nome: string
    email: string
    telefone: string
    cargo: string
  }
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    cep: string
    estado: string
  }
  contato: {
    telefone: string
    email: string
    site?: string
  }
  status: 'pendente' | 'aprovada' | 'suspensa' | 'rejeitada'
  dataCadastro: string
  dataAprovacao?: string
  motivoRejeicao?: string
  observacoes?: string
}

export interface Vaga {
  id: string
  empresaId: string
  codigo?: string // Código interno da empresa
  cargo: string
  descricao: string
  requisitos: string[]
  requisitosDesejados?: string[]
  salario: {
    minimo: number
    maximo: number
    moeda: 'BRL'
    negociavel: boolean
  }
  beneficios: string[]
  cidade: string
  bairro?: string
  tipoContrato: 'clt' | 'pj' | 'estagio' | 'temporario' | 'freelancer' | 'cooperado'
  cargaHoraria: string
  horarioTrabalho?: string
  modalidade: 'presencial' | 'remoto' | 'hibrido'
  nivelExperiencia: 'junior' | 'pleno' | 'senior' | 'estagiario' | 'trainee'
  escolaridadeMinima: 'fundamental' | 'medio' | 'tecnico' | 'superior' | 'pos-graduacao'
  status: 'ativa' | 'pausada' | 'encerrada' | 'preenchida' | 'cancelada'
  dataPublicacao: string
  dataEncerramento?: string
  dataLimiteInscricao?: string
  numeroVagas: number
  vagasPreenchidas: number
  prioridade: 'baixa' | 'normal' | 'alta' | 'urgente'
  publicarSINE: boolean
  observacoes?: string
}

export interface Candidatura {
  id: string
  candidatoId: string
  vagaId: string
  dataCandidatura: string
  status: 'em-analise' | 'pre-selecionado' | 'entrevista-agendada' | 'entrevista-realizada' | 'aprovado' | 'rejeitado' | 'contratado' | 'desistiu'
  etapaAtual: string
  observacoes?: string
  dataAtualizacao: string
  feedbackEmpresa?: string
  feedbackCandidato?: string
  salarioProposto?: number
  dataEntrevista?: string
  localEntrevista?: string
  contratado?: {
    dataContratacao: string
    salarioContratacao: number
    observacoes?: string
  }
}

export interface Usuario {
  id: string
  email: string
  senha: string
  tipo: 'candidato' | 'empresa' | 'admin'
  perfil: Candidato | Empresa | AdminProfile
  ativo: boolean
  dataCadastro: string
  ultimoLogin?: string
  tentativasLogin: number
  bloqueadoAte?: string
  configuracoes: {
    receberNotificacoes: boolean
    receberEmailMarketing: boolean
    perfilPublico: boolean
  }
}

export interface AdminProfile {
  id: string
  nome: string
  email: string
  telefone?: string
  nivel: 'administrador' | 'gestor' | 'operador' | 'analista'
  permissoes: string[]
  setor: string
  supervisor?: string
  observacoes?: string
}

export interface Notificacao {
  id: string
  usuarioId: string
  tipo: 'nova-vaga' | 'candidatura-atualizada' | 'empresa-aprovada' | 'sistema' | 'lembrete' | 'promocional'
  titulo: string
  mensagem: string
  lida: boolean
  dataEnvio: string
  dataLeitura?: string
  prioridade: 'baixa' | 'normal' | 'alta'
  link?: string
  metadata?: Record<string, any>
}

export interface Relatorio {
  id: string
  nome: string
  tipo: 'candidatos' | 'empresas' | 'vagas' | 'candidaturas' | 'geral' | 'sine' | 'financeiro'
  parametros: Record<string, any>
  filtros: {
    dataInicio?: string
    dataFim?: string
    cidade?: string
    areaAtuacao?: string
    status?: string
  }
  dadosGerados: any
  formato: 'pdf' | 'excel' | 'csv' | 'json'
  dataGeracao: string
  geradoPor: string
  tamanhoArquivo?: number
  urlDownload?: string
  agendado?: {
    frequencia: 'diario' | 'semanal' | 'mensal'
    proximaExecucao: string
  }
}

export interface IntegracaoSINE {
  id: string
  tipoOperacao: 'importar-vagas' | 'exportar-candidatos' | 'sincronizar-completa' | 'atualizar-status'
  status: 'pendente' | 'processando' | 'concluida' | 'erro' | 'cancelada'
  dataInicio: string
  dataFim?: string
  registrosProcessados: number
  registrosComErro: number
  erros?: string[]
  configuracao: {
    endpoint: string
    chaveAPI?: string
    timeout: number
    tentativasMaximas: number
  }
  resultado?: {
    candidatosExportados?: number
    vagasImportadas?: number
    atualizacoesRealizadas?: number
  }
  observacoes?: string
}

export interface Programa {
  id: string
  nome: string
  descricao: string
  detalhes: string
  tipo: 'capacitacao' | 'empreendedorismo' | 'primeiro-emprego' | 'qualificacao'
  areas: string[]
  duracao: string
  modalidade: 'presencial' | 'ead' | 'hibrido'
  requisitos: string[]
  certificacao: string
  status: 'ativo' | 'inativo' | 'em-desenvolvimento'
  dataInicio?: string
  dataFim?: string
  vagas: number
  vagasOcupadas: number
  investimento?: number
  parceiros?: string[]
  coordenador: {
    nome: string
    email: string
    telefone: string
  }
}

export interface InscricaoPrograma {
  id: string
  candidatoId: string
  programaId: string
  dataInscricao: string
  status: 'inscrito' | 'aprovado' | 'rejeitado' | 'em-andamento' | 'concluido' | 'desistente'
  documentosEnviados: string[]
  observacoes?: string
  avaliacaoFinal?: {
    nota: number
    comentarios: string
    certificado: boolean
  }
}

// Tipos para filtros e buscas
export interface FiltroVagas {
  cargo?: string
  cidade?: string
  empresa?: string
  areaAtuacao?: string
  tipoContrato?: string
  modalidade?: string
  salarioMinimo?: number
  salarioMaximo?: number
  nivelExperiencia?: string
  escolaridade?: string
  dataPublicacao?: string
  status?: string
}

export interface FiltroCandidatos {
  nome?: string
  cidade?: string
  escolaridade?: string
  areaInteresse?: string
  experiencia?: string
  idade?: {
    minima: number
    maxima: number
  }
  status?: string
  dataCadastro?: string
}

export interface FiltroEmpresas {
  razaoSocial?: string
  nomeFantasia?: string
  cnpj?: string
  cidade?: string
  areaAtuacao?: string
  porte?: string
  status?: string
  dataCadastro?: string
}

// Tipos para estatísticas e dashboards
export interface EstatisticasGerais {
  totalCandidatos: number
  totalEmpresas: number
  totalVagasAbertas: number
  totalVagasPreenchidas: number
  candidaturasMes: number
  empresasAtivasMes: number
  taxaConversao: number
  tempoMedioPreenchimento: number
  satisfacaoMedia: number
}

export interface EstatisticasPorCidade {
  cidade: string
  candidatos: number
  empresas: number
  vagas: number
  candidaturas: number
  contratacoes: number
  taxaSucesso: number
}

export interface EstatisticasPorArea {
  area: string
  vagas: number
  candidatos: number
  candidaturas: number
  contratacoes: number
  percentualPreenchimento: number
  salarioMedio: number
}

export interface EstatisticasTempo {
  periodo: string
  candidatosNovos: number
  empresasNovas: number
  vagasPublicadas: number
  candidaturasRealizadas: number
  contratacoes: number
}

// Tipos para auditoria e logs
export interface LogAuditoria {
  id: string
  usuarioId: string
  acao: string
  entidade: string
  entidadeId: string
  dadosAnteriores?: any
  dadosNovos?: any
  ip: string
  userAgent: string
  dataHora: string
  observacoes?: string
}

// Tipos para configurações do sistema
export interface ConfiguracaoSistema {
  id: string
  chave: string
  valor: any
  tipo: 'string' | 'number' | 'boolean' | 'json'
  descricao: string
  categoria: 'geral' | 'email' | 'sine' | 'seguranca' | 'interface'
  editavel: boolean
  dataAtualizacao: string
  atualizadoPor: string
}

// Tipos para comunicação e mensagens
export interface Comunicado {
  id: string
  titulo: string
  conteudo: string
  tipo: 'informativo' | 'urgente' | 'manutencao' | 'novidade'
  destinatarios: 'todos' | 'candidatos' | 'empresas' | 'admins'
  status: 'rascunho' | 'agendado' | 'enviado' | 'cancelado'
  dataEnvio?: string
  dataExpiracao?: string
  criadoPor: string
  dataCriacao: string
  estatisticas?: {
    enviados: number
    visualizados: number
    cliques: number
  }
}

// Tipos para feedback e avaliações
export interface Feedback {
  id: string
  tipo: 'candidato-empresa' | 'empresa-candidato' | 'sistema'
  remetenteId: string
  destinatarioId?: string
  candidaturaId?: string
  nota: number
  comentarios: string
  aspectos: {
    comunicacao?: number
    pontualidade?: number
    profissionalismo?: number
    conhecimentoTecnico?: number
  }
  dataEnvio: string
  publico: boolean
}

export interface AvaliacaoSistema {
  id: string
  usuarioId: string
  tipoUsuario: 'candidato' | 'empresa'
  nota: number
  aspectos: {
    facilidadeUso: number
    qualidadeVagas: number
    suporte: number
    funcionalidades: number
  }
  comentarios: string
  sugestoes?: string
  dataAvaliacao: string
}

// Tipos para importação/exportação
export interface ImportacaoArquivo {
  id: string
  nomeArquivo: string
  tipoArquivo: 'csv' | 'xlsx' | 'xml' | 'json'
  tipoImportacao: 'candidatos' | 'empresas' | 'vagas' | 'sine'
  status: 'processando' | 'concluida' | 'erro'
  registrosTotal: number
  registrosProcessados: number
  registrosComErro: number
  erros?: Array<{
    linha: number
    campo: string
    erro: string
  }>
  dataUpload: string
  processadoPor: string
}

// Tipos para API e integrações externas
export interface IntegracaoExterna {
  id: string
  nome: string
  tipo: 'sine' | 'linkedin' | 'indeed' | 'catho' | 'infojobs'
  configuracao: {
    url: string
    chaveAPI?: string
    usuario?: string
    senha?: string
    parametros?: Record<string, any>
  }
  status: 'ativa' | 'inativa' | 'erro'
  ultimaSincronizacao?: string
  proximaSincronizacao?: string
  frequenciaSincronizacao: 'manual' | 'diaria' | 'semanal' | 'mensal'
  estatisticas: {
    totalSincronizacoes: number
    sucessos: number
    erros: number
    ultimoErro?: string
  }
}

// Tipos para mobile e PWA
export interface DispositivoMobile {
  id: string
  usuarioId: string
  token: string
  plataforma: 'android' | 'ios' | 'web'
  versaoApp: string
  ultimoAcesso: string
  notificacoesPush: boolean
  configuracoes: {
    receberVagas: boolean
    receberCandidaturas: boolean
    receberSistema: boolean
  }
}

export default {
  Candidato,
  Empresa,
  Vaga,
  Candidatura,
  Usuario,
  AdminProfile,
  Notificacao,
  Relatorio,
  IntegracaoSINE,
  Programa,
  InscricaoPrograma
}