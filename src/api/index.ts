import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonAPISlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
  endpoints: (builder) => ({
    fetchPokemons: builder.query({
      query: (offset) => `pokemon?offset=${offset}&limit=30`,
    }),
    fetchPokemonById: builder.query({
      query: (id) => `pokemon/${id}`,
    }),
  }),
})

export const { useFetchPokemonsQuery, useFetchPokemonByIdQuery } = pokemonAPISlice