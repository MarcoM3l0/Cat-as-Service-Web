import './App.css'
import {  BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import BuscarRacas from './pages/BuscarRacas'
import MeusFavoritos from './pages/MeusFavoritos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/buscar-racas' Component={BuscarRacas}/>
        <Route exact path='/meus-favoritos' Component={MeusFavoritos}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
