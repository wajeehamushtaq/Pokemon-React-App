// PokemonLists component
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginationTable } from '../../components'
import { ColumnDefinition, PokemonsList } from 'types'
import { useFetchPokemonsQuery } from '../../api/index'
import './styles.css'

export default function PokemonLists () {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const {
    data: pokemonList,
    error,
    isLoading,
  } = useFetchPokemonsQuery<PokemonsList>(page)

  const handleRedirection = (url: string) => {
    navigate(`/pokemon/${url.split('/').splice(-2, 1)[0]}`)
  }

  const columns: ColumnDefinition[] = [
    {
      accessorKey: 'name',
      Header: 'Pokemon Name',
    },
  ]

  const fetchData = (index: number) => {
    setPage(index * 20)
  }

  if (isLoading) return <div className='message'>Loading...</div>
  if (error) return <div className='message'>Error...</div>

  return (
    <div className='poke-container'>
      <div className='heading'>Pokemon React Application</div>

      <PaginationTable
        data={pokemonList?.results || []}
        columns={columns}
        count={pokemonList?.count || 0}
        fetchData={fetchData}
        page={page}
        handleRedirection={handleRedirection}
      />
    </div>
  )
}
