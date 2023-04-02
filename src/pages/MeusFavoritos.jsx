import { Link } from "react-router-dom";

import "./MeusFavoritos.css"

const MeusFavoritos = () => {
    return (
        <div className="Container">
            <h2 className="titulo">Meus Favoritos</h2>
            <p className="Descricao-page">Aqui você encontra a lista de gatinhos favoritos</p>
            <hr />

            <div className="container-favoritos">
                <div className="lista-favoritos">
                </div>
                <div className="botoes-Favoritos">
                    <Link className="btn-Voltar" to="/Cat-as-Service-Web">Voltar</Link>
                    <button className="btn-Excluir-Favoritar">Excluir Favorito</button>
                </div>
            </div>
        </div>
    )
}

export default MeusFavoritos;