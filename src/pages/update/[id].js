import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Update = () => {
  const router = useRouter()
  const { id } = router.query
  const [aluno, setAluno] = useState({})
  const [nome, setNome] = useState('')
  const [rg, setRg] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const confirmed = window.confirm(
      'Tem certeza que deseja atualizar as informações desse aluno?'
    )

    if (!confirmed) {
      return
    }

    const res = await fetch(
      `https://neitaloengdev.pythonanywhere.com/alunos/${id}/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          nome,
          rg
        })
      }
    )

    const responseJson = await res.text()
    console.log(responseJson)

    if (res.ok) {
      router.push('/')
      alert('Aluno atualizado com sucesso!')
    } else {
      alert('Erro ao atualizar aluno!')
    }
  }

  useEffect(() => {
    async function fetchAluno() {
      const res = await fetch(
        `https://neitaloengdev.pythonanywhere.com/alunos/${id}/`
      )
      const data = await res.json()
      setAluno(data)
      setNome(data.nome)
      setRg(data.rg)
    }
    if (id) {
      fetchAluno()
    }
  }, [id])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Atualizar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="rg" className="block text-gray-700 font-bold mb-2">
            RG:
          </label>
          <input
            type="text"
            id="rg"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rg}
            onChange={e => setRg(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Update
