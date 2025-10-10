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

export interface NoticiaData {
  id?: string
  titulo: string
  subtitulo?: string
  conteudo: string
  resumo: string
  imagemDestaque: string
  categoria: string
  autor: string
  dataPublicacao: string
  dataCriacao: string
  status: 'rascunho' | 'publicada' | 'arquivada'
  visualizacoes: number
  slug: string
}

// Simulação de banco de dados em memória com dados de exemplo
let candidatos: CandidatoData[] = [
  {
    id: 'cand_001',
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
        descricao: 'Atendimento em UTI e emergência, cuidados intensivos',
        ativo: false
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-15T10:30:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_002',
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
        descricao: 'Manutenção e reparo de veículos, diagnóstico eletrônico',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-10T14:20:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_003',
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
        descricao: 'Gestão de documentos, atendimento ao cliente, controle de estoque',
        ativo: false
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-08T09:15:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_004',
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
        descricao: 'Instalações elétricas residenciais e comerciais, manutenção preventiva',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-05T16:45:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_005',
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
        descricao: 'Cuidados especializados em pediatria, vacinação infantil',
        ativo: false
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-03T11:30:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_006',
    nome: 'Roberto Santos Silva',
    cpf: '789.123.456-00',
    dataNascimento: '1987-11-12',
    telefone: '(92) 94444-2345',
    email: 'roberto.santos@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Rua Amazonas',
      numero: '987',
      bairro: 'Cidade Nova',
      cidade: 'Manaus',
      cep: '69073-000'
    },
    escolaridade: 'tecnico',
    areasInteresse: ['Tecnologia', 'Informática'],
    experiencias: [
      {
        empresa: 'TechSolutions',
        cargo: 'Técnico em Informática',
        dataInicio: '2020-02-01',
        dataFim: null,
        descricao: 'Suporte técnico, manutenção de computadores, redes',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-02T08:20:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_007',
    nome: 'Juliana Pereira',
    cpf: '147.258.369-00',
    dataNascimento: '1993-04-08',
    telefone: '(92) 93333-6789',
    email: 'juliana.pereira@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Av. Djalma Batista',
      numero: '1500',
      bairro: 'Chapada',
      cidade: 'Manaus',
      cep: '69050-010'
    },
    escolaridade: 'superior',
    areasInteresse: ['Educação', 'Pedagogia'],
    experiencias: [
      {
        empresa: 'Escola Municipal',
        cargo: 'Professora',
        dataInicio: '2018-03-01',
        dataFim: '2023-12-15',
        descricao: 'Ensino fundamental, alfabetização, coordenação pedagógica',
        ativo: false
      }
    ],
    status: 'ativo',
    dataCadastro: '2024-01-01T15:10:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_008',
    nome: 'Paulo Henrique Costa',
    cpf: '258.369.147-00',
    dataNascimento: '1991-09-30',
    telefone: '(92) 92222-4567',
    email: 'paulo.henrique@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Rua Belo Horizonte',
      numero: '456',
      bairro: 'Aleixo',
      cidade: 'Manaus',
      cep: '69060-020'
    },
    escolaridade: 'medio',
    areasInteresse: ['Vendas', 'Atendimento'],
    experiencias: [
      {
        empresa: 'Loja Magazine',
        cargo: 'Vendedor',
        dataInicio: '2019-05-01',
        dataFim: null,
        descricao: 'Vendas, atendimento ao cliente, controle de estoque',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2023-12-28T12:45:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_009',
    nome: 'Carla Regina Oliveira',
    cpf: '369.147.258-00',
    dataNascimento: '1989-06-14',
    telefone: '(92) 91111-8901',
    email: 'carla.regina@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Av. Max Teixeira',
      numero: '2000',
      bairro: 'Cidade Nova',
      cidade: 'Manaus',
      cep: '69073-005'
    },
    escolaridade: 'superior',
    areasInteresse: ['Psicologia', 'Recursos Humanos'],
    experiencias: [
      {
        empresa: 'Clínica Mente Sã',
        cargo: 'Psicóloga',
        dataInicio: '2016-08-01',
        dataFim: '2023-07-31',
        descricao: 'Atendimento clínico, terapia individual e em grupo',
        ativo: false
      }
    ],
    status: 'ativo',
    dataCadastro: '2023-12-25T10:30:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_010',
    nome: 'Anderson Ferreira',
    cpf: '741.852.963-00',
    dataNascimento: '1986-02-28',
    telefone: '(92) 90000-1234',
    email: 'anderson.ferreira@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Rua Parintins',
      numero: '789',
      bairro: 'Compensa',
      cidade: 'Manaus',
      cep: '69036-010'
    },
    escolaridade: 'tecnico',
    areasInteresse: ['Soldagem', 'Metalurgia'],
    experiencias: [
      {
        empresa: 'Metalúrgica Amazonas',
        cargo: 'Soldador',
        dataInicio: '2014-01-15',
        dataFim: null,
        descricao: 'Soldagem industrial, estruturas metálicas, caldeiraria',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2023-12-20T14:15:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_011',
    nome: 'Patrícia Lima Santos',
    cpf: '852.963.741-00',
    dataNascimento: '1994-10-05',
    telefone: '(92) 98765-4321',
    email: 'patricia.lima@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Av. Autaz Mirim',
      numero: '1200',
      bairro: 'Tancredo Neves',
      cidade: 'Manaus',
      cep: '69088-000'
    },
    escolaridade: 'superior',
    areasInteresse: ['Enfermagem', 'UTI'],
    experiencias: [
      {
        empresa: 'Hospital de Urgência',
        cargo: 'Enfermeira de UTI',
        dataInicio: '2019-01-01',
        dataFim: null,
        descricao: 'Cuidados intensivos, monitoramento de pacientes críticos',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2023-12-18T09:20:00Z',
    emailConfirmado: true
  },
  {
    id: 'cand_012',
    nome: 'Ricardo Almeida',
    cpf: '963.741.852-00',
    dataNascimento: '1983-12-22',
    telefone: '(92) 97654-3210',
    email: 'ricardo.almeida@email.com',
    senha: 'senha123',
    endereco: {
      rua: 'Rua Itacoatiara',
      numero: '567',
      bairro: 'Adrianópolis',
      cidade: 'Manaus',
      cep: '69057-020'
    },
    escolaridade: 'superior',
    areasInteresse: ['Administração', 'Gestão'],
    experiencias: [
      {
        empresa: 'Consultoria Empresarial',
        cargo: 'Administrador',
        dataInicio: '2012-03-01',
        dataFim: null,
        descricao: 'Gestão empresarial, consultoria, planejamento estratégico',
        ativo: true
      }
    ],
    status: 'ativo',
    dataCadastro: '2023-12-15T16:40:00Z',
    emailConfirmado: true
  }
]

let empresas: EmpresaData[] = []
let notificacoesAdmin: NotificacaoAdmin[] = []

// Dados de exemplo para notícias
let noticias: NoticiaData[] = [
  {
    id: 'noticia_001',
    titulo: 'Programa Jovem Empreendedor abre novas vagas em Manaus',
    subtitulo: 'Iniciativa visa capacitar jovens de 18 a 29 anos para o mercado de trabalho',
    conteudo: `<p>A SETEMP – Secretaria Executiva do Trabalho e Empreendedorismo anuncia a abertura de 500 novas vagas para o Programa Jovem Empreendedor, voltado para jovens de 18 a 29 anos residentes em Manaus.</p>

<p>O programa oferece capacitação gratuita em diversas áreas, incluindo:</p>
<ul>
<li>Empreendedorismo digital</li>
<li>Gestão de pequenos negócios</li>
<li>Marketing digital</li>
<li>Vendas e atendimento ao cliente</li>
<li>Educação financeira</li>
</ul>

<p>As inscrições podem ser realizadas através do portal da SETEMP ou presencialmente em nossas unidades de atendimento. Os cursos têm duração de 3 meses e incluem certificação reconhecida pelo MEC.</p>

<p>"Este programa é uma oportunidade única para os jovens amazonenses desenvolverem habilidades empreendedoras e se prepararem para o mercado de trabalho atual", destaca o secretário executivo.</p>

<p>Além da capacitação, os participantes terão acesso a:</p>
<ul>
<li>Mentoria individualizada</li>
<li>Rede de contatos empresariais</li>
<li>Apoio para abertura de MEI</li>
<li>Linhas de microcrédito especiais</li>
</ul>

<p>As aulas começam no próximo mês e serão realizadas nos turnos matutino, vespertino e noturno, para atender diferentes perfis de estudantes e trabalhadores.</p>`,
    resumo: 'SETEMP abre 500 vagas para capacitação gratuita de jovens empreendedores em Manaus, com cursos de 3 meses e certificação reconhecida.',
    imagemDestaque: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    categoria: 'Empreendedorismo',
    autor: 'Equipe SETEMP',
    dataPublicacao: '2024-01-20T09:00:00Z',
    dataCriacao: '2024-01-19T15:30:00Z',
    status: 'publicada',
    visualizacoes: 1250,
    slug: 'programa-jovem-empreendedor-abre-novas-vagas-manaus'
  },
  {
    id: 'noticia_002',
    titulo: 'Feira do Emprego movimenta mais de 3 mil atendimentos',
    subtitulo: 'Evento realizado no Centro de Convenções conectou candidatos e empresas',
    conteudo: `<p>A Feira do Emprego realizada pela SETEMP no último fim de semana foi um grande sucesso, registrando mais de 3.000 atendimentos e conectando centenas de candidatos com oportunidades de trabalho.</p>

<p>O evento, realizado no Centro de Convenões Vasco Vasques, contou com a participação de 85 empresas de diversos setores, oferecendo mais de 1.200 vagas de emprego.</p>

<p><strong>Números da feira:</strong></p>
<ul>
<li>3.247 candidatos atendidos</li>
<li>85 empresas participantes</li>
<li>1.284 vagas oferecidas</li>
<li>456 entrevistas realizadas no local</li>
<li>127 contratações imediatas</li>
</ul>

<p>Entre os setores que mais ofereceram oportunidades estavam:</p>
<ul>
<li>Comércio e varejo (35% das vagas)</li>
<li>Serviços (28% das vagas)</li>
<li>Indústria (20% das vagas)</li>
<li>Tecnologia (12% das vagas)</li>
<li>Saúde (5% das vagas)</li>
</ul>

<p>"Ficamos muito satisfeitos com os resultados. A feira demonstra a importância de criar espaços de encontro entre oferta e demanda de trabalho", comenta a coordenadora do evento.</p>

<p>A próxima Feira do Emprego está programada para março e promete ser ainda maior, com a participação de empresas de outros estados da região Norte.</p>

<p>Os candidatos que não puderam participar do evento podem acessar as vagas disponíveis através do portal da SETEMP, onde encontrarão oportunidades atualizadas diariamente.</p>`,
    resumo: 'Feira do Emprego da SETEMP registra mais de 3 mil atendimentos, 85 empresas participantes e 127 contratações imediatas.',
    imagemDestaque: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop',
    categoria: 'Emprego',
    autor: 'Assessoria de Comunicação',
    dataPublicacao: '2024-01-18T14:30:00Z',
    dataCriacao: '2024-01-18T10:15:00Z',
    status: 'publicada',
    visualizacoes: 2180,
    slug: 'feira-emprego-movimenta-3-mil-atendimentos'
  },
  {
    id: 'noticia_003',
    titulo: 'Parceria com SINE amplia oportunidades de trabalho',
    subtitulo: 'Integração dos sistemas facilita acesso a vagas em todo o país',
    conteudo: `<p>A SETEMP firmou uma importante parceria com o SINE Nacional que amplia significativamente as oportunidades de trabalho para os amazonenses, permitindo acesso a vagas em todo o território nacional.</p>

<p>A integração dos sistemas permite que:</p>
<ul>
<li>Candidatos amazonenses se candidatem a vagas em outros estados</li>
<li>Empresas de outros estados acessem o banco de talentos do Amazonas</li>
<li>Haja intercâmbio de boas práticas entre os SINEs estaduais</li>
<li>Dados sejam compartilhados para melhor análise do mercado de trabalho</li>
</ul>

<p>Com essa parceria, o número de vagas disponíveis no portal da SETEMP aumentou em 300%, passando de uma média de 800 vagas mensais para mais de 2.400 oportunidades.</p>

<p>"Esta integração representa um marco na política de emprego do Amazonas. Nossos trabalhadores agora têm acesso a um mercado muito mais amplo", destaca o secretário executivo.</p>

<p><strong>Benefícios da parceria:</strong></p>
<ul>
<li>Maior diversidade de vagas disponíveis</li>
<li>Oportunidades em diferentes regiões do país</li>
<li>Facilidade para empresas encontrarem profissionais qualificados</li>
<li>Redução do tempo de preenchimento de vagas</li>
<li>Melhor matching entre candidatos e oportunidades</li>
</ul>

<p>A plataforma integrada já está funcionando e os candidatos podem acessar as novas funcionalidades através do portal oficial da SETEMP.</p>

<p>Para as empresas, o sistema oferece ferramentas avançadas de busca e filtros que facilitam a identificação de candidatos com o perfil desejado.</p>`,
    resumo: 'Parceria entre SETEMP e SINE Nacional amplia em 300% as vagas disponíveis, oferecendo oportunidades em todo o país.',
    imagemDestaque: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
    categoria: 'Parceria',
    autor: 'Departamento de Comunicação',
    dataPublicacao: '2024-01-16T11:00:00Z',
    dataCriacao: '2024-01-15T16:45:00Z',
    status: 'publicada',
    visualizacoes: 1890,
    slug: 'parceria-sine-amplia-oportunidades-trabalho'
  },
  {
    id: 'noticia_004',
    titulo: 'Curso de Capacitação Digital forma 200 profissionais',
    subtitulo: 'Programa preparou trabalhadores para economia digital',
    conteudo: `<p>A SETEMP concluiu com sucesso mais uma turma do Curso de Capacitação Digital, formando 200 novos profissionais preparados para atuar na economia digital.</p>

<p>O programa, que teve duração de 4 meses, abordou temas essenciais como:</p>
<ul>
<li>Marketing digital e redes sociais</li>
<li>E-commerce e vendas online</li>
<li>Ferramentas de produtividade</li>
<li>Segurança digital</li>
<li>Empreendedorismo digital</li>
</ul>

<p>Durante a cerimônia de formatura, realizada no auditório da SETEMP, foram apresentados 45 projetos desenvolvidos pelos alunos, incluindo lojas virtuais, aplicativos e campanhas de marketing digital.</p>

<p>"A transformação digital não é mais uma tendência, é uma realidade. Nosso papel é preparar os trabalhadores amazonenses para essa nova economia", afirma a coordenadora do programa.</p>

<p><strong>Resultados do programa:</strong></p>
<ul>
<li>200 profissionais capacitados</li>
<li>85% de aproveitamento nas avaliações</li>
<li>45 projetos práticos desenvolvidos</li>
<li>78% dos formandos já empregados ou empreendendo</li>
<li>15 startups criadas pelos participantes</li>
</ul>

<p>O curso contou com instrutores especializados e parcerias com empresas de tecnologia, garantindo conteúdo atualizado e relevante para o mercado.</p>

<p>A próxima turma do Curso de Capacitação Digital já tem inscrições abertas, com 300 vagas disponíveis. Os interessados podem se inscrever através do portal da SETEMP.</p>`,
    resumo: 'SETEMP forma 200 profissionais em capacitação digital, com 78% dos formandos já inseridos no mercado de trabalho.',
    imagemDestaque: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    categoria: 'Curso',
    autor: 'Coordenação de Capacitação',
    dataPublicacao: '2024-01-14T16:20:00Z',
    dataCriacao: '2024-01-14T09:30:00Z',
    status: 'publicada',
    visualizacoes: 1456,
    slug: 'curso-capacitacao-digital-forma-200-profissionais'
  },
  {
    id: 'noticia_005',
    titulo: 'SETEMP lança aplicativo móvel para busca de vagas',
    subtitulo: 'Nova ferramenta facilita acesso a oportunidades de emprego',
    conteudo: `<p>A SETEMP lançou oficialmente seu aplicativo móvel, disponível para Android e iOS, facilitando ainda mais o acesso dos candidatos às oportunidades de emprego no Amazonas.</p>

<p>O app oferece funcionalidades completas, incluindo:</p>
<ul>
<li>Busca avançada de vagas por localização, área e salário</li>
<li>Notificações push para novas oportunidades</li>
<li>Candidatura com um clique</li>
<li>Acompanhamento do status das candidaturas</li>
<li>Chat direto com recrutadores</li>
<li>Agenda de entrevistas integrada</li>
</ul>

<p>Desenvolvido em parceria com uma empresa local de tecnologia, o aplicativo utiliza inteligência artificial para sugerir vagas compatíveis com o perfil de cada usuário.</p>

<p>"Com o aplicativo, queremos estar ainda mais próximos dos trabalhadores amazonenses, oferecendo uma ferramenta moderna e eficiente para a busca de emprego", explica o diretor de tecnologia da SETEMP.</p>

<p><strong>Principais recursos:</strong></p>
<ul>
<li>Interface intuitiva e responsiva</li>
<li>Sincronização com o portal web</li>
<li>Modo offline para consulta de vagas salvas</li>
<li>Integração com redes sociais profissionais</li>
<li>Sistema de avaliação de empresas</li>
<li>Mapa de vagas por região</li>
</ul>

<p>Nas primeiras 48 horas após o lançamento, o aplicativo já registrou mais de 5.000 downloads e 1.200 candidaturas realizadas através da plataforma móvel.</p>

<p>O aplicativo está disponível gratuitamente na Google Play Store e Apple App Store. Basta buscar por "SETEMP Empregos" para fazer o download.</p>`,
    resumo: 'SETEMP lança aplicativo móvel com IA para busca de vagas, registrando 5 mil downloads em 48 horas.',
    imagemDestaque: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    categoria: 'Tecnologia',
    autor: 'Equipe de Desenvolvimento',
    dataPublicacao: '2024-01-12T10:15:00Z',
    dataCriacao: '2024-01-11T14:20:00Z',
    status: 'publicada',
    visualizacoes: 3240,
    slug: 'setemp-lanca-aplicativo-movel-busca-vagas'
  }
]

// Utilitários
function gerarId(): string {
  return Math.random().toString(36).substr(2, 9)
}

function gerarCodigoConfirmacao(): string {
  return Math.random().toString(36).substr(2, 20)
}

function gerarSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
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

// Funções para Notícias
export async function criarNoticia(dados: Omit<NoticiaData, 'id' | 'dataCriacao' | 'visualizacoes' | 'slug'>): Promise<{
  sucesso: boolean
  mensagem: string
  noticiaId?: string
}> {
  try {
    const noticiaId = gerarId()
    const slug = gerarSlug(dados.titulo)
    
    const novaNoticia: NoticiaData = {
      ...dados,
      id: noticiaId,
      dataCriacao: new Date().toISOString(),
      visualizacoes: 0,
      slug
    }

    noticias.push(novaNoticia)

    return {
      sucesso: true,
      mensagem: 'Notícia criada com sucesso!',
      noticiaId
    }
  } catch (error) {
    console.error('Erro ao criar notícia:', error)
    return {
      sucesso: false,
      mensagem: 'Erro interno do servidor. Tente novamente mais tarde.'
    }
  }
}

export async function atualizarNoticia(noticiaId: string, dados: Partial<NoticiaData>): Promise<{
  sucesso: boolean
  mensagem: string
}> {
  try {
    const noticia = noticias.find(n => n.id === noticiaId)
    
    if (!noticia) {
      return {
        sucesso: false,
        mensagem: 'Notícia não encontrada'
      }
    }

    // Atualizar campos
    Object.assign(noticia, dados)
    
    // Atualizar slug se o título mudou
    if (dados.titulo) {
      noticia.slug = gerarSlug(dados.titulo)
    }

    return {
      sucesso: true,
      mensagem: 'Notícia atualizada com sucesso!'
    }
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error)
    return {
      sucesso: false,
      mensagem: 'Erro interno do servidor. Tente novamente mais tarde.'
    }
  }
}

export async function excluirNoticia(noticiaId: string): Promise<{
  sucesso: boolean
  mensagem: string
}> {
  try {
    const index = noticias.findIndex(n => n.id === noticiaId)
    
    if (index === -1) {
      return {
        sucesso: false,
        mensagem: 'Notícia não encontrada'
      }
    }

    noticias.splice(index, 1)

    return {
      sucesso: true,
      mensagem: 'Notícia excluída com sucesso!'
    }
  } catch (error) {
    console.error('Erro ao excluir notícia:', error)
    return {
      sucesso: false,
      mensagem: 'Erro interno do servidor. Tente novamente mais tarde.'
    }
  }
}

export function obterNoticias(filtros?: {
  status?: string
  categoria?: string
  busca?: string
  limite?: number
  pagina?: number
}): { noticias: NoticiaData[], total: number } {
  let resultado = [...noticias]

  // Aplicar filtros
  if (filtros?.status) {
    resultado = resultado.filter(n => n.status === filtros.status)
  }

  if (filtros?.categoria) {
    resultado = resultado.filter(n => n.categoria === filtros.categoria)
  }

  if (filtros?.busca) {
    const termo = filtros.busca.toLowerCase()
    resultado = resultado.filter(n => 
      n.titulo.toLowerCase().includes(termo) ||
      n.conteudo.toLowerCase().includes(termo) ||
      n.categoria.toLowerCase().includes(termo)
    )
  }

  // Ordenar por data de publicação (mais recentes primeiro)
  resultado.sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())

  const total = resultado.length

  // Paginação
  if (filtros?.limite && filtros?.pagina) {
    const inicio = (filtros.pagina - 1) * filtros.limite
    resultado = resultado.slice(inicio, inicio + filtros.limite)
  }

  return { noticias: resultado, total }
}

export function obterNoticiaPorSlug(slug: string): NoticiaData | null {
  const noticia = noticias.find(n => n.slug === slug && n.status === 'publicada')
  
  if (noticia) {
    // Incrementar visualizações
    noticia.visualizacoes++
  }
  
  return noticia || null
}

export function obterNoticiaPorId(id: string): NoticiaData | null {
  return noticias.find(n => n.id === id) || null
}

export function obterNoticiasRecentes(limite: number = 5): NoticiaData[] {
  return noticias
    .filter(n => n.status === 'publicada')
    .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
    .slice(0, limite)
}

export function obterNoticiasRelacionadas(noticiaId: string, limite: number = 3): NoticiaData[] {
  const noticia = noticias.find(n => n.id === noticiaId)
  
  if (!noticia) return []

  return noticias
    .filter(n => 
      n.id !== noticiaId && 
      n.status === 'publicada' && 
      n.categoria === noticia.categoria
    )
    .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
    .slice(0, limite)
}

export function obterCategorias(): string[] {
  const categorias = [...new Set(noticias.map(n => n.categoria))]
  return categorias.sort()
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
  const noticiasPublicadas = noticias.filter(n => n.status === 'publicada').length

  return {
    candidatosAtivos,
    candidatosPendentes: candidatos.filter(c => c.status === 'pendente').length,
    empresasAprovadas,
    empresasPendentes,
    empresasRejeitadas: empresas.filter(e => e.status === 'rejeitada').length,
    notificacoesNaoLidas,
    totalCandidatos: candidatos.length,
    totalEmpresas: empresas.length,
    noticiasPublicadas,
    totalNoticias: noticias.length
  }
}

// Função para resetar dados (apenas para desenvolvimento)
export function resetarDados(): void {
  candidatos = []
  empresas = []
  notificacoesAdmin = []
  noticias = []
  console.log('Dados resetados')
}

// Exportar dados atuais (para debug)
export function exportarDados() {
  return {
    candidatos,
    empresas,
    notificacoesAdmin,
    noticias,
    estatisticas: obterEstatisticas()
  }
}