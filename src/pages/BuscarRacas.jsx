import { Link } from "react-router-dom";

import "./BuscarRacas.css"

const BuscarRacas = () => {
    return (
        <div className="container-Racas">
            <h2 className="titulo">Encontre sua Raça Favorita</h2>
            <p className="Descricao-page">Utilize a caixa de seleção de raças para buscar características sobre determinado <br/>gatinho e descobrir qual é a sua raça favorita</p>
            <hr />
            <div className="container-busca">
                <div className="cbx-buscar">
                    <label for="racas">Raças do gato</label>
                    <select id="racas" name="racas">
                        <option value="">Selecione uma Raça</option>
                    </select>
                </div>

                <div className="resultado">
                    <p>Temperamento: resultado...</p> 
                    
                    <p>Origem: resultado...</p> 
                    
                    <p>Descrição: resultado...</p>
                    
                </div>
                    

                <img className="image" src="../img/Cat-on-computer.jpg" height="210" width="360"/>

            </div>
            <div className="botoes">
                <Link className="btn-Voltar" to="/">Voltar</Link>
                <button className="btn-buscar">Buscar</button>
                <button className="btn-Favoritar">Favoritar</button>
            </div>
        </div> 
    )
}

export default BuscarRacas;