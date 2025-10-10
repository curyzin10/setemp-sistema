// Demonstração e testes do sistema SETEMP
// Execute este arquivo no console do navegador para testar as funcionalidades

import { 
  cadastrarCandidato, 
  cadastrarEmpresa, 
  aprovarEmpresa,
  obterEstatisticas,
  obterEmpresasPendentes,
  exportarDados,
  resetarDados
} from './backend-simulation'

// Dados de teste para candidato
const candidatoTeste = {
  nome: 'Maria Silva Santos',
  cpf: '123.456.789-00',
  dataNascimento: '1990-05-15',
  telefone: '(92) 99999-1234',
  email: 'maria.silva@email.com',
  senha: 'MinhaSenh@123',
  endereco: {
    rua: 'Rua das Flores',
    numero: '123',
    bairro: 'Adrianópolis',
    cidade: 'Manaus',
    cep: '69057-000'
  },
  escolaridade: 'superior',
  areasInteresse: ['Tecnologia da Informação', 'Administração'],
  experiencias: [
    {
      empresa: 'Tech Company',
      cargo: 'Desenvolvedora Junior',
      dataInicio: '2020-01-01',
      dataFim: '2023-12-31',
      descricao: 'Desenvolvimento de aplicações web com React e Node.js',
      ativo: false
    }
  ],
  curriculo: null
}

// Dados de teste para empresa
const empresaTeste = {
  cnpj: '12.345.678/0001-90',
  razaoSocial: 'Tech Solutions Amazonas Ltda',
  nomeFantasia: 'Tech Solutions AM',
  areaAtuacao: 'Tecnologia da Informação',
  porte: 'pequena',
  endereco: {
    rua: 'Av. Eduardo Ribeiro',
    numero: '1000',
    bairro: 'Centro',
    cidade: 'Manaus',
    cep: '69010-001'
  },
  contato: {
    telefone: '(92) 3234-5678',
    email: 'contato@techsolutions.com.br',
    site: 'www.techsolutions.com.br'
  },
  responsavelRH: {
    nome: 'João Santos Silva',
    cargo: 'Gerente de RH',
    email: 'rh@techsolutions.com.br',
    telefone: '(92) 99999-5678'
  },
  senha: 'EmpresaSenh@123'
}

// Função para demonstrar cadastro de candidato
export async function demonstrarCadastroCandidato() {
  console.log('🧪 TESTE: Cadastro de Candidato')
  console.log('================================')
  
  try {
    const resultado = await cadastrarCandidato(candidatoTeste)
    
    if (resultado.sucesso) {
      console.log('✅ Candidato cadastrado com sucesso!')
      console.log(`ID: ${resultado.candidatoId}`)
      console.log(`Mensagem: ${resultado.mensagem}`)
    } else {
      console.log('❌ Erro no cadastro:')
      console.log(resultado.mensagem)
    }
  } catch (error) {
    console.error('💥 Erro inesperado:', error)
  }
  
  console.log('\n')
}

// Função para demonstrar cadastro de empresa
export async function demonstrarCadastroEmpresa() {
  console.log('🧪 TESTE: Cadastro de Empresa')
  console.log('==============================')
  
  try {
    const resultado = await cadastrarEmpresa(empresaTeste)
    
    if (resultado.sucesso) {
      console.log('✅ Empresa cadastrada com sucesso!')
      console.log(`ID: ${resultado.empresaId}`)
      console.log(`Mensagem: ${resultado.mensagem}`)
      return resultado.empresaId
    } else {
      console.log('❌ Erro no cadastro:')
      console.log(resultado.mensagem)
      return null
    }
  } catch (error) {
    console.error('💥 Erro inesperado:', error)
    return null
  }
}

// Função para demonstrar aprovação de empresa
export async function demonstrarAprovacaoEmpresa(empresaId: string) {
  console.log('🧪 TESTE: Aprovação de Empresa')
  console.log('===============================')
  
  try {
    const resultado = await aprovarEmpresa(empresaId, true)
    
    if (resultado.sucesso) {
      console.log('✅ Empresa aprovada com sucesso!')
      console.log(`Mensagem: ${resultado.mensagem}`)
    } else {
      console.log('❌ Erro na aprovação:')
      console.log(resultado.mensagem)
    }
  } catch (error) {
    console.error('💥 Erro inesperado:', error)
  }
  
  console.log('\n')
}

// Função para demonstrar rejeição de empresa
export async function demonstrarRejeicaoEmpresa(empresaId: string) {
  console.log('🧪 TESTE: Rejeição de Empresa')
  console.log('==============================')
  
  try {
    const resultado = await aprovarEmpresa(empresaId, false, 'Documentação incompleta')
    
    if (resultado.sucesso) {
      console.log('✅ Empresa rejeitada!')
      console.log(`Mensagem: ${resultado.mensagem}`)
    } else {
      console.log('❌ Erro na rejeição:')
      console.log(resultado.mensagem)
    }
  } catch (error) {
    console.error('💥 Erro inesperado:', error)
  }
  
  console.log('\n')
}

// Função para mostrar estatísticas
export function mostrarEstatisticas() {
  console.log('📊 ESTATÍSTICAS DO SISTEMA')
  console.log('===========================')
  
  const stats = obterEstatisticas()
  console.table(stats)
  
  console.log('\n')
}

// Função para mostrar empresas pendentes
export function mostrarEmpresasPendentes() {
  console.log('⏳ EMPRESAS PENDENTES')
  console.log('=====================')
  
  const pendentes = obterEmpresasPendentes()
  
  if (pendentes.length === 0) {
    console.log('Nenhuma empresa pendente de aprovação.')
  } else {
    pendentes.forEach((empresa, index) => {
      console.log(`${index + 1}. ${empresa.razaoSocial}`)
      console.log(`   CNPJ: ${empresa.cnpj}`)
      console.log(`   E-mail: ${empresa.contato.email}`)
      console.log(`   Data: ${new Date(empresa.dataCadastro).toLocaleString('pt-BR')}`)
      console.log('')
    })
  }
  
  console.log('\n')
}

// Função para executar todos os testes
export async function executarTodosOsTestes() {
  console.log('🚀 EXECUTANDO TODOS OS TESTES DO SISTEMA SETEMP')
  console.log('================================================')
  console.log('')
  
  // Resetar dados para teste limpo
  resetarDados()
  
  // Teste 1: Cadastro de candidato
  await demonstrarCadastroCandidato()
  
  // Teste 2: Cadastro de empresa
  const empresaId = await demonstrarCadastroEmpresa()
  
  // Mostrar estatísticas após cadastros
  mostrarEstatisticas()
  
  // Mostrar empresas pendentes
  mostrarEmpresasPendentes()
  
  // Teste 3: Aprovação de empresa (se cadastrou com sucesso)
  if (empresaId) {
    await demonstrarAprovacaoEmpresa(empresaId)
    mostrarEstatisticas()
  }
  
  // Teste 4: Cadastrar outra empresa para testar rejeição
  const empresaTeste2 = {
    ...empresaTeste,
    cnpj: '98.765.432/0001-10',
    razaoSocial: 'Empresa Teste Rejeição Ltda',
    contato: {
      ...empresaTeste.contato,
      email: 'teste@rejeicao.com.br'
    }
  }
  
  console.log('🧪 TESTE: Segunda Empresa (para rejeição)')
  console.log('==========================================')
  
  const resultado2 = await cadastrarEmpresa(empresaTeste2)
  if (resultado2.sucesso && resultado2.empresaId) {
    await demonstrarRejeicaoEmpresa(resultado2.empresaId)
  }
  
  // Estatísticas finais
  console.log('📈 ESTATÍSTICAS FINAIS')
  console.log('======================')
  mostrarEstatisticas()
  
  // Exportar todos os dados
  console.log('💾 DADOS COMPLETOS DO SISTEMA')
  console.log('==============================')
  const dadosCompletos = exportarDados()
  console.log(JSON.stringify(dadosCompletos, null, 2))
  
  console.log('✅ TODOS OS TESTES CONCLUÍDOS!')
}

// Função para testar validações
export function testarValidacoes() {
  console.log('🧪 TESTE: Validações')
  console.log('====================')
  
  // Teste com dados inválidos
  const candidatoInvalido = {
    ...candidatoTeste,
    cpf: '123.456.789-99', // CPF inválido
    email: 'email-invalido', // Email inválido
    senha: '123' // Senha muito fraca
  }
  
  console.log('Testando candidato com dados inválidos...')
  cadastrarCandidato(candidatoInvalido).then(resultado => {
    if (!resultado.sucesso) {
      console.log('✅ Validação funcionando - erros detectados:')
      console.log(resultado.mensagem)
    } else {
      console.log('❌ Validação falhou - dados inválidos foram aceitos')
    }
  })
}

// Instruções para uso
console.log(`
🎯 SISTEMA DE TESTES SETEMP
===========================

Para testar o sistema, execute no console:

1. Teste completo:
   executarTodosOsTestes()

2. Testes individuais:
   demonstrarCadastroCandidato()
   demonstrarCadastroEmpresa()
   mostrarEstatisticas()
   mostrarEmpresasPendentes()

3. Teste de validações:
   testarValidacoes()

4. Limpar dados:
   resetarDados()

5. Ver dados atuais:
   exportarDados()
`)

export default {
  demonstrarCadastroCandidato,
  demonstrarCadastroEmpresa,
  demonstrarAprovacaoEmpresa,
  demonstrarRejeicaoEmpresa,
  mostrarEstatisticas,
  mostrarEmpresasPendentes,
  executarTodosOsTestes,
  testarValidacoes
}