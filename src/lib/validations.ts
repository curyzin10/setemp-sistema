// Validações para formulários do sistema SETEMP

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Validação de CPF
export function validarCPF(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/[^\d]/g, '')
  
  if (cpfLimpo.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false
  
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpfLimpo.charAt(9))) return false
  
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpfLimpo.charAt(10))) return false
  
  return true
}

// Validação de CNPJ
export function validarCNPJ(cnpj: string): boolean {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '')
  
  if (cnpjLimpo.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpjLimpo)) return false
  
  let tamanho = cnpjLimpo.length - 2
  let numeros = cnpjLimpo.substring(0, tamanho)
  let digitos = cnpjLimpo.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(0))) return false
  
  tamanho = tamanho + 1
  numeros = cnpjLimpo.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(1))) return false
  
  return true
}

// Validação de email
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Validação de telefone brasileiro
export function validarTelefone(telefone: string): boolean {
  const telefoneLimpo = telefone.replace(/[^\d]/g, '')
  return telefoneLimpo.length === 10 || telefoneLimpo.length === 11
}

// Validação de CEP
export function validarCEP(cep: string): boolean {
  const cepLimpo = cep.replace(/[^\d]/g, '')
  return cepLimpo.length === 8
}

// Validação de senha
export function validarSenha(senha: string): ValidationResult {
  const errors: string[] = []
  
  if (senha.length < 6) {
    errors.push('A senha deve ter pelo menos 6 caracteres')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validação de arquivo PDF
export function validarArquivoPDF(arquivo: File): ValidationResult {
  const errors: string[] = []
  
  if (arquivo.type !== 'application/pdf') {
    errors.push('O arquivo deve ser um PDF')
  }
  
  if (arquivo.size > 5 * 1024 * 1024) { // 5MB
    errors.push('O arquivo deve ter no máximo 5MB')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validação completa do formulário de candidato
export function validarFormularioCandidato(dados: any): ValidationResult {
  const errors: string[] = []
  
  // Dados pessoais
  if (!dados.nome?.trim()) errors.push('Nome é obrigatório')
  if (!dados.cpf || !validarCPF(dados.cpf)) errors.push('CPF inválido')
  if (!dados.dataNascimento) errors.push('Data de nascimento é obrigatória')
  if (!dados.telefone || !validarTelefone(dados.telefone)) errors.push('Telefone inválido')
  if (!dados.email || !validarEmail(dados.email)) errors.push('E-mail inválido')
  
  // Validação de senha
  if (dados.senha) {
    const senhaValidacao = validarSenha(dados.senha)
    if (!senhaValidacao.isValid) {
      errors.push(...senhaValidacao.errors)
    }
  }
  
  if (dados.senha !== dados.confirmarSenha) {
    errors.push('As senhas não coincidem')
  }
  
  // Endereço
  if (!dados.cep || !validarCEP(dados.cep)) errors.push('CEP inválido')
  if (!dados.cidade?.trim()) errors.push('Cidade é obrigatória')
  if (!dados.rua?.trim()) errors.push('Rua é obrigatória')
  if (!dados.numero?.trim()) errors.push('Número é obrigatório')
  if (!dados.bairro?.trim()) errors.push('Bairro é obrigatório')
  
  // Dados profissionais
  if (!dados.escolaridade) errors.push('Escolaridade é obrigatória')
  if (!dados.areasInteresse || dados.areasInteresse.length === 0) {
    errors.push('Selecione pelo menos uma área de interesse')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validação completa do formulário de empresa
export function validarFormularioEmpresa(dados: any): ValidationResult {
  const errors: string[] = []
  
  // Dados da empresa
  if (!dados.cnpj || !validarCNPJ(dados.cnpj)) errors.push('CNPJ inválido')
  if (!dados.razaoSocial?.trim()) errors.push('Razão social é obrigatória')
  if (!dados.areaAtuacao) errors.push('Área de atuação é obrigatória')
  if (!dados.porte) errors.push('Porte da empresa é obrigatório')
  
  // Endereço
  if (!dados.cep || !validarCEP(dados.cep)) errors.push('CEP inválido')
  if (!dados.cidade?.trim()) errors.push('Cidade é obrigatória')
  if (!dados.rua?.trim()) errors.push('Rua é obrigatória')
  if (!dados.numero?.trim()) errors.push('Número é obrigatório')
  if (!dados.bairro?.trim()) errors.push('Bairro é obrigatório')
  if (!dados.telefone || !validarTelefone(dados.telefone)) errors.push('Telefone inválido')
  if (!dados.email || !validarEmail(dados.email)) errors.push('E-mail inválido')
  
  // Responsável RH
  if (!dados.nomeResponsavel?.trim()) errors.push('Nome do responsável é obrigatório')
  if (!dados.cargoResponsavel?.trim()) errors.push('Cargo do responsável é obrigatório')
  if (!dados.emailResponsavel || !validarEmail(dados.emailResponsavel)) {
    errors.push('E-mail do responsável inválido')
  }
  if (!dados.telefoneResponsavel || !validarTelefone(dados.telefoneResponsavel)) {
    errors.push('Telefone do responsável inválido')
  }
  
  // Validação de senha
  if (dados.senha) {
    const senhaValidacao = validarSenha(dados.senha)
    if (!senhaValidacao.isValid) {
      errors.push(...senhaValidacao.errors)
    }
  }
  
  if (dados.senha !== dados.confirmarSenha) {
    errors.push('As senhas não coincidem')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Formatadores
export function formatarCPF(cpf: string): string {
  const cpfLimpo = cpf.replace(/[^\d]/g, '')
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatarCNPJ(cnpj: string): string {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '')
  return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export function formatarTelefone(telefone: string): string {
  const telefoneLimpo = telefone.replace(/[^\d]/g, '')
  if (telefoneLimpo.length === 11) {
    return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (telefoneLimpo.length === 10) {
    return telefoneLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return telefone
}

export function formatarCEP(cep: string): string {
  const cepLimpo = cep.replace(/[^\d]/g, '')
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2')
}