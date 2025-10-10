// Exemplo de uso da busca avançada de candidatos
// Este arquivo demonstra como usar os filtros implementados

import { obterCandidatos } from './backend-simulation'

// Exemplo 1: Buscar candidatos com experiência em enfermagem
export function exemploEnfermagem() {
  console.log('🔍 EXEMPLO: Buscar candidatos com experiência em enfermagem')
  console.log('==========================================================')
  
  const candidatos = obterCandidatos()
  
  const candidatosEnfermagem = candidatos.filter(candidato =>
    candidato.areasInteresse.some(area => 
      area.toLowerCase().includes('enfermagem')
    ) ||
    candidato.experiencias.some(exp => 
      exp.cargo.toLowerCase().includes('enfermagem') ||
      exp.empresa.toLowerCase().includes('hospital') ||
      (exp.descricao && exp.descricao.toLowerCase().includes('enfermagem'))
    )
  )
  
  console.log(`Encontrados ${candidatosEnfermagem.length} candidatos:`)
  candidatosEnfermagem.forEach(candidato => {
    console.log(`- ${candidato.nome} (${candidato.endereco.bairro})`)
  })
  
  return candidatosEnfermagem
}

// Exemplo 2: Buscar candidatos masculinos até 30 anos no bairro Compensa
export function exemploFiltroCompleto() {
  console.log('🔍 EXEMPLO: Candidatos masculinos até 30 anos no bairro Compensa')
  console.log('================================================================')
  
  const candidatos = obterCandidatos()
  
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
    const nomesPrimeiros = nome.split(' ')[0].toLowerCase()
    const nomesMasculinos = ['joão', 'carlos', 'josé', 'antonio', 'francisco', 'paulo', 'pedro', 'luis', 'marcos', 'rafael', 'anderson', 'ricardo', 'roberto']
    
    if (nomesMasculinos.some(n => nomesPrimeiros.includes(n))) return 'masculino'
    return 'outro'
  }
  
  const candidatosFiltrados = candidatos.filter(candidato => {
    const idade = calcularIdade(candidato.dataNascimento)
    const sexo = obterSexoPorNome(candidato.nome)
    const bairro = candidato.endereco.bairro.toLowerCase()
    
    return sexo === 'masculino' && 
           idade <= 30 && 
           bairro.includes('compensa')
  })
  
  console.log(`Encontrados ${candidatosFiltrados.length} candidatos:`)
  candidatosFiltrados.forEach(candidato => {
    const idade = calcularIdade(candidato.dataNascimento)
    console.log(`- ${candidato.nome}, ${idade} anos, ${candidato.endereco.bairro}`)
    console.log(`  Experiência: ${candidato.areasInteresse.join(', ')}`)
  })
  
  return candidatosFiltrados
}

// Exemplo 3: Buscar por escolaridade técnica
export function exemploEscolaridadeTecnica() {
  console.log('🔍 EXEMPLO: Candidatos com escolaridade técnica')
  console.log('===============================================')
  
  const candidatos = obterCandidatos()
  
  const candidatosTecnicos = candidatos.filter(candidato =>
    candidato.escolaridade === 'tecnico'
  )
  
  console.log(`Encontrados ${candidatosTecnicos.length} candidatos:`)
  candidatosTecnicos.forEach(candidato => {
    console.log(`- ${candidato.nome}`)
    console.log(`  Áreas: ${candidato.areasInteresse.join(', ')}`)
    if (candidato.experiencias.length > 0) {
      console.log(`  Último cargo: ${candidato.experiencias[0].cargo}`)
    }
  })
  
  return candidatosTecnicos
}

// Exemplo 4: Busca por bairro específico
export function exemploBairroEspecifico(bairro: string) {
  console.log(`🔍 EXEMPLO: Candidatos do bairro ${bairro}`)
  console.log('===========================================')
  
  const candidatos = obterCandidatos()
  
  const candidatosBairro = candidatos.filter(candidato =>
    candidato.endereco.bairro.toLowerCase().includes(bairro.toLowerCase())
  )
  
  console.log(`Encontrados ${candidatosBairro.length} candidatos:`)
  candidatosBairro.forEach(candidato => {
    console.log(`- ${candidato.nome} (${candidato.endereco.bairro})`)
    console.log(`  Escolaridade: ${candidato.escolaridade}`)
    console.log(`  Áreas: ${candidato.areasInteresse.join(', ')}`)
  })
  
  return candidatosBairro
}

// Exemplo 5: Busca combinada - Administração + Superior + Adrianópolis
export function exemploAdministracao() {
  console.log('🔍 EXEMPLO: Candidatos de Administração com ensino superior em Adrianópolis')
  console.log('===========================================================================')
  
  const candidatos = obterCandidatos()
  
  const candidatosAdmin = candidatos.filter(candidato => {
    const temAdministracao = candidato.areasInteresse.some(area => 
      area.toLowerCase().includes('administração')
    ) || candidato.experiencias.some(exp => 
      exp.cargo.toLowerCase().includes('administr')
    )
    
    const ensinoSuperior = candidato.escolaridade === 'superior'
    const bairroAdrianopolis = candidato.endereco.bairro.toLowerCase().includes('adrianópolis')
    
    return temAdministracao && ensinoSuperior && bairroAdrianopolis
  })
  
  console.log(`Encontrados ${candidatosAdmin.length} candidatos:`)
  candidatosAdmin.forEach(candidato => {
    console.log(`- ${candidato.nome}`)
    console.log(`  Bairro: ${candidato.endereco.bairro}`)
    console.log(`  Áreas: ${candidato.areasInteresse.join(', ')}`)
    if (candidato.experiencias.length > 0) {
      console.log(`  Experiência: ${candidato.experiencias[0].cargo} na ${candidato.experiencias[0].empresa}`)
    }
  })
  
  return candidatosAdmin
}

// Função para executar todos os exemplos
export function executarTodosExemplos() {
  console.log('🚀 EXECUTANDO TODOS OS EXEMPLOS DE BUSCA AVANÇADA')
  console.log('================================================')
  console.log('')
  
  exemploEnfermagem()
  console.log('')
  
  exemploFiltroCompleto()
  console.log('')
  
  exemploEscolaridadeTecnica()
  console.log('')
  
  exemploBairroEspecifico('Compensa')
  console.log('')
  
  exemploAdministracao()
  console.log('')
  
  console.log('✅ TODOS OS EXEMPLOS EXECUTADOS COM SUCESSO!')
}

// Instruções para uso no console
console.log(`
🎯 EXEMPLOS DE BUSCA AVANÇADA - SETEMP
=====================================

Para testar a busca avançada, execute no console:

1. Buscar enfermeiros:
   exemploEnfermagem()

2. Filtro completo (masculino, até 30 anos, Compensa):
   exemploFiltroCompleto()

3. Candidatos com ensino técnico:
   exemploEscolaridadeTecnica()

4. Candidatos por bairro:
   exemploBairroEspecifico('Centro')

5. Administração + Superior + Adrianópolis:
   exemploAdministracao()

6. Executar todos os exemplos:
   executarTodosExemplos()

Estes exemplos demonstram como a busca avançada funciona
com os dados de candidatos cadastrados no sistema.
`)

export default {
  exemploEnfermagem,
  exemploFiltroCompleto,
  exemploEscolaridadeTecnica,
  exemploBairroEspecifico,
  exemploAdministracao,
  executarTodosExemplos
}