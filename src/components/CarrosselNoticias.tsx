"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react'
import { obterNoticiasRecentes, type NoticiaData } from '@/lib/backend-simulation'

interface CarrosselNoticiasProps {
  onNoticiaClick?: (noticia: NoticiaData) => void
}

export function CarrosselNoticias({ onNoticiaClick }: CarrosselNoticiasProps) {
  const [noticias, setNoticias] = useState<NoticiaData[]>([])
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    // Carregar as 5 notícias mais recentes
    const noticiasRecentes = obterNoticiasRecentes(5)
    setNoticias(noticiasRecentes)
  }, [])

  useEffect(() => {
    if (!isAutoPlay || noticias.length === 0) return

    const interval = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % noticias.length)
    }, 5000) // Troca a cada 5 segundos

    return () => clearInterval(interval)
  }, [isAutoPlay, noticias.length])

  const proximaNoticia = () => {
    setIndiceAtual((prev) => (prev + 1) % noticias.length)
    setIsAutoPlay(false) // Parar autoplay quando usuário navegar manualmente
  }

  const noticiaAnterior = () => {
    setIndiceAtual((prev) => (prev - 1 + noticias.length) % noticias.length)
    setIsAutoPlay(false) // Parar autoplay quando usuário navegar manualmente
  }

  const irParaNoticia = (indice: number) => {
    setIndiceAtual(indice)
    setIsAutoPlay(false)
  }

  const handleNoticiaClick = (noticia: NoticiaData) => {
    if (onNoticiaClick) {
      onNoticiaClick(noticia)
    }
  }

  if (noticias.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">Nenhuma notícia disponível</p>
      </div>
    )
  }

  const noticiaAtual = noticias[indiceAtual]

  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${noticiaAtual.imagemDestaque})` }}
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Botões de navegação */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          onClick={noticiaAnterior}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          onClick={proximaNoticia}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Conteúdo da notícia */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-3">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                {noticiaAtual.categoria}
              </Badge>
              <div className="flex items-center text-sm text-gray-200">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(noticiaAtual.dataPublicacao).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center text-sm text-gray-200">
                <Eye className="w-4 h-4 mr-1" />
                {noticiaAtual.visualizacoes} visualizações
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              {noticiaAtual.titulo}
            </h2>
            
            {noticiaAtual.subtitulo && (
              <p className="text-lg text-gray-200 mb-4">
                {noticiaAtual.subtitulo}
              </p>
            )}
            
            <p className="text-gray-300 mb-4 line-clamp-2">
              {noticiaAtual.resumo}
            </p>
            
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleNoticiaClick(noticiaAtual)}
            >
              Ler Notícia Completa
            </Button>
          </div>
        </div>
      </div>

      {/* Indicadores de posição */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {noticias.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === indiceAtual 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => irParaNoticia(index)}
          />
        ))}
      </div>

      {/* Informações adicionais */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Por {noticiaAtual.autor}</span>
          <span>{indiceAtual + 1} de {noticias.length}</span>
        </div>
      </div>
    </div>
  )
}