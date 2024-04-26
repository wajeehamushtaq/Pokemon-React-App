import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PokemonLists, Pokemon } from './pages'
import { store } from './store/index'
import './globalStyles.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<PokemonLists />} />
        <Route path='/pokemon/:id' element={<Pokemon />} />
      </Routes>
    </Router>
  </Provider>
)

export default App
