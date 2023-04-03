import './App.css'
import {  BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import BuscarRacas from './pages/BuscarRacas'
import MeusFavoritos from './pages/MeusFavoritos'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/Cat-as-Service-Web' Component={Home}/>
          <Route exact path='/buscar-racas' Component={BuscarRacas}/>
          <Route exact path='/meus-favoritos' Component={MeusFavoritos}/>
        </Routes>
      </BrowserRouter>
      <p className='footerP'> @marco_m3l0 ;P</p>
    </div>
    
  )
}

export default App
