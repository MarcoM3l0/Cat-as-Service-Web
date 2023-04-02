import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import Carregando from "../components/Carregando"

import "./BuscarRacas.css"

const apikey = import.meta.env.VITE_API_KEY
const urlBusca = import.meta.env.VITE_SEARCH
const urlFavourites = import.meta.env.VITE_FAVOURITES

const BuscarRacas = () => {

    const [buttonBuscarDisabled, setButtonBuscarDisabled] = useState(true)
    const [buttoanFavoritoDisabled, setButtaonFavoritoDisabled] = useState(true)


    /*Faz a comunicação com a API e traz os dados de cada raça de gato*/  
    const [breeds, setBreads] = useState([])
    useEffect(() => {

        const options = {method: 'GET', url: urlBusca};

        axios.request(options).then(function (response) {
            setBreads(response.data) 
        }).catch(function (error) {
            console.error(error);
        });
    }, [])
    /*======================================================================================= */

    const [breedId, setBreedId] = useState('');
    
    const handleSelectChange = (e) => {
        const value = e.target.value
        setBreedId(value);
        setButtonBuscarDisabled(value === "");
        if(value === ""){
            setButtaonFavoritoDisabled(true)
            setControle(false)
        }
    }

    /* exibir os dados da raça selecionada*/
    const [breedTemperament, setBreedTemperament] = useState('');
    const [breedOrigin, setBreedOrigin] = useState('');
    const [breedDescription, setBreedDescription] = useState('');
    var [controle, setControle] = useState(false);
    

    const handleSubmit = () =>{

        const options = {method: 'GET', url: `${urlBusca}/${breedId}`};

        axios.request(options).then(function (response) {
            const {temperament, origin, description} = response.data;
            setBreedTemperament(temperament);
            setBreedOrigin(origin);
            setBreedDescription(description);
            setControle(true);
            setButtaonFavoritoDisabled(false)
        }).catch(function (error) {
        console.error(error);
        });
    }

    /*F */
    const handleSubmitFavouriting = () =>{
        
        const options = {
            method: 'POST',
            url: urlFavourites,
            headers: {
              'x-api-key': apikey,
              'Content-Type': 'application/json'
            },
            data: {image_id: breedId}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });

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
                            <label for="racas"><b>Raças do gato</b></label>
                            <select onChange={handleSelectChange}>
                                <option value="">Selecione uma Raça</option>
                                {breeds.map(breed => (
                                    <option key={breed.id} value={breed.id}>{breed.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {controle === false? 
                                <div className="sem-resultado">
                                    <p><b>Temperamento:</b> resultado...</p> 
                                
                                    <p><b>Origem:</b> resultado...</p> 
                                    
                                    <p><b>Descrição:</b> resultado...</p>
                                </div>
                                 :
                                <div className="resultado">
                                    <p><b>Temperamento:</b>  {breedTemperament}</p> 
                                    
                                    <p><b>Origem:</b> {breedOrigin}</p> 
                                    
                                    <p><b>Descrição:</b> {breedDescription}</p>
                                </div>
                                }
                        </div>
                            

                        <img className="image" src="../img/Cat-on-computer.jpg" height="210" width="360"/>

                        </div>
                        <div className="botoes">
                            <Link className="btn-Voltar" to="/Cat-as-Service-Web">Voltar</Link>
                            <button 
                                className={`btn-buscar ${buttonBuscarDisabled ? 'btn-disabled' : ''}`} 
                                disabled={buttonBuscarDisabled} 
                                onClick={handleSubmit}>
                                    Buscar
                            </button>
                            <button 
                                className={`btn-Favoritar ${buttoanFavoritoDisabled ? 'btn-disabled' : ''}`} 
                                disabled={buttoanFavoritoDisabled}
                                onClick={handleSubmitFavouriting} 
                                >
                                    Favoritar
                            </button>
                        </div>
                </div>
            }
        </div>
    )
}

export default BuscarRacas;