import { 
  enviarEmailConfirmacaoCandidato,
  enviarEmailAprovacaoEmpresa,
  enviarEmailRejeicaoEmpresa
} from './email-service'

export interface CandidatoData {
  id?: string
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  senha: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    cep: string
  }
  escolaridade: string
  areasInteresse: string[]
  experiencias: any[]
  curriculo?: File | null
  status: 'ativo' | 'inativo' | 'pendente'
  dataCadastro: string
  emailConfirmado: boolean
}

export interface EmpresaData {
  id?: string
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  areaAtuacao: string
  porte: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    cep: string
  }
  contato: {
    telefone: string
    email: string
    site?: string
  }
  responsavelRH: {
    nome: string
    cargo: string
    email: string
    telefone: string
  }
  senha: string
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'suspensa'
  dataCadastro: string
  dataAprovacao?: string
  motivoRejeicao?: string
}

export interface NotificacaoAdmin {
  id: string
  tipo: 'nova-empresa' | 'novo-candidato' | 'sistema'
  titulo: string
  mensagem: string
  data: string
  lida: boolean
  prioridade: 'baixa' | 'normal' | 'alta' | 'urgente'
  dados?: any
}

// Simulação de banco de dados em memória
let candidatos: CandidatoData[] = []
let empresas: EmpresaData[] = []
let notificacoesAdmin: NotificacaoAdmin[] = []

// Utilitários
function gerarId(): string {
  return Math.random().toString(36).substr(2, 9)
}

function gerarCodigoConfirmacao(): string {
  return Math.random().toString(36).substr(2, 20)
}

// Simulação de envio de email
async function enviarEmailSimples(para: string, assunto: string, conteudo: string): Promise<boolean> {
  console.log(`📧 Email enviado para ${para}:`)
  console.log(`Assunto: ${assunto}`)
  console.log(`Conteúdo: ${conteudo}`)
  
  // Simula delay de envio
  await new Promise(resolve => setTimeout(resolve, 1000))
  return true
}

// Funções para Candidatos
export async function cadastrarCandidato(dados: Omit<CandidatoData, 'id' | 'status' | 'dataCadastro' | 'emailConfirmado'>): Promise<{
  sucesso: boolean
  mensagem: string
  candidatoId?: string
}> {
  try {
    // Verificar se CPF já existe
    const cpfExiste = candidatos.some(c => c.cpf === dados.cpf)
    if (cpfExiste) {
      return {
        sucesso: false,
        mensagem: 'CPF já cadastrado no sistema'
      }
    }

    // Verificar se email já existe
    const emailExiste = candidatos.some(c => c.email === dados.email)
    if (emailExiste) {
      return {
        sucesso: false,
        mensagem: 'E-mail já cadastrado no sistema'
      }
    }

    const candidatoId = gerarId()
    const codigoConfirmacao = gerarCodigoConfirmacao()
    
    const novoCandidato: CandidatoData = {
      ...dados,
      id: candidatoId,
      status: 'pendente',
      dataCadastro: new Date().toISOString(),
      emailConfirmado: false
    }

    candidatos.push(novoCandidato)

    // Enviar email de confirmação
    await enviarEmailConfirmacaoCandidato(dados.email, dados.nome, candidatoId)

    // Notificar administradores
    const notificacao: NotificacaoAdmin = {
      id: gerarId(),
      tipo: 'novo-candidato',
      titulo: 'Novo candidato cadastrado',
      mensagem: `${dados.nome} se cadastrou no sistema`,
      data: new Date().toISOString(),
      lida: false,
      prioridade: 'normal',
      dados: { candidatoId, nome: dados.nome, email: dados.email }
    }
    notificacoesAdmin.push(notificacao)

    return {
      sucesso: true,
      mensagem: 'Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.',
      candidatoId
    }
  } catch (error) {
    console.error('Erro ao cadastrar candidato:', error)
    return {
      sucesso: false,
      mensagem: 'Erro interno do servidor. Tente novamente mais tarde.'
    }
  }
}

export async function confirmarEmailCandidato(candidatoId: string, codigo: string): Promise<{
  sucesso: boolean
  mensagem: string
}> {
  const candidato = candidatos.find(c => c.id === candidatoId)
  
  if (!candidato) {
    return {
      sucesso: false,
      mensagem: 'Candidato não encontrado'
    }
  }

  // Em produção, verificaria o código de confirmação
  candidato.emailConfirmado = true
  candidato.status = 'ativo'

  await enviarEmailSimples(
    candidato.email,
    'Conta ativada com sucesso - SETEMP',
    `Olá ${candidato.nome}!\\n\\nSua conta foi ativada com sucesso. Agora você pode acessar o sistema e se candidatar às vagas disponíveis.\\n\\nBom trabalho!\\nEquipe SETEMP`
  )

  return {
    sucesso: true,
    mensagem: 'E-mail confirmado com sucesso! Sua conta está ativa.'
  }
}

// Funções para Empresas
export async function cadastrarEmpresa(dados: Omit<EmpresaData, 'id' | 'status' | 'dataCadastro'>): Promise<{
  sucesso: boolean
  mensagem: string
  empresaId?: string
}> {
  try {
    // Verificar se CNPJ já existe
    const cnpjExiste = empresas.some(e => e.cnpj === dados.cnpj)
    if (cnpjExiste) {
      return {
        sucesso: false,
        mensagem: 'CNPJ já cadastrado no sistema'
      }
    }

    // Verificar se email já existe
    const emailExiste = empresas.some(e => e.contato.email === dados.contato.email)
    if (emailExiste) {
      return {
        sucesso: false,
        mensagem: 'E-mail já cadastrado no sistema'
      }
    }

    const empresaId = gerarId()
    
    const novaEmpresa: EmpresaData = {
      ...dados,
      id: empresaId,
      status: 'pendente',
      dataCadastro: new Date().toISOString()
    }

    empresas.push(novaEmpresa)

    // Enviar email de confirmação para a empresa
    await enviarEmailSimples(
      dados.contato.email,
      'Cadastro recebido - Aguardando aprovação - SETEMP',
      `Prezados,\\n\\nO cadastro da empresa ${dados.razaoSocial} foi recebido com sucesso.\\n\\nSeus dados estão sendo analisados pela nossa equipe. O processo de aprovação pode levar até 3 dias úteis.\\n\\nVocê receberá um e-mail assim que a análise for concluída.\\n\\nAtenciosamente,\\nEquipe SETEMP`
    )

    // Notificar administradores
    const notificacao: NotificacaoAdmin = {
      id: gerarId(),
      tipo: 'nova-empresa',
      titulo: 'Nova empresa aguardando aprovação',
      mensagem: `${dados.razaoSocial} solicitou cadastro no sistema`,
      data: new Date().toISOString(),
      lida: false,
      prioridade: 'alta',
      dados: { 
        empresaId, 
        razaoSocial: dados.razaoSocial, 
        cnpj: dados.cnpj,
        responsavel: dados.responsavelRH.nome,
        email: dados.contato.email
      }
    }
    notificacoesAdmin.push(notificacao)

    return {
      sucesso: true,
      mensagem: 'Cadastro realizado com sucesso! Sua empresa será analisada em até 3 dias úteis.',
      empresaId
    }
  } catch (error) {
    console.error('Erro ao cadastrar empresa:', error)
    return {
      sucesso: false,
      mensagem: 'Erro interno do servidor. Tente novamente mais tarde.'
    }
  }
}

export async function aprovarEmpresa(empresaId: string, aprovado: boolean, motivo?: string): Promise<{
  sucesso: boolean
  mensagem: string
}> {
  const empresa = empresas.find(e => e.id === empresaId)
  
  if (!empresa) {
    return {
      sucesso: false,
      mensagem: 'Empresa não encontrada'
    }
  }

  if (aprovado) {
    empresa.status = 'aprovada'
    empresa.dataAprovacao = new Date().toISOString()

    // Enviar email de aprovação
    await enviarEmailAprovacaoEmpresa(empresa.contato.email, empresa.razaoSocial)

    return {
      sucesso: true,
      mensagem: 'Empresa aprovada com sucesso!'
    }
  } else {
    empresa.status = 'rejeitada'
    empresa.motivoRejeicao = motivo

    // Enviar email de rejeição
    await enviarEmailRejeicaoEmpresa(empresa.contato.email, empresa.razaoSocial, motivo || 'Dados inconsistentes ou incompletos')

    return {
      sucesso: true,
      mensagem: 'Empresa rejeitada. E-mail de notificação enviado.'
    }
  }
}

// Funções para Administradores
export function obterEmpresasPendentes(): EmpresaData[] {
  return empresas.filter(e => e.status === 'pendente')
}

export function obterCandidatos(): CandidatoData[] {
  return candidatos
}

export function obterEmpresas(): EmpresaData[] {
  return empresas
}

export function obterNotificacoesAdmin(): NotificacaoAdmin[] {
  return notificacoesAdmin.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
}

export function marcarNotificacaoComoLida(notificacaoId: string): void {
  const notificacao = notificacoesAdmin.find(n => n.id === notificacaoId)
  if (notificacao) {
    notificacao.lida = true
  }
}

// Estatísticas do sistema
export function obterEstatisticas() {
  const candidatosAtivos = candidatos.filter(c => c.status === 'ativo').length
  const empresasAprovadas = empresas.filter(e => e.status === 'aprovada').length
  const empresasPendentes = empresas.filter(e => e.status === 'pendente').length
  const notificacoesNaoLidas = notificacoesAdmin.filter(n => !n.lida).length

  return {
    candidatosAtivos,
    candidatosPendentes: candidatos.filter(c => c.status === 'pendente').length,
    empresasAprovadas,
    empresasPendentes,
    empresasRejeitadas: empresas.filter(e => e.status === 'rejeitada').length,
    notificacoesNaoLidas,
    totalCandidatos: candidatos.length,
    totalEmpresas: empresas.length
  }
}

// Função para resetar dados (apenas para desenvolvimento)
export function resetarDados(): void {
  candidatos = []
  empresas = []
  notificacoesAdmin = []
  console.log('Dados resetados')
}

// Exportar dados atuais (para debug)
export function exportarDados() {
  return {
    candidatos,
    empresas,
    notificacoesAdmin,
    estatisticas: obterEstatisticas()
  }
}