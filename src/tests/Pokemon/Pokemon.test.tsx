import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { useFetchPokemonByIdQuery } from '../../api/index'
import Pokemon from 'pages/Pokemon'
import { PokemonQuery, PokemonType } from '../../types'

jest.mock('../../api/index')

describe('Pokemon Component', () => {
  test('renders back button', async () => {
    const mockPokemon: PokemonType = {
      name: 'Bulbasaur',
      weight: '69',
      height: '7',
      types: [{ type: { name: 'Grass' } }],
      sprites: { front_default: 'some/image/url' },
    }

    const mockData: PokemonQuery = {
      data: mockPokemon,
      isLoading: false,
      isError: false,
    }

    ;(useFetchPokemonByIdQuery as jest.Mock).mockReturnValue(mockData)

    const history = createMemoryHistory()
    render(
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Back')).toBeInTheDocument()
    })
  })

  test('clicking on back button navigates back to previous page', async () => {
    const mockPokemon: PokemonType = {
      name: 'Bulbasaur',
      weight: '69',
      height: '7',
      types: [{ type: { name: 'Grass' } }],
      sprites: { front_default: 'some/image/url' },
    }

    const mockData: PokemonQuery = {
      data: mockPokemon,
      isLoading: false,
      isError: false,
    }

    ;(useFetchPokemonByIdQuery as jest.Mock).mockReturnValue(mockData)

    const history = createMemoryHistory()
    render(
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    )

    await waitFor(() => {
      screen.getByText('Back').click()
    })

    expect(history.location.pathname).toBe('/')
  })
})
