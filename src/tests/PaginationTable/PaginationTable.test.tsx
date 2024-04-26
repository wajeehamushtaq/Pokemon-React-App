import { render, screen, fireEvent } from '@testing-library/react'
import PaginationTable from 'components/PaginationTable'
import { ColumnDefinition } from '../../types'

const columns: ColumnDefinition[] = [
  {
    accessorKey: 'name',
    Header: 'Name',
  },
]

const data = [
  { id: 1, name: 'Metapod', url: 'some/url' },
  { id: 2, name: 'Bulbasaur', url: 'some/other/url' },
]

describe('PaginationTable Component', () => {
  test('renders table with provided data', () => {
    const count = 2
    const fetchData = jest.fn()
    const page = 0

    render(
      <PaginationTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
        handleRedirection={() => {}}
      />
    )

    expect(screen.getByText('Metapod')).toBeInTheDocument()
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
  })

  test('redirects when clicking on Pokémon name', () => {
    const count = 2
    const fetchData = jest.fn()
    const page = 0
    const handleRedirection = jest.fn()

    render(
      <PaginationTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
        handleRedirection={handleRedirection}
      />
    )

    fireEvent.click(screen.getByText('Metapod')) 

    expect(handleRedirection).toHaveBeenCalledWith('some/url')
  })

})
