import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import Index from '../pages/index'

jest.mock('axios')

describe('Index', () => {
  const alunos = [
    { id: 1, nome: 'João', rg: '123456' },
    { id: 2, nome: 'Maria', rg: '789012' }
  ]

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { results: alunos } })
  })

  it('should render the alunos table', async () => {
    render(<Index />)
    const alunoRows = await screen.findAllByRole('row')
    expect(alunoRows).toHaveLength(alunos.length + 1) // header row + aluno rows
  })

  it('should show confirmation dialog when deleting an aluno', async () => {
    render(<Index />)
    const deleteButton = await screen.findByText('Deletar')
    fireEvent.click(deleteButton)
    const confirmButton = await screen.findByText('Sim')
    expect(confirmButton).toBeInTheDocument()
  })

  it('should delete an aluno', async () => {
    axios.delete.mockResolvedValueOnce({ data: 'Aluno deletado com sucesso.' })
    render(<Index />)
    const deleteButton = await screen.findByText('Deletar')
    fireEvent.click(deleteButton)
    const confirmButton = await screen.findByText('Sim')
    fireEvent.click(confirmButton)
    expect(axios.delete).toHaveBeenCalledTimes(1)
    expect(axios.delete).toHaveBeenCalledWith(
      'https://neitaloengdev.pythonanywhere.com/alunos/1/'
    ) // assuming the first aluno is being deleted
  })
})
