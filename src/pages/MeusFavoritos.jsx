import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import Carregando from "../components/Carregando"

import "./MeusFavoritos.css"

const apikey = import.meta.env.VITE_API_KEY
const urlBusca = import.meta.env.VITE_SEARCH
const urlFavourites = import.meta.env.VITE_FAVOURITES

const MeusFavoritos = () => {

    const [buttoanExcluirDisabled, setButtaonExcluirDisabled] = useState(true)
    
    //responsável por obter a lista de gatos favoritados
    // Obetem os gatos favoritados 
    const [breedsFavourites, setBreadsFavourites] = useState([])
    useEffect(() => {

        const options = {
            method: 'GET',
            url: `${urlFavourites}/`,
            params: {sub_id: 'user-123'},
            headers: {
              'x-api-key': apikey,
              'Content-Type': 'application/json'
            }
          };
          
          axios.request(options).then(function (response) {
            const data = response.data.map(({ image_id }) => ({ image_id }))
            setBreadsFavourites(data);
          }).catch(function (error) {
            console.error(error);
          });
    }, [])

    // Obetem as raças de gatos
    const [breeds, setBreads] = useState([])
    useEffect(() => {

        const options = {method: 'GET', url: urlBusca};

        axios.request(options).then(function (response) {
            const data = response.data.map(({ id, name }) => ({ id, name }));
            setBreads(data); 
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const names = [];

    breeds.forEach(breed => {
        breedsFavourites.forEach(favourites => {
            if(favourites.image_id == breed.id){
                names.push({
                    id: breed.id,
                    name: breed.name
                })
            }
        })
    })
    
    /*================================================================================= */

    //Armazenar o valor selecionado pelo usuário
    const [selectedId, setSelectedId] = useState(null);

    const handleNameClick = (id) => {
      if (selectedId === id) {
        // se clicar duas vezes, deseleciona o item
        setSelectedId(null);
        setButtaonExcluirDisabled(true)
      } else {
        // caso contrário, seleciona o item
        setSelectedId(id);
        setButtaonExcluirDisabled(false)
      }
    }
    
    return (
        <div className="Container">
            {names.length === 0 ? <Carregando/> :
                <div>
                    <h2 className="titulo">Meus Favoritos</h2>
                    <p className="Descricao-page">Aqui você encontra a lista de gatinhos favoritos</p>
                    <hr />

                    <div className="container-favoritos">
                        <div className="lista-favoritos">
                            <ul>
                                {names.map(name =>(
                                    <li
                                    className={selectedId === name.id ? 'selected' : 'selectLi'}
                                    key={name.id} 
                                    value={name.id}
                                    onClick={() => handleNameClick(name.id)}
                                  >
                                    {name.name}
                                  </li>
                                ))}
                            </ul>
                        </div>
                        <div className="botoes-Favoritos">
                            <Link className="btn-Voltar" to="/Cat-as-Service-Web">Voltar</Link>
                            <button 
                                className={`btn-Excluir-Favoritar ${buttoanExcluirDisabled ? 'btn-disabled' : ''}`}
                                disabled={buttoanExcluirDisabled}>
                                    Excluir Favorito
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MeusFavoritos;