import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdicionarAluno = () => {
  const [nome, setNome] = useState('')
  const [rg, setRg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const adicionarAluno = async event => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const resposta = await axios.post(
        'https://neitaloengdev.pythonanywhere.com/alunos/',
        {
          nome: nome,
          rg: rg
        }
      )
      console.log(resposta.data)
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        router.push('/')
      }, 2000)
    } catch (erro) {
      console.error(erro)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-5">Adicionar Aluno</h1>
      {isSuccess ? (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Aluno adicionado com sucesso!</p>
          <p>Você será redirecionado para a lista de alunos em breve.</p>
        </div>
      ) : null}
      <form onSubmit={adicionarAluno} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={event => setNome(event.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rg" className="block text-gray-700 font-bold mb-2">
            RG:
          </label>
          <input
            type="text"
            id="rg"
            value={rg}
            onChange={event => setRg(event.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar'}
        </button>
        <Link className="ml-4 text-gray-600 hover:text-gray-900" href="/">
          Voltar para a lista de alunos
        </Link>
      </form>
    </div>
  )
}

export default AdicionarAluno
