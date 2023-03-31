import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import Carregando from "../components/Carregando"

import "./BuscarRacas.css"

const BuscarRacas = () => {
    const [breeds, setBreads] = useState([])

    useEffect(() => {

        const options = {method: 'GET', url: 'https://api.thecatapi.com/v1/breeds'};

        axios.request(options).then(function (response) {
            setBreads(response.data) 
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const handleSubmit = (e) =>{

        e.preventDefault()

        console.log("Ok")

    }

    

    return (
        <div className="container-Racas">
            {breeds.length === 0 ? <Carregando/> : 
                <div>
                    <h2 className="titulo">Encontre sua Raça Favorita</h2>
                    <p className="Descricao-page">Utilize a caixa de seleção de raças para buscar características sobre determinado <br/>gatinho e descobrir qual é a sua raça favorita</p>
                    <hr />
                    <div className="container-busca">
                        <div className="cbx-buscar">
                            <label for="racas">Raças do gato</label>
                            <select id="racas" name="racas">
                                <option value="">Selecione uma Raça</option>
                                {breeds.map(breed => (
                                    <option key={breed.id} value={breed.name}>{breed.name}</option>
                                ))}
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
                        <button className="btn-buscar" type="submit" onClick={handleSubmit}>Buscar</button>
                        <button className="btn-Favoritar">Favoritar</button>
                    </div>
                </div>}
            </div>
    )
}

export default BuscarRacas;