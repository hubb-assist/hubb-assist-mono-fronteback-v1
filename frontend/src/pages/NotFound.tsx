import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo HUBB */}
        <div className="mb-8">
          <img 
            src="/assets/images/logo_hubb_assisit.png" 
            alt="HUBB Assist" 
            className="h-16 mx-auto"
          />
        </div>

        {/* Erro 404 */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-gray-300 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Página não encontrada
          </h2>
          <p className="text-gray-500">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 bg-[#2D113F] hover:bg-[#2D113F]/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Home size={18} />
            Ir para página inicial
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar à página anterior
          </button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Se você acredita que isso é um erro, entre em contato com o suporte.</p>
        </div>
      </div>
    </div>
  )
}