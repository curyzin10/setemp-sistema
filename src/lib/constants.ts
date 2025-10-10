// Constantes e dados mock completos para o sistema SETEMP

export const CIDADES_AMAZONAS = [
  'Manaus',
  'Parintins',
  'Itacoatiara',
  'Manacapuru',
  'Coari',
  'Tefé',
  'Tabatinga',
  'Maués',
  'São Gabriel da Cachoeira',
  'Humaitá',
  'Lábrea',
  'Eirunepé',
  'Manicoré',
  'Carauari',
  'Barcelos',
  'Santa Isabel do Rio Negro',
  'Novo Airão',
  'Presidente Figueiredo',
  'Rio Preto da Eva',
  'Iranduba',
  'Autazes',
  'Borba',
  'Caapiranga',
  'Careiro',
  'Careiro da Várzea',
  'Codajás',
  'Fonte Boa',
  'Guajará',
  'Ipixuna',
  'Japurá',
  'Jutaí',
  'Nhamundá',
  'Nova Olinda do Norte',
  'Novo Aripuanã',
  'Pauini',
  'São Paulo de Olivença',
  'Silves',
  'Tapauá',
  'Tonantins',
  'Uarini',
  'Urucará'
]

export const AREAS_ATUACAO = [
  'Tecnologia da Informação',
  'Administração',
  'Vendas e Comércio',
  'Educação',
  'Saúde',
  'Engenharia',
  'Construção Civil',
  'Indústria',
  'Logística e Transporte',
  'Turismo e Hotelaria',
  'Agricultura e Pecuária',
  'Serviços Gerais',
  'Recursos Humanos',
  'Marketing e Comunicação',
  'Finanças e Contabilidade',
  'Jurídico',
  'Design e Criação',
  'Consultoria',
  'Segurança',
  'Alimentação e Gastronomia',
  'Meio Ambiente',
  'Energia',
  'Telecomunicações',
  'Automobilístico',
  'Farmacêutico',
  'Têxtil e Confecção',
  'Mineração',
  'Pesca e Aquicultura',
  'Artesanato',
  'Cooperativismo'
]

export const TIPOS_CONTRATO = [
  { value: 'clt', label: 'CLT' },
  { value: 'pj', label: 'Pessoa Jurídica' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'temporario', label: 'Temporário' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'cooperado', label: 'Cooperado' }
]

export const MODALIDADES_TRABALHO = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido' }
]

export const NIVEIS_EXPERIENCIA = [
  { value: 'estagiario', label: 'Estagiário' },
  { value: 'trainee', label: 'Trainee' },
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sênior' }
]

export const NIVEIS_ESCOLARIDADE = [
  { value: 'fundamental', label: 'Ensino Fundamental' },
  { value: 'medio', label: 'Ensino Médio' },
  { value: 'tecnico', label: 'Técnico' },
  { value: 'superior', label: 'Ensino Superior' },
  { value: 'pos-graduacao', label: 'Pós-graduação' }
]

export const PORTE_EMPRESA = [
  { value: 'micro', label: 'Microempresa' },
  { value: 'pequena', label: 'Pequena' },
  { value: 'media', label: 'Média' },
  { value: 'grande', label: 'Grande' }
]

export const STATUS_CANDIDATURA = [
  { value: 'em-analise', label: 'Em Análise', color: 'blue' },
  { value: 'pre-selecionado', label: 'Pré-selecionado', color: 'yellow' },
  { value: 'entrevista-agendada', label: 'Entrevista Agendada', color: 'purple' },
  { value: 'entrevista-realizada', label: 'Entrevista Realizada', color: 'indigo' },
  { value: 'aprovado', label: 'Aprovado', color: 'green' },
  { value: 'rejeitado', label: 'Não Selecionado', color: 'red' },
  { value: 'contratado', label: 'Contratado', color: 'emerald' },
  { value: 'desistiu', label: 'Desistiu', color: 'gray' }
]

export const STATUS_VAGA = [
  { value: 'ativa', label: 'Ativa', color: 'green' },
  { value: 'pausada', label: 'Pausada', color: 'yellow' },
  { value: 'encerrada', label: 'Encerrada', color: 'gray' },
  { value: 'preenchida', label: 'Preenchida', color: 'blue' },
  { value: 'cancelada', label: 'Cancelada', color: 'red' }
]

export const STATUS_EMPRESA = [
  { value: 'pendente', label: 'Pendente Aprovação', color: 'yellow' },
  { value: 'aprovada', label: 'Aprovada', color: 'green' },
  { value: 'suspensa', label: 'Suspensa', color: 'red' },
  { value: 'rejeitada', label: 'Rejeitada', color: 'gray' }
]

export const STATUS_CANDIDATO = [
  { value: 'ativo', label: 'Ativo', color: 'green' },
  { value: 'inativo', label: 'Inativo', color: 'gray' },
  { value: 'suspenso', label: 'Suspenso', color: 'red' }
]

export const NIVEIS_ADMIN = [
  { value: 'administrador', label: 'Administrador' },
  { value: 'gestor', label: 'Gestor' },
  { value: 'operador', label: 'Operador' },
  { value: 'analista', label: 'Analista' }
]

export const PRIORIDADES = [
  { value: 'baixa', label: 'Baixa', color: 'gray' },
  { value: 'normal', label: 'Normal', color: 'blue' },
  { value: 'alta', label: 'Alta', color: 'orange' },
  { value: 'urgente', label: 'Urgente', color: 'red' }
]

// Dados mock expandidos para demonstração
export const VAGAS_MOCK = [
  {
    id: '1',
    empresaId: 'emp1',
    codigo: 'DEV001',
    cargo: 'Desenvolvedor Full Stack',
    empresa: 'Tech Solutions Ltda',
    descricao: 'Desenvolvimento de aplicações web usando React, Node.js e PostgreSQL. Participação em projetos inovadores com metodologias ágeis.',
    requisitos: ['React', 'Node.js', 'PostgreSQL', '2+ anos experiência', 'Git', 'JavaScript/TypeScript'],
    requisitosDesejados: ['AWS', 'Docker', 'Metodologias Ágeis'],
    salario: { minimo: 4500, maximo: 6000, moeda: 'BRL' as const, negociavel: true },
    beneficios: ['Vale alimentação R$ 600', 'Plano de saúde', 'Home office flexível', 'Auxílio educação'],
    cidade: 'Manaus',
    bairro: 'Adrianópolis',
    tipoContrato: 'clt' as const,
    cargaHoraria: '40h semanais',
    horarioTrabalho: '08:00 às 17:00',
    modalidade: 'hibrido' as const,
    nivelExperiencia: 'pleno' as const,
    escolaridadeMinima: 'superior' as const,
    status: 'ativa' as const,
    dataPublicacao: '2024-01-15',
    dataLimiteInscricao: '2024-02-15',
    numeroVagas: 2,
    vagasPreenchidas: 0,
    prioridade: 'alta' as const,
    publicarSINE: true
  },
  {
    id: '2',
    empresaId: 'emp2',
    codigo: 'ADM001',
    cargo: 'Assistente Administrativo',
    empresa: 'Comércio Amazonas S.A',
    descricao: 'Apoio administrativo geral, atendimento ao cliente, organização de documentos e suporte ao departamento comercial.',
    requisitos: ['Ensino médio completo', 'Conhecimento em Excel', 'Boa comunicação', 'Experiência em atendimento'],
    requisitosDesejados: ['Curso técnico em Administração', 'Conhecimento em ERP'],
    salario: { minimo: 1800, maximo: 2200, moeda: 'BRL' as const, negociavel: false },
    beneficios: ['Vale transporte', 'Vale alimentação R$ 400', 'Plano de saúde'],
    cidade: 'Manaus',
    bairro: 'Centro',
    tipoContrato: 'clt' as const,
    cargaHoraria: '44h semanais',
    horarioTrabalho: '08:00 às 17:00',
    modalidade: 'presencial' as const,
    nivelExperiencia: 'junior' as const,
    escolaridadeMinima: 'medio' as const,
    status: 'ativa' as const,
    dataPublicacao: '2024-01-16',
    numeroVagas: 1,
    vagasPreenchidas: 0,
    prioridade: 'normal' as const,
    publicarSINE: true
  },
  {
    id: '3',
    empresaId: 'emp3',
    codigo: 'OP001',
    cargo: 'Operador de Máquinas',
    empresa: 'Indústria Norte Brasil',
    descricao: 'Operação de máquinas industriais, controle de qualidade, manutenção preventiva e cumprimento de normas de segurança.',
    requisitos: ['Curso técnico', 'Experiência com máquinas industriais', 'Disponibilidade para turnos', 'NR-12'],
    requisitosDesejados: ['Curso de operador de empilhadeira', 'Experiência em indústria alimentícia'],
    salario: { minimo: 2500, maximo: 3000, moeda: 'BRL' as const, negociavel: true },
    beneficios: ['Plano de saúde', 'Participação nos lucros', 'Transporte fretado', 'Cesta básica'],
    cidade: 'Itacoatiara',
    tipoContrato: 'clt' as const,
    cargaHoraria: '44h semanais',
    horarioTrabalho: 'Turnos rotativos',
    modalidade: 'presencial' as const,
    nivelExperiencia: 'pleno' as const,
    escolaridadeMinima: 'tecnico' as const,
    status: 'ativa' as const,
    dataPublicacao: '2024-01-17',
    numeroVagas: 3,
    vagasPreenchidas: 1,
    prioridade: 'urgente' as const,
    publicarSINE: true
  }
]

export const EMPRESAS_MOCK = [
  {
    id: 'emp1',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'Tech Solutions Ltda',
    nomeFantasia: 'Tech Solutions',
    areaAtuacao: 'Tecnologia da Informação',
    porte: 'pequena' as const,
    responsavelRH: {
      nome: 'Maria Silva',
      email: 'rh@techsolutions.com.br',
      telefone: '(92) 99999-1234',
      cargo: 'Gerente de RH'
    },
    endereco: {
      rua: 'Av. Eduardo Ribeiro',
      numero: '1000',
      bairro: 'Centro',
      cidade: 'Manaus',
      cep: '69010-001',
      estado: 'AM'
    },
    contato: {
      telefone: '(92) 3234-5678',
      email: 'contato@techsolutions.com.br',
      site: 'www.techsolutions.com.br'
    },
    status: 'aprovada' as const,
    dataCadastro: '2024-01-10',
    dataAprovacao: '2024-01-12'
  },
  {
    id: 'emp2',
    cnpj: '98.765.432/0001-10',
    razaoSocial: 'Comércio Amazonas S.A',
    nomeFantasia: 'Amazonas Comércio',
    areaAtuacao: 'Vendas e Comércio',
    porte: 'media' as const,
    responsavelRH: {
      nome: 'João Santos',
      email: 'rh@amazonascomercio.com.br',
      telefone: '(92) 99999-5678',
      cargo: 'Coordenador de RH'
    },
    endereco: {
      rua: 'Rua José Paranaguá',
      numero: '500',
      bairro: 'Centro',
      cidade: 'Manaus',
      cep: '69005-130',
      estado: 'AM'
    },
    contato: {
      telefone: '(92) 3234-9876',
      email: 'contato@amazonascomercio.com.br'
    },
    status: 'aprovada' as const,
    dataCadastro: '2024-01-08',
    dataAprovacao: '2024-01-10'
  }
]

export const CANDIDATOS_MOCK = [
  {
    id: 'cand1',
    nome: 'Ana Paula Costa',
    cpf: '123.456.789-00',
    dataNascimento: '1990-05-15',
    telefone: '(92) 99999-0001',
    email: 'ana.costa@email.com',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Adrianópolis',
      cidade: 'Manaus',
      cep: '69057-000',
      estado: 'AM'
    },
    escolaridade: 'superior' as const,
    experienciaProfissional: [
      {
        id: 'exp1',
        empresa: 'Empresa ABC',
        cargo: 'Desenvolvedora Junior',
        dataInicio: '2020-01-01',
        dataFim: '2023-12-31',
        descricao: 'Desenvolvimento de aplicações web com React e Node.js',
        ativo: false,
        salario: 3500,
        motivoSaida: 'Busca por novos desafios'
      }
    ],
    areaInteresse: ['Tecnologia da Informação', 'Desenvolvimento Web'],
    curriculoUrl: '/curriculos/ana-costa.pdf',
    status: 'ativo' as const,
    dataCadastro: '2024-01-05'
  },
  {
    id: 'cand2',
    nome: 'Carlos Eduardo Silva',
    cpf: '987.654.321-00',
    dataNascimento: '1985-08-22',
    telefone: '(92) 99999-0002',
    email: 'carlos.silva@email.com',
    endereco: {
      rua: 'Av. Constantino Nery',
      numero: '456',
      bairro: 'Chapada',
      cidade: 'Manaus',
      cep: '69050-000',
      estado: 'AM'
    },
    escolaridade: 'tecnico' as const,
    experienciaProfissional: [
      {
        id: 'exp2',
        empresa: 'Indústria XYZ',
        cargo: 'Operador de Máquinas',
        dataInicio: '2018-03-01',
        dataFim: '2023-11-30',
        descricao: 'Operação de máquinas industriais e controle de qualidade',
        ativo: false,
        salario: 2800
      }
    ],
    areaInteresse: ['Indústria', 'Operação de Máquinas'],
    status: 'ativo' as const,
    dataCadastro: '2024-01-08'
  }
]

export const PROGRAMAS_SETEMP = [
  {
    id: 'prog1',
    nome: 'Qualifica Amazonas',
    descricao: 'Programa de capacitação profissional gratuito com cursos em diversas áreas',
    detalhes: 'Oferece cursos de qualificação profissional em parceria com instituições de ensino, visando preparar trabalhadores para o mercado de trabalho.',
    tipo: 'qualificacao' as const,
    areas: ['Tecnologia', 'Administração', 'Vendas', 'Serviços'],
    duracao: '40 a 200 horas',
    modalidade: 'hibrido' as const,
    requisitos: ['Ensino fundamental completo', 'Idade mínima 16 anos'],
    certificacao: 'Certificado reconhecido pelo MEC',
    status: 'ativo' as const,
    dataInicio: '2024-02-01',
    dataFim: '2024-12-31',
    vagas: 1000,
    vagasOcupadas: 650,
    investimento: 2500000,
    parceiros: ['SENAI', 'SENAC', 'IFAM'],
    coordenador: {
      nome: 'Dra. Mariana Oliveira',
      email: 'mariana.oliveira@setemp.am.gov.br',
      telefone: '(92) 3215-4001'
    }
  },
  {
    id: 'prog2',
    nome: 'Empreende AM',
    descricao: 'Programa de apoio ao empreendedorismo com microcrédito e capacitação',
    detalhes: 'Oferece suporte completo para quem deseja empreender, incluindo capacitação, orientação e acesso a microcrédito.',
    tipo: 'empreendedorismo' as const,
    areas: ['Microcrédito', 'Consultoria', 'Capacitação', 'Mentoria'],
    duracao: 'Acompanhamento contínuo',
    modalidade: 'presencial' as const,
    requisitos: ['Plano de negócios', 'Residir no Amazonas', 'Idade mínima 18 anos'],
    certificacao: 'Certificado de participação',
    status: 'ativo' as const,
    vagas: 500,
    vagasOcupadas: 320,
    investimento: 5000000,
    parceiros: ['SEBRAE', 'Banco do Povo', 'FAPEAM'],
    coordenador: {
      nome: 'Prof. Roberto Santos',
      email: 'roberto.santos@setemp.am.gov.br',
      telefone: '(92) 3215-4002'
    }
  },
  {
    id: 'prog3',
    nome: 'Primeiro Emprego',
    descricao: 'Programa especial para inserção de jovens no mercado de trabalho',
    detalhes: 'Facilita a inserção de jovens de 16 a 24 anos no mercado de trabalho através de parcerias com empresas.',
    tipo: 'primeiro-emprego' as const,
    areas: ['Estágio', 'Jovem Aprendiz', 'Primeiro Emprego'],
    duracao: '6 a 24 meses',
    modalidade: 'presencial' as const,
    requisitos: ['16 a 24 anos', 'Ensino médio em curso ou completo'],
    certificacao: 'Experiência profissional comprovada',
    status: 'ativo' as const,
    vagas: 800,
    vagasOcupadas: 480,
    investimento: 1500000,
    parceiros: ['Empresas parceiras', 'CIEE', 'IEL'],
    coordenador: {
      nome: 'Ana Beatriz Lima',
      email: 'ana.lima@setemp.am.gov.br',
      telefone: '(92) 3215-4003'
    }
  }
]

export const CANDIDATURAS_MOCK = [
  {
    id: 'cand_vaga_1',
    candidatoId: 'cand1',
    vagaId: '1',
    dataCandidatura: '2024-01-18',
    status: 'em-analise' as const,
    etapaAtual: 'Análise de currículo',
    dataAtualizacao: '2024-01-18'
  },
  {
    id: 'cand_vaga_2',
    candidatoId: 'cand2',
    vagaId: '3',
    dataCandidatura: '2024-01-17',
    status: 'entrevista-agendada' as const,
    etapaAtual: 'Entrevista técnica',
    dataEntrevista: '2024-01-25',
    localEntrevista: 'Sede da empresa - Itacoatiara',
    dataAtualizacao: '2024-01-20'
  }
]

export const NOTIFICACOES_MOCK = [
  {
    id: 'not1',
    usuarioId: 'cand1',
    tipo: 'nova-vaga' as const,
    titulo: 'Nova vaga compatível com seu perfil',
    mensagem: 'Uma nova vaga de Desenvolvedor Full Stack foi publicada em Manaus',
    lida: false,
    dataEnvio: '2024-01-18T10:30:00Z',
    prioridade: 'normal' as const,
    link: '/vagas/1'
  },
  {
    id: 'not2',
    usuarioId: 'cand2',
    tipo: 'candidatura-atualizada' as const,
    titulo: 'Candidatura atualizada',
    mensagem: 'Sua candidatura para Operador de Máquinas foi atualizada para "Entrevista Agendada"',
    lida: false,
    dataEnvio: '2024-01-20T14:15:00Z',
    prioridade: 'alta' as const,
    link: '/candidato/candidaturas'
  }
]

export const RELATORIOS_TIPOS = [
  { value: 'candidatos', label: 'Relatório de Candidatos' },
  { value: 'empresas', label: 'Relatório de Empresas' },
  { value: 'vagas', label: 'Relatório de Vagas' },
  { value: 'candidaturas', label: 'Relatório de Candidaturas' },
  { value: 'geral', label: 'Relatório Geral' },
  { value: 'sine', label: 'Relatório SINE' },
  { value: 'financeiro', label: 'Relatório Financeiro' }
]

export const INTEGRACOES_SINE_TIPOS = [
  { value: 'importar-vagas', label: 'Importar Vagas' },
  { value: 'exportar-candidatos', label: 'Exportar Candidatos' },
  { value: 'sincronizar-completa', label: 'Sincronização Completa' },
  { value: 'atualizar-status', label: 'Atualizar Status' }
]

export const PERMISSOES_ADMIN = [
  'gerenciar_candidatos',
  'gerenciar_empresas',
  'gerenciar_vagas',
  'gerenciar_usuarios',
  'gerar_relatorios',
  'configurar_sistema',
  'integracao_sine',
  'enviar_comunicados',
  'visualizar_dashboard',
  'gerenciar_programas',
  'aprovar_empresas',
  'suspender_usuarios',
  'exportar_dados',
  'configurar_notificacoes'
]

export const BENEFICIOS_COMUNS = [
  'Vale alimentação',
  'Vale transporte',
  'Plano de saúde',
  'Plano odontológico',
  'Seguro de vida',
  'Participação nos lucros',
  'Auxílio educação',
  'Home office',
  'Horário flexível',
  'Gympass',
  'Cesta básica',
  'Convênio farmácia',
  'Day off aniversário',
  'Licença maternidade/paternidade estendida',
  'Auxílio creche'
]

export const HABILIDADES_COMUNS = [
  // Tecnologia
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
  'PHP', 'C#', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Docker',
  'Git', 'Linux', 'HTML', 'CSS', 'TypeScript',
  
  // Administração
  'Excel', 'Word', 'PowerPoint', 'SAP', 'ERP', 'CRM', 'Gestão de projetos',
  'Atendimento ao cliente', 'Vendas', 'Negociação', 'Liderança',
  
  // Idiomas
  'Inglês', 'Espanhol', 'Francês', 'Alemão',
  
  // Soft Skills
  'Comunicação', 'Trabalho em equipe', 'Proatividade', 'Organização',
  'Pontualidade', 'Flexibilidade', 'Criatividade', 'Resolução de problemas'
]

export const SETORES_ECONOMIA = [
  'Agronegócio',
  'Indústria de Transformação',
  'Construção Civil',
  'Comércio Varejista',
  'Comércio Atacadista',
  'Serviços',
  'Turismo',
  'Tecnologia',
  'Saúde',
  'Educação',
  'Transporte e Logística',
  'Energia',
  'Telecomunicações',
  'Setor Público',
  'Terceiro Setor'
]

export const CONFIGURACOES_SISTEMA = {
  EMAIL: {
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: 587,
    SMTP_SECURE: false,
    TEMPLATES_PATH: '/templates/email'
  },
  SINE: {
    API_URL: 'https://api.sine.gov.br',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3
  },
  UPLOADS: {
    MAX_FILE_SIZE: 5242880, // 5MB
    ALLOWED_TYPES: ['pdf', 'doc', 'docx'],
    STORAGE_PATH: '/uploads'
  },
  SECURITY: {
    PASSWORD_MIN_LENGTH: 8,
    LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 1800000, // 30 minutos
    SESSION_TIMEOUT: 3600000 // 1 hora
  }
}

export default {
  CIDADES_AMAZONAS,
  AREAS_ATUACAO,
  TIPOS_CONTRATO,
  MODALIDADES_TRABALHO,
  NIVEIS_EXPERIENCIA,
  NIVEIS_ESCOLARIDADE,
  STATUS_CANDIDATURA,
  STATUS_VAGA,
  STATUS_EMPRESA,
  VAGAS_MOCK,
  EMPRESAS_MOCK,
  CANDIDATOS_MOCK,
  PROGRAMAS_SETEMP
}