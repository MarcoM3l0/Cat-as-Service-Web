import { Link } from "react-router-dom";

import './Home.css'

const Home = () => {
    return (
        <div className="container">
          <img className="floating-image" src="../img/client-icon.png" width="138" height="138" />
          <h2>Bem vindo ao Cat as Service Web</h2>
          <div className="link-container">
            <Link className="btn-Buscar" to="/buscar-racas">Buscar Raças</Link>
            <Link className="btn-favoritos" to="/meus-favoritos">Meus Favoritos</Link>
          </div>
        </div>
      )
}

export default Home;