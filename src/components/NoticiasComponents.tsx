"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Calendar, 
  Eye, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X
} from 'lucide-react'
import { 
  obterNoticias, 
  obterNoticiaPorSlug, 
  obterNoticiasRelacionadas,
  obterCategorias,
  type NoticiaData 
} from '@/lib/backend-simulation'

interface NoticiasPageProps {
  onVoltar?: () => void
}

export function NoticiasPage({ onVoltar }: NoticiasPageProps) {
  const [noticias, setNoticias] = useState<NoticiaData[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [categorias, setCategorias] = useState<string[]>([])
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  
  const noticiasPorPagina = 6

  useEffect(() => {
    carregarCategorias()
  }, [])

  useEffect(() => {
    carregarNoticias()
  }, [paginaAtual, busca, categoriaFiltro])

  const carregarCategorias = () => {
    const cats = obterCategorias()
    setCategorias(cats)
  }

  const carregarNoticias = () => {
    setLoading(true)
    
    const resultado = obterNoticias({
      status: 'publicada',
      busca: busca.trim() || undefined,
      categoria: categoriaFiltro || undefined,
      limite: noticiasPorPagina,
      pagina: paginaAtual
    })
    
    setNoticias(resultado.noticias)
    setTotal(resultado.total)
    setLoading(false)
  }

  const handleBusca = (termo: string) => {
    setBusca(termo)
    setPaginaAtual(1)
  }

  const handleFiltroCategoria = (categoria: string) => {
    setCategoriaFiltro(categoria)
    setPaginaAtual(1)
  }

  const limparFiltros = () => {
    setBusca('')
    setCategoriaFiltro('')
    setPaginaAtual(1)
  }

  const totalPaginas = Math.ceil(total / noticiasPorPagina)

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1)
    }
  }

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {onVoltar && (
              <Button variant="outline" onClick={onVoltar} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notícias SETEMP</h1>
              <p className="text-lg text-gray-600">
                Fique por dentro das últimas novidades e comunicados
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Buscar Notícias
              </CardTitle>
              <Button
                variant="outline"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                {mostrarFiltros ? <X className="w-4 h-4 ml-2" /> : null}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Busca principal */}
            <div className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar por título, conteúdo ou categoria..."
                  value={busca}
                  onChange={(e) => handleBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtros avançados */}
            {mostrarFiltros && (
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={categoriaFiltro === '' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFiltroCategoria('')}
                    >
                      Todas
                    </Button>
                    {categorias.map((categoria) => (
                      <Button
                        key={categoria}
                        variant={categoriaFiltro === categoria ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFiltroCategoria(categoria)}
                      >
                        {categoria}
                      </Button>
                    ))}
                  </div>
                </div>

                {(busca || categoriaFiltro) && (
                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={limparFiltros} className="text-red-600">
                      <X className="w-4 h-4 mr-1" />
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Carregando...' : `${total} notícia${total !== 1 ? 's' : ''} encontrada${total !== 1 ? 's' : ''}`}
            {busca && ` para "${busca}"`}
            {categoriaFiltro && ` na categoria "${categoriaFiltro}"`}
          </p>
        </div>

        {/* Grid de Notícias */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
                  <div className="h-3 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : noticias.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma notícia encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros de busca ou remover alguns termos
              </p>
              {(busca || categoriaFiltro) && (
                <Button onClick={limparFiltros}>
                  Limpar Filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              onClick={paginaAnterior}
              disabled={paginaAtual === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            <div className="flex items-center space-x-2">
              {[...Array(totalPaginas)].map((_, index) => {
                const pagina = index + 1
                const mostrarPagina = 
                  pagina === 1 || 
                  pagina === totalPaginas || 
                  (pagina >= paginaAtual - 1 && pagina <= paginaAtual + 1)
                
                if (!mostrarPagina) {
                  if (pagina === paginaAtual - 2 || pagina === paginaAtual + 2) {
                    return <span key={pagina} className="text-gray-400">...</span>
                  }
                  return null
                }
                
                return (
                  <Button
                    key={pagina}
                    variant={pagina === paginaAtual ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPaginaAtual(pagina)}
                  >
                    {pagina}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={proximaPagina}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente do Card de Notícia
function NoticiaCard({ noticia }: { noticia: NoticiaData }) {
  const handleClick = () => {
    // Em uma implementação real, isso navegaria para a página da notícia
    alert(`Navegando para: ${noticia.slug}`)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <div 
        className="h-48 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${noticia.imagemDestaque})` }}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {noticia.categoria}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {noticia.titulo}
        </h3>
        
        {noticia.subtitulo && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-1">
            {noticia.subtitulo}
          </p>
        )}
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {noticia.resumo}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="w-4 h-4 mr-1" />
            {noticia.visualizacoes} visualizações
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Ler mais
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente da Página Individual da Notícia
interface NoticiaIndividualProps {
  slug: string
  onVoltar?: () => void
}

export function NoticiaIndividual({ slug, onVoltar }: NoticiaIndividualProps) {
  const [noticia, setNoticia] = useState<NoticiaData | null>(null)
  const [noticiasRelacionadas, setNoticiasRelacionadas] = useState<NoticiaData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarNoticia()
  }, [slug])

  const carregarNoticia = () => {
    setLoading(true)
    
    const noticiaEncontrada = obterNoticiaPorSlug(slug)
    setNoticia(noticiaEncontrada)
    
    if (noticiaEncontrada) {
      const relacionadas = obterNoticiasRelacionadas(noticiaEncontrada.id!, 3)
      setNoticiasRelacionadas(relacionadas)
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4" />
            <div className="h-64 bg-gray-200 rounded mb-6" />
            <div className="h-6 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
          <p className="text-gray-600 mb-6">A notícia que você está procurando não existe ou foi removida.</p>
          {onVoltar && (
            <Button onClick={onVoltar}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Notícias
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão Voltar */}
        {onVoltar && (
          <Button variant="outline" onClick={onVoltar} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Notícias
          </Button>
        )}

        {/* Artigo Principal */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Imagem de destaque */}
          <div 
            className="h-64 md:h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${noticia.imagemDestaque})` }}
          />
          
          {/* Conteúdo */}
          <div className="p-8">
            {/* Meta informações */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Badge className="bg-blue-600">
                  {noticia.categoria}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="w-4 h-4 mr-1" />
                  {noticia.visualizacoes} visualizações
                </div>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {noticia.titulo}
            </h1>

            {/* Subtítulo */}
            {noticia.subtitulo && (
              <p className="text-xl text-gray-600 mb-6">
                {noticia.subtitulo}
              </p>
            )}

            {/* Autor */}
            <p className="text-sm text-gray-500 mb-8">
              Por <strong>{noticia.autor}</strong>
            </p>

            {/* Conteúdo */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />
          </div>
        </article>

        {/* Notícias Relacionadas */}
        {noticiasRelacionadas.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notícias Relacionadas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {noticiasRelacionadas.map((noticiaRelacionada) => (
                <NoticiaCard key={noticiaRelacionada.id} noticia={noticiaRelacionada} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}