import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

Index.getInitialProps = async () => {
  const response = await axios.get(
    'https://neitaloengdev.pythonanywhere.com/alunos/'
  )
  return { alunos: response.data }
}

export default function Index({ alunos }) {
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [alunosList, setAlunosList] = useState(alunos)

  const handleDelete = async id => {
    if (confirmDelete === id) {
      try {
        const response = await axios.delete(
          `https://neitaloengdev.pythonanywhere.com/alunos/${id}/`
        )
        console.log(response.data)

        // Update the students list state with the updated list of students
        const updatedResponse = await axios.get(
          'https://neitaloengdev.pythonanywhere.com/alunos/'
        )
        setAlunosList(updatedResponse.data)
      } catch (error) {
        console.log(error)
      }
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg transform skew-y-0 rotate-6 sm:skew-y-0 sm:-rotate-1 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-5">Alunos</h1>
          <div className="mb-5">
            <Link href="/add">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Adicionar Aluno
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">RG</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {alunosList.map(aluno => (
                  <tr key={aluno.id} className="hover:bg-gray-100">
                    <td className="px-4 py-3">{aluno.id}</td>
                    <td className="px-4 py-3">{aluno.nome}</td>
                    <td className="px-4 py-3">{aluno.rg}</td>
                    <td className="px-4 py-3">
                      <Link
                        className="text-blue-500 hover:text-blue-700"
                        href={`/update/${aluno.id}`}
                      >
                        Editar
                      </Link>{' '}
                      |
                      {confirmDelete === aluno.id ? (
                        <>
                          <span>Deseja realmente deletar?</span>{' '}
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleDelete(aluno.id)}
                          >
                            Sim
                          </button>{' '}
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Não
                          </button>
                        </>
                      ) : (
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setConfirmDelete(aluno.id)}
                        >
                          Deletar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
