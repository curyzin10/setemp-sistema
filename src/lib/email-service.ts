// Sistema de notificações por email para o SETEMP
// Em produção, isso seria integrado com um serviço real de email

export interface EmailTemplate {
  assunto: string
  conteudo: string
}

export interface EmailData {
  para: string
  assunto: string
  conteudo: string
  tipo: 'confirmacao-candidato' | 'aprovacao-empresa' | 'rejeicao-empresa' | 'nova-vaga' | 'candidatura-atualizada'
  dados?: any
}

// Templates de email
const templates = {
  confirmacaoCandidato: (nome: string, linkConfirmacao: string): EmailTemplate => ({
    assunto: 'Confirme seu cadastro no SETEMP - Amazonas',
    conteudo: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #059669); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SETEMP</h1>
          <p style="color: #e0f2fe; margin: 5px 0 0 0;">Secretaria de Empreendedorismo e Trabalho</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Olá, ${nome}!</h2>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Seu cadastro foi realizado com sucesso no sistema SETEMP! 🎉
          </p>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
            Para ativar sua conta e começar a se candidatar às vagas disponíveis, 
            clique no botão abaixo:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${linkConfirmacao}" 
               style="background: #2563eb; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold;
                      display: inline-block;">
              ✅ Confirmar E-mail
            </a>
          </div>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Importante:</strong> Este link expira em 24 horas. 
              Se você não se cadastrou no SETEMP, ignore este e-mail.
            </p>
          </div>
          
          <p style="color: #475569; line-height: 1.6; margin-top: 25px;">
            Após a confirmação, você poderá:
          </p>
          
          <ul style="color: #475569; line-height: 1.8;">
            <li>Buscar e se candidatar a vagas</li>
            <li>Acompanhar suas candidaturas</li>
            <li>Atualizar seu perfil profissional</li>
            <li>Receber notificações de novas oportunidades</li>
          </ul>
        </div>
        
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            SETEMP - Conectando talentos e oportunidades no Amazonas<br>
            Av. Djalma Batista, 1018 - Chapada, Manaus - AM
          </p>
        </div>
      </div>
    `
  }),

  aprovacaoEmpresa: (razaoSocial: string, email: string): EmailTemplate => ({
    assunto: '🎉 Cadastro aprovado - Bem-vinda ao SETEMP!',
    conteudo: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #2563eb); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SETEMP</h1>
          <p style="color: #e0f2fe; margin: 5px 0 0 0;">Secretaria de Empreendedorismo e Trabalho</p>
        </div>
        
        <div style="padding: 30px; background: #f0fdf4;">
          <h2 style="color: #166534; margin-bottom: 20px;">Parabéns! Cadastro Aprovado ✅</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Temos o prazer de informar que o cadastro da empresa <strong>${razaoSocial}</strong> 
            foi aprovado com sucesso!
          </p>
          
          <div style="background: white; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #059669; margin-top: 0;">🚀 Agora você pode:</h3>
            <ul style="color: #374151; line-height: 1.8; margin: 0;">
              <li>Acessar o painel da empresa</li>
              <li>Publicar vagas de emprego</li>
              <li>Gerenciar candidaturas</li>
              <li>Acessar relatórios detalhados</li>
              <li>Integrar com o SINE Nacional</li>
            </ul>
          </div>
          
          <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <h4 style="color: #1e40af; margin: 0 0 10px 0;">🔐 Dados de Acesso:</h4>
            <p style="color: #1e40af; margin: 0; font-family: monospace;">
              <strong>E-mail:</strong> ${email}<br>
              <strong>Senha:</strong> A senha cadastrada durante o registro
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" 
               style="background: #059669; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold;
                      display: inline-block;">
              🏢 Acessar Painel da Empresa
            </a>
          </div>
        </div>
        
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            Bem-vindos ao SETEMP! Juntos, vamos fortalecer o mercado de trabalho no Amazonas.<br>
            Para suporte: contato@setemp.am.gov.br | (92) 3215-4000
          </p>
        </div>
      </div>
    `
  }),

  rejeicaoEmpresa: (razaoSocial: string, motivo: string): EmailTemplate => ({
    assunto: 'Cadastro não aprovado - SETEMP',
    conteudo: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626, #7c2d12); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SETEMP</h1>
          <p style="color: #fecaca; margin: 5px 0 0 0;">Secretaria de Empreendedorismo e Trabalho</p>
        </div>
        
        <div style="padding: 30px; background: #fef2f2;">
          <h2 style="color: #991b1b; margin-bottom: 20px;">Cadastro Não Aprovado</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Informamos que o cadastro da empresa <strong>${razaoSocial}</strong> 
            não foi aprovado neste momento.
          </p>
          
          <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
            <h4 style="color: #991b1b; margin: 0 0 10px 0;">📋 Motivo:</h4>
            <p style="color: #991b1b; margin: 0;">
              ${motivo}
            </p>
          </div>
          
          <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <h4 style="color: #1e40af; margin: 0 0 10px 0;">🔄 Próximos Passos:</h4>
            <ul style="color: #1e40af; margin: 0; line-height: 1.6;">
              <li>Corrija as informações solicitadas</li>
              <li>Realize um novo cadastro com os dados atualizados</li>
              <li>Entre em contato conosco em caso de dúvidas</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" 
               style="background: #2563eb; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold;
                      display: inline-block;">
              🔄 Realizar Novo Cadastro
            </a>
          </div>
        </div>
        
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            Para dúvidas ou esclarecimentos, entre em contato conosco:<br>
            📧 contato@setemp.am.gov.br | 📞 (92) 3215-4000
          </p>
        </div>
      </div>
    `
  }),

  novaVaga: (candidato: string, vaga: string, empresa: string): EmailTemplate => ({
    assunto: `🎯 Nova vaga compatível: ${vaga}`,
    conteudo: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SETEMP</h1>
          <p style="color: #e0e7ff; margin: 5px 0 0 0;">Nova Oportunidade para Você!</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Olá, ${candidato}!</h2>
          
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Encontramos uma nova vaga que combina com seu perfil profissional! 🎯
          </p>
          
          <div style="background: white; border: 2px solid #7c3aed; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">💼 ${vaga}</h3>
            <p style="color: #374151; margin: 5px 0;"><strong>Empresa:</strong> ${empresa}</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Localização:</strong> Manaus - AM</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/vagas" 
               style="background: #7c3aed; color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold;
                      display: inline-block;">
              👀 Ver Vaga Completa
            </a>
          </div>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Dica:</strong> Candidate-se rapidamente! As melhores oportunidades 
              são preenchidas em poucos dias.
            </p>
          </div>
        </div>
        
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            SETEMP - Conectando você às melhores oportunidades<br>
            Para gerenciar suas notificações, acesse seu painel
          </p>
        </div>
      </div>
    `
  })
}

// Função principal para envio de emails
export async function enviarEmail(dados: EmailData): Promise<boolean> {
  try {
    let template: EmailTemplate

    switch (dados.tipo) {
      case 'confirmacao-candidato':
        template = templates.confirmacaoCandidato(
          dados.dados.nome, 
          dados.dados.linkConfirmacao
        )
        break
      
      case 'aprovacao-empresa':
        template = templates.aprovacaoEmpresa(
          dados.dados.razaoSocial,
          dados.dados.email
        )
        break
      
      case 'rejeicao-empresa':
        template = templates.rejeicaoEmpresa(
          dados.dados.razaoSocial,
          dados.dados.motivo
        )
        break
      
      case 'nova-vaga':
        template = templates.novaVaga(
          dados.dados.candidato,
          dados.dados.vaga,
          dados.dados.empresa
        )
        break
      
      default:
        template = {
          assunto: dados.assunto,
          conteudo: dados.conteudo
        }
    }

    // Simular envio de email
    console.log('📧 EMAIL ENVIADO:')
    console.log(`Para: ${dados.para}`)
    console.log(`Assunto: ${template.assunto}`)
    console.log(`Tipo: ${dados.tipo}`)
    console.log('---')

    // Em produção, aqui seria a integração com serviço real de email
    // Exemplos: SendGrid, AWS SES, Mailgun, etc.
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return true
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return false
  }
}

// Função para enviar email de confirmação de candidato
export async function enviarEmailConfirmacaoCandidato(
  email: string, 
  nome: string, 
  candidatoId: string
): Promise<boolean> {
  const linkConfirmacao = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirmar-email?id=${candidatoId}&token=${Math.random().toString(36).substr(2, 20)}`
  
  return await enviarEmail({
    para: email,
    assunto: 'Confirme seu cadastro no SETEMP',
    conteudo: '',
    tipo: 'confirmacao-candidato',
    dados: { nome, linkConfirmacao }
  })
}

// Função para enviar email de aprovação de empresa
export async function enviarEmailAprovacaoEmpresa(
  email: string,
  razaoSocial: string
): Promise<boolean> {
  return await enviarEmail({
    para: email,
    assunto: 'Cadastro aprovado - Bem-vinda ao SETEMP!',
    conteudo: '',
    tipo: 'aprovacao-empresa',
    dados: { razaoSocial, email }
  })
}

// Função para enviar email de rejeição de empresa
export async function enviarEmailRejeicaoEmpresa(
  email: string,
  razaoSocial: string,
  motivo: string
): Promise<boolean> {
  return await enviarEmail({
    para: email,
    assunto: 'Cadastro não aprovado - SETEMP',
    conteudo: '',
    tipo: 'rejeicao-empresa',
    dados: { razaoSocial, motivo }
  })
}

// Função para notificar sobre nova vaga
export async function notificarNovaVaga(
  emailCandidato: string,
  nomeCandidato: string,
  nomeVaga: string,
  nomeEmpresa: string
): Promise<boolean> {
  return await enviarEmail({
    para: emailCandidato,
    assunto: `Nova vaga compatível: ${nomeVaga}`,
    conteudo: '',
    tipo: 'nova-vaga',
    dados: {
      candidato: nomeCandidato,
      vaga: nomeVaga,
      empresa: nomeEmpresa
    }
  })
}

// Função para logs de email (desenvolvimento)
export function obterLogsEmail() {
  // Em produção, isso consultaria logs reais do serviço de email
  return {
    enviados: 156,
    entregues: 152,
    abertos: 98,
    cliques: 34,
    bounces: 2,
    reclamacoes: 0
  }
}