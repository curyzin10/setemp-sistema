"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Building2, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react'
import { CIDADES_AMAZONAS, AREAS_ATUACAO, NIVEIS_ESCOLARIDADE } from '@/lib/constants'
import { 
  validarFormularioCandidato, 
  validarFormularioEmpresa,
  validarArquivoPDF,
  formatarCPF,
  formatarCNPJ,
  formatarTelefone,
  formatarCEP
} from '@/lib/validations'
import { cadastrarCandidato, cadastrarEmpresa } from '@/lib/backend-simulation'

// Formulário de Cadastro de Candidato
export function CadastroCandidato({ onClose }: { onClose: () => void }) {
  const [etapa, setEtapa] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    // Endereço
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    // Profissional
    escolaridade: '',
    areasInteresse: [] as string[],
    experiencias: [] as any[],
    curriculo: null as File | null
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erros quando o usuário começar a digitar
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const adicionarExperiencia = () => {
    const novaExperiencia = {
      empresa: '',
      cargo: '',
      dataInicio: '',
      dataFim: '',
      descricao: '',
      ativo: false
    }
    setFormData(prev => ({
      ...prev,
      experiencias: [...prev.experiencias, novaExperiencia]
    }))
  }

  const removerExperiencia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiencias: prev.experiencias.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setErrors([])

    try {
      // Verificar se os termos foram aceitos
      const termosCheckbox = document.getElementById('termos') as HTMLInputElement
      if (!termosCheckbox?.checked) {
        setErrors(['Você deve aceitar os termos de uso e política de privacidade'])
        setLoading(false)
        return
      }

      // Validar formulário
      const validacao = validarFormularioCandidato(formData)
      
      if (!validacao.isValid) {
        setErrors(validacao.errors)
        setLoading(false)
        return
      }

      // Validar currículo se fornecido
      if (formData.curriculo) {
        const validacaoCurriculo = validarArquivoPDF(formData.curriculo)
        if (!validacaoCurriculo.isValid) {
          setErrors(validacaoCurriculo.errors)
          setLoading(false)
          return
        }
      }

      // Preparar dados para envio
      const dadosCandidato = {
        nome: formData.nome,
        cpf: formData.cpf,
        dataNascimento: formData.dataNascimento,
        telefone: formData.telefone,
        email: formData.email,
        senha: formData.senha,
        endereco: {
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          cep: formData.cep
        },
        escolaridade: formData.escolaridade,
        areasInteresse: formData.areasInteresse,
        experiencias: formData.experiencias,
        curriculo: formData.curriculo
      }

      // Enviar dados
      const resultado = await cadastrarCandidato(dadosCandidato)

      if (resultado.sucesso) {
        alert(`✅ ${resultado.mensagem}`)
        onClose()
      } else {
        setErrors([resultado.mensagem])
      }
    } catch (error) {
      console.error('Erro ao cadastrar candidato:', error)
      setErrors(['Erro interno do sistema. Tente novamente mais tarde.'])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validacao = validarArquivoPDF(file)
      if (validacao.isValid) {
        handleInputChange('curriculo', file)
        setErrors([])
      } else {
        setErrors(validacao.errors)
      }
    }
  }

  const proximaEtapa = () => {
    // Validar etapa atual antes de avançar
    let etapaValida = true
    const errorsEtapa: string[] = []

    if (etapa === 1) {
      if (!formData.nome.trim()) errorsEtapa.push('Nome é obrigatório')
      if (!formData.cpf.trim()) errorsEtapa.push('CPF é obrigatório')
      if (!formData.email.trim()) errorsEtapa.push('E-mail é obrigatório')
      if (!formData.telefone.trim()) errorsEtapa.push('Telefone é obrigatório')
      if (!formData.dataNascimento) errorsEtapa.push('Data de nascimento é obrigatória')
      if (!formData.senha) errorsEtapa.push('Senha é obrigatória')
    } else if (etapa === 2) {
      if (!formData.cep.trim()) errorsEtapa.push('CEP é obrigatório')
      if (!formData.cidade.trim()) errorsEtapa.push('Cidade é obrigatória')
      if (!formData.rua.trim()) errorsEtapa.push('Rua é obrigatória')
      if (!formData.numero.trim()) errorsEtapa.push('Número é obrigatório')
      if (!formData.bairro.trim()) errorsEtapa.push('Bairro é obrigatório')
    } else if (etapa === 3) {
      if (!formData.escolaridade) errorsEtapa.push('Escolaridade é obrigatória')
      if (formData.areasInteresse.length === 0) errorsEtapa.push('Selecione pelo menos uma área de interesse')
    }

    if (errorsEtapa.length > 0) {
      setErrors(errorsEtapa)
      etapaValida = false
    } else {
      setErrors([])
    }

    if (etapaValida) {
      setEtapa(Math.min(4, etapa + 1))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-2xl">
                  <User className="w-6 h-6 mr-2 text-blue-600" />
                  Cadastro de Candidato
                </CardTitle>
                <CardDescription>
                  Preencha seus dados para se cadastrar no sistema SETEMP
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onClose} disabled={loading}>
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
            
            {/* Indicador de Etapas */}
            <div className="flex items-center space-x-4 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    etapa >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {etapa > step ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && <div className={`w-12 h-1 ${etapa > step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Dados Pessoais</span>
              <span>Endereço</span>
              <span>Profissional</span>
              <span>Finalizar</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Exibir erros */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Corrija os seguintes erros:</h4>
                    <ul className="list-disc list-inside text-red-700 mt-1 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 1: Dados Pessoais */}
            {etapa === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nome Completo *</label>
                    <Input
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Seu nome completo"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CPF *</label>
                    <Input
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', formatarCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Data de Nascimento *</label>
                    <Input
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone *</label>
                    <Input
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', formatarTelefone(e.target.value))}
                      placeholder="(92) 99999-9999"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Senha *</label>
                    <Input
                      type="password"
                      value={formData.senha}
                      onChange={(e) => handleInputChange('senha', e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      disabled={loading}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Confirmar Senha *</label>
                    <Input
                      type="password"
                      value={formData.confirmarSenha}
                      onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                      placeholder="Digite a senha novamente"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 2: Endereço */}
            {etapa === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">CEP *</label>
                    <Input
                      value={formData.cep}
                      onChange={(e) => handleInputChange('cep', formatarCEP(e.target.value))}
                      placeholder="00000-000"
                      maxLength={9}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cidade *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Selecione a cidade</option>
                      {CIDADES_AMAZONAS.map(cidade => (
                        <option key={cidade} value={cidade}>{cidade}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rua *</label>
                    <Input
                      value={formData.rua}
                      onChange={(e) => handleInputChange('rua', e.target.value)}
                      placeholder="Nome da rua"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Número *</label>
                    <Input
                      value={formData.numero}
                      onChange={(e) => handleInputChange('numero', e.target.value)}
                      placeholder="123"
                      disabled={loading}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Bairro *</label>
                    <Input
                      value={formData.bairro}
                      onChange={(e) => handleInputChange('bairro', e.target.value)}
                      placeholder="Nome do bairro"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 3: Dados Profissionais */}
            {etapa === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Dados Profissionais</h3>
                
                <div>
                  <label className="text-sm font-medium">Escolaridade *</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.escolaridade}
                    onChange={(e) => handleInputChange('escolaridade', e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Selecione sua escolaridade</option>
                    {NIVEIS_ESCOLARIDADE.map(nivel => (
                      <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Áreas de Interesse *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border p-3 rounded-md">
                    {AREAS_ATUACAO.map(area => (
                      <label key={area} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.areasInteresse.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('areasInteresse', [...formData.areasInteresse, area])
                            } else {
                              handleInputChange('areasInteresse', formData.areasInteresse.filter(a => a !== area))
                            }
                          }}
                          disabled={loading}
                        />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium">Experiências Profissionais (opcional)</label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={adicionarExperiencia}
                      disabled={loading}
                    >
                      + Adicionar Experiência
                    </Button>
                  </div>
                  
                  {formData.experiencias.map((exp, index) => (
                    <Card key={index} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Experiência {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removerExperiencia(index)}
                            disabled={loading}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Nome da empresa"
                            value={exp.empresa}
                            onChange={(e) => {
                              const newExp = [...formData.experiencias]
                              newExp[index].empresa = e.target.value
                              handleInputChange('experiencias', newExp)
                            }}
                            disabled={loading}
                          />
                          <Input
                            placeholder="Cargo"
                            value={exp.cargo}
                            onChange={(e) => {
                              const newExp = [...formData.experiencias]
                              newExp[index].cargo = e.target.value
                              handleInputChange('experiencias', newExp)
                            }}
                            disabled={loading}
                          />
                          <Input
                            type="date"
                            placeholder="Data início"
                            value={exp.dataInicio}
                            onChange={(e) => {
                              const newExp = [...formData.experiencias]
                              newExp[index].dataInicio = e.target.value
                              handleInputChange('experiencias', newExp)
                            }}
                            disabled={loading}
                          />
                          <Input
                            type="date"
                            placeholder="Data fim"
                            value={exp.dataFim}
                            onChange={(e) => {
                              const newExp = [...formData.experiencias]
                              newExp[index].dataFim = e.target.value
                              handleInputChange('experiencias', newExp)
                            }}
                            disabled={loading}
                          />
                        </div>
                        <textarea
                          className="w-full mt-3 p-2 border border-gray-300 rounded-md"
                          rows={2}
                          placeholder="Descrição das atividades"
                          value={exp.descricao}
                          onChange={(e) => {
                            const newExp = [...formData.experiencias]
                            newExp[index].descricao = e.target.value
                            handleInputChange('experiencias', newExp)
                          }}
                          disabled={loading}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <label className="text-sm font-medium">Upload do Currículo (PDF) - Opcional</label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.curriculo ? (
                        <span className="text-green-600 font-medium">
                          ✓ {formData.curriculo.name}
                        </span>
                      ) : (
                        'Clique para selecionar seu currículo (PDF, máx. 5MB)'
                      )}
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="curriculo-upload"
                      disabled={loading}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('curriculo-upload')?.click()}
                      disabled={loading}
                    >
                      {formData.curriculo ? 'Alterar Arquivo' : 'Selecionar Arquivo'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 4: Finalizar */}
            {etapa === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Revisar e Finalizar</h3>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Resumo do Cadastro</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nome:</strong> {formData.nome}</p>
                    <p><strong>CPF:</strong> {formData.cpf}</p>
                    <p><strong>E-mail:</strong> {formData.email}</p>
                    <p><strong>Telefone:</strong> {formData.telefone}</p>
                    <p><strong>Cidade:</strong> {formData.cidade}</p>
                    <p><strong>Escolaridade:</strong> {NIVEIS_ESCOLARIDADE.find(n => n.value === formData.escolaridade)?.label}</p>
                    <p><strong>Áreas de Interesse:</strong> {formData.areasInteresse.join(', ')}</p>
                    <p><strong>Experiências:</strong> {formData.experiencias.length} cadastrada(s)</p>
                    <p><strong>Currículo:</strong> {formData.curriculo ? 'Anexado' : 'Não anexado'}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-yellow-800">Importante:</p>
                      <ul className="list-disc list-inside text-yellow-700 mt-1 space-y-1">
                        <li>Verifique se todos os dados estão corretos</li>
                        <li>Você receberá um e-mail de confirmação</li>
                        <li>Clique no link do e-mail para ativar sua conta</li>
                        <li>Mantenha seus dados sempre atualizados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="termos" className="rounded" required />
                  <label htmlFor="termos" className="text-sm">
                    Aceito os <a href="#" className="text-blue-600 hover:underline">termos de uso</a> e 
                    <a href="#" className="text-blue-600 hover:underline ml-1">política de privacidade</a> *
                  </label>
                </div>
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setEtapa(Math.max(1, etapa - 1))}
                disabled={etapa === 1 || loading}
              >
                Anterior
              </Button>
              
              {etapa < 4 ? (
                <Button
                  onClick={proximaEtapa}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    'Finalizar Cadastro'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Formulário de Cadastro de Empresa
export function CadastroEmpresa({ onClose }: { onClose: () => void }) {
  const [etapa, setEtapa] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [formData, setFormData] = useState({
    // Dados da empresa
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    areaAtuacao: '',
    porte: '',
    // Endereço
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    // Contato
    telefone: '',
    email: '',
    site: '',
    // Responsável RH
    nomeResponsavel: '',
    cargoResponsavel: '',
    emailResponsavel: '',
    telefoneResponsavel: '',
    // Acesso
    senha: '',
    confirmarSenha: ''
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erros quando o usuário começar a digitar
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setErrors([])

    try {
      // Verificar se os termos foram aceitos
      const termosCheckbox = document.getElementById('termos-empresa') as HTMLInputElement
      if (!termosCheckbox?.checked) {
        setErrors(['Você deve aceitar os termos de uso e política de privacidade'])
        setLoading(false)
        return
      }

      // Validar formulário
      const validacao = validarFormularioEmpresa(formData)
      
      if (!validacao.isValid) {
        setErrors(validacao.errors)
        setLoading(false)
        return
      }

      // Preparar dados para envio
      const dadosEmpresa = {
        cnpj: formData.cnpj,
        razaoSocial: formData.razaoSocial,
        nomeFantasia: formData.nomeFantasia,
        areaAtuacao: formData.areaAtuacao,
        porte: formData.porte,
        endereco: {
          rua: formData.rua,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          cep: formData.cep
        },
        contato: {
          telefone: formData.telefone,
          email: formData.email,
          site: formData.site
        },
        responsavelRH: {
          nome: formData.nomeResponsavel,
          cargo: formData.cargoResponsavel,
          email: formData.emailResponsavel,
          telefone: formData.telefoneResponsavel
        },
        senha: formData.senha
      }

      // Enviar dados
      const resultado = await cadastrarEmpresa(dadosEmpresa)

      if (resultado.sucesso) {
        alert(`✅ ${resultado.mensagem}`)
        onClose()
      } else {
        setErrors([resultado.mensagem])
      }
    } catch (error) {
      console.error('Erro ao cadastrar empresa:', error)
      setErrors(['Erro interno do sistema. Tente novamente mais tarde.'])
    } finally {
      setLoading(false)
    }
  }

  const proximaEtapa = () => {
    // Validar etapa atual antes de avançar
    let etapaValida = true
    const errorsEtapa: string[] = []

    if (etapa === 1) {
      if (!formData.cnpj.trim()) errorsEtapa.push('CNPJ é obrigatório')
      if (!formData.razaoSocial.trim()) errorsEtapa.push('Razão social é obrigatória')
      if (!formData.areaAtuacao) errorsEtapa.push('Área de atuação é obrigatória')
      if (!formData.porte) errorsEtapa.push('Porte da empresa é obrigatório')
    } else if (etapa === 2) {
      if (!formData.cep.trim()) errorsEtapa.push('CEP é obrigatório')
      if (!formData.cidade.trim()) errorsEtapa.push('Cidade é obrigatória')
      if (!formData.rua.trim()) errorsEtapa.push('Rua é obrigatória')
      if (!formData.numero.trim()) errorsEtapa.push('Número é obrigatório')
      if (!formData.bairro.trim()) errorsEtapa.push('Bairro é obrigatório')
      if (!formData.telefone.trim()) errorsEtapa.push('Telefone é obrigatório')
      if (!formData.email.trim()) errorsEtapa.push('E-mail é obrigatório')
    } else if (etapa === 3) {
      if (!formData.nomeResponsavel.trim()) errorsEtapa.push('Nome do responsável é obrigatório')
      if (!formData.cargoResponsavel.trim()) errorsEtapa.push('Cargo do responsável é obrigatório')
      if (!formData.emailResponsavel.trim()) errorsEtapa.push('E-mail do responsável é obrigatório')
      if (!formData.telefoneResponsavel.trim()) errorsEtapa.push('Telefone do responsável é obrigatório')
      if (!formData.senha) errorsEtapa.push('Senha é obrigatória')
    }

    if (errorsEtapa.length > 0) {
      setErrors(errorsEtapa)
      etapaValida = false
    } else {
      setErrors([])
    }

    if (etapaValida) {
      setEtapa(Math.min(4, etapa + 1))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-2xl">
                  <Building2 className="w-6 h-6 mr-2 text-green-600" />
                  Cadastro de Empresa
                </CardTitle>
                <CardDescription>
                  Cadastre sua empresa para publicar vagas no sistema SETEMP
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onClose} disabled={loading}>
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
            
            {/* Indicador de Etapas */}
            <div className="flex items-center space-x-4 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    etapa >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {etapa > step ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && <div className={`w-12 h-1 ${etapa > step ? 'bg-green-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Dados da Empresa</span>
              <span>Endereço</span>
              <span>Responsável</span>
              <span>Finalizar</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Exibir erros */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Corrija os seguintes erros:</h4>
                    <ul className="list-disc list-inside text-red-700 mt-1 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 1: Dados da Empresa */}
            {etapa === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados da Empresa</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">CNPJ *</label>
                    <Input
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', formatarCNPJ(e.target.value))}
                      placeholder="00.000.000/0001-00"
                      maxLength={18}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Razão Social *</label>
                    <Input
                      value={formData.razaoSocial}
                      onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                      placeholder="Razão social da empresa"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nome Fantasia</label>
                    <Input
                      value={formData.nomeFantasia}
                      onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                      placeholder="Nome fantasia"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Área de Atuação *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.areaAtuacao}
                      onChange={(e) => handleInputChange('areaAtuacao', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Selecione a área</option>
                      {AREAS_ATUACAO.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Porte da Empresa *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.porte}
                      onChange={(e) => handleInputChange('porte', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Selecione o porte</option>
                      <option value="micro">Microempresa</option>
                      <option value="pequena">Pequena</option>
                      <option value="media">Média</option>
                      <option value="grande">Grande</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Site (opcional)</label>
                    <Input
                      value={formData.site}
                      onChange={(e) => handleInputChange('site', e.target.value)}
                      placeholder="www.empresa.com.br"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 2: Endereço */}
            {etapa === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço da Empresa</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">CEP *</label>
                    <Input
                      value={formData.cep}
                      onChange={(e) => handleInputChange('cep', formatarCEP(e.target.value))}
                      placeholder="00000-000"
                      maxLength={9}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cidade *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Selecione a cidade</option>
                      {CIDADES_AMAZONAS.map(cidade => (
                        <option key={cidade} value={cidade}>{cidade}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rua *</label>
                    <Input
                      value={formData.rua}
                      onChange={(e) => handleInputChange('rua', e.target.value)}
                      placeholder="Nome da rua"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Número *</label>
                    <Input
                      value={formData.numero}
                      onChange={(e) => handleInputChange('numero', e.target.value)}
                      placeholder="123"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bairro *</label>
                    <Input
                      value={formData.bairro}
                      onChange={(e) => handleInputChange('bairro', e.target.value)}
                      placeholder="Nome do bairro"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone *</label>
                    <Input
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', formatarTelefone(e.target.value))}
                      placeholder="(92) 3000-0000"
                      disabled={loading}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">E-mail Corporativo *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contato@empresa.com.br"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 3: Responsável RH */}
            {etapa === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Responsável pelo RH</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nome Completo *</label>
                    <Input
                      value={formData.nomeResponsavel}
                      onChange={(e) => handleInputChange('nomeResponsavel', e.target.value)}
                      placeholder="Nome do responsável"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cargo *</label>
                    <Input
                      value={formData.cargoResponsavel}
                      onChange={(e) => handleInputChange('cargoResponsavel', e.target.value)}
                      placeholder="Ex: Gerente de RH"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail *</label>
                    <Input
                      type="email"
                      value={formData.emailResponsavel}
                      onChange={(e) => handleInputChange('emailResponsavel', e.target.value)}
                      placeholder="rh@empresa.com.br"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone *</label>
                    <Input
                      value={formData.telefoneResponsavel}
                      onChange={(e) => handleInputChange('telefoneResponsavel', formatarTelefone(e.target.value))}
                      placeholder="(92) 99999-9999"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Senha de Acesso *</label>
                    <Input
                      type="password"
                      value={formData.senha}
                      onChange={(e) => handleInputChange('senha', e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Confirmar Senha *</label>
                    <Input
                      type="password"
                      value={formData.confirmarSenha}
                      onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                      placeholder="Confirme a senha"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 4: Finalizar */}
            {etapa === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Revisar e Finalizar</h3>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Resumo do Cadastro</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>CNPJ:</strong> {formData.cnpj}</p>
                    <p><strong>Razão Social:</strong> {formData.razaoSocial}</p>
                    <p><strong>Nome Fantasia:</strong> {formData.nomeFantasia || 'Não informado'}</p>
                    <p><strong>Área de Atuação:</strong> {formData.areaAtuacao}</p>
                    <p><strong>Porte:</strong> {formData.porte}</p>
                    <p><strong>Cidade:</strong> {formData.cidade}</p>
                    <p><strong>E-mail:</strong> {formData.email}</p>
                    <p><strong>Responsável:</strong> {formData.nomeResponsavel} - {formData.cargoResponsavel}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-yellow-800">Processo de Aprovação:</p>
                      <ul className="list-disc list-inside text-yellow-700 mt-1 space-y-1">
                        <li>Sua empresa será analisada pela equipe SETEMP</li>
                        <li>O processo pode levar até 3 dias úteis</li>
                        <li>Você receberá um e-mail com o resultado</li>
                        <li>Após aprovação, poderá publicar vagas</li>
                        <li>Mantenha os dados sempre atualizados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="termos-empresa" className="rounded" required />
                  <label htmlFor="termos-empresa" className="text-sm">
                    Aceito os <a href="#" className="text-green-600 hover:underline">termos de uso</a> e 
                    <a href="#" className="text-green-600 hover:underline ml-1">política de privacidade</a> *
                  </label>
                </div>
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setEtapa(Math.max(1, etapa - 1))}
                disabled={etapa === 1 || loading}
              >
                Anterior
              </Button>
              
              {etapa < 4 ? (
                <Button
                  onClick={proximaEtapa}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    'Finalizar Cadastro'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}