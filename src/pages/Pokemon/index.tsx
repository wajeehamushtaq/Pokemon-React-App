import { PokemonQuery, Type } from 'types'
import { useParams, Link } from 'react-router-dom'
import { useFetchPokemonByIdQuery } from '../../api'
import './styles.css'

export default function Pokemon() {
  const { id } = useParams<{ id: string }>()

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useFetchPokemonByIdQuery<PokemonQuery>(id)

  if (isLoading) return <div className='message'>Loading...</div>

  if (isError)
    return <div className='message'>Error  while fetching Pokémon details.</div>

  return (
    <div className='pokemon-container'>
      <Link to="/" className="back-button">Back</Link>
      <div className='pokemon-center'>
        <div className='pokemon-image'>
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
            className='pokemon-image'
          />
        </div>
        <h2 className='pokemon-name'>{pokemon?.name}</h2>
        <div className='pokemon-details'>
          <p>
            <strong>Height:</strong> {pokemon?.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon?.weight}
          </p>
          <hr />
         
          <div className='pokemon-types'>
            <span className='type-name'>
              Type:
            </span>
            {pokemon?.types.map(({ type }: Type, index) => (
              <span key={index} className='pokemon-type'>
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
