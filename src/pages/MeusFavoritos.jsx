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
    const [loading, setLoading] = useState(true);
    
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
            const data = response.data.map(({ id, image_id }) => ({ id, image_id }))
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

    const [names, setNames] = useState([])

    useEffect(() => {
        const newNames = [];
        breedsFavourites.forEach(favourite => {
          const breed = breeds.find(breed => breed.id === favourite.image_id);
          if (breed) {
            newNames.push({
              id: favourite.id,
              image_id: breed.id,
              name: breed.name
            });
          }
        });
        setNames(newNames);
        setLoading(false)
      }, [breeds, breedsFavourites]);
    
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
        console.log(id)
        setButtaonExcluirDisabled(false)
      }
    }
    /*=================================================================================== */

    // responsável por deletar uma raça dos favoritos
    const handleSubmitDelete = () =>{

        const options = {
            method: 'DELETE',
            url: `${urlFavourites}/${selectedId}`,
            headers: {
              'x-api-key': apikey,
              'Content-Type': 'application/json'
            }
        };
          
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });

        const newNames = names.filter(name => name.id !== selectedId);
        setNames(newNames);

    }

    
    return (
        <div className="Container">
            {loading ? <Carregando/> :
                names.length != 0 ?
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
                                        key={name.image_id} 
                                        value={name.image_id}
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
                                    disabled={buttoanExcluirDisabled}
                                    onClick={handleSubmitDelete}>
                                        Excluir Favorito
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <h2 className="titulo">Meus Favoritos</h2>
                        <p className="Descricao-page">Sua lista de favoritos está vazia.</p>
                        <hr />
                        <div className="container-favoritos">
                            <div className="lista-favoritos">
                                <ul>
                                    <li>Sua lista de favoritos está vazia!</li>
                                    <li>Procure alguns gatinhos fofinhos</li>
                                    <li>e adicione ele aqui.</li>
                                    <li><img src="../img/empty-list-cat.png" height='200px' /></li>
                                </ul>
                            </div>
                            <div className="botoes-Favoritos">
                                <Link className="btn-Voltar" to="/Cat-as-Service-Web">Voltar</Link>
                                <button 
                                    className={`btn-Excluir-Favoritar ${true ? 'btn-disabled' : ''}`}
                                    disabled={true}>
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