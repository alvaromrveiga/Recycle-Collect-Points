import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import Dropzone from '../../components/Dropzone';

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGE_Uf_Response {
    sigla: string
}

interface IBGE_City_Response {
    nome: string
}

const CreatePoint = () => {
    //array ou objecto: manualmente informar o tipo da variável
    const [itens, setItens] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]); //array de objetos
    const [cities, setCities] = useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        address: '',
    });

    const [selectedUf, setSelectedUF] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        }), () => setInitialPosition([-15.8259668, -47.9276436]), { timeout: 10000 })
    }, []);

    //quando o array [] está vazio, a função só é executada uma vez, não importa quantas vezes CreatePoint é chamado
    useEffect(() => {
        api.get('itens').then(response => {
            setItens(response.data);
        })
    }, []);

    useEffect(() => {
        axios
            .get<IBGE_Uf_Response[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                const ufNames = response.data.map(uf => uf.sigla);
                setUfs(ufNames);
            })
    }, []);


    useEffect(() => {
        //carrega as cidades sempre que a UF mudar
        if (selectedUf === '0') {
            return;
        }
        axios
            .get<IBGE_City_Response[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            })
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUF(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    useEffect(() => { //faz o selectedPosition atualizar assim que é alterado, impedindo que uma versão desatualizada seja usada
    }, [selectedPosition]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        //colchete porque ai pode usar o nome de uma variável como propriedade, não com a variaável em si
        //dessa forma copia todo o objeto e altera só o campo passado com o valor
        //name pode ser whatsapp, address... por causa dos colchetes
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItens.findIndex(item => item === id); //se encontrar retorna a posição, se não retorna -1

        if (alreadySelected >= 0) {
            const filteredItens = selectedItens.filter(item => item !== id); //pega todos menos o id

            setSelectedItens(filteredItens);
        } else {
            setSelectedItens([...selectedItens, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();


        const { name, email, whatsapp, address } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const itens = selectedItens;

        const data = new FormData
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('address', address);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('itens', itens.join(','));
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        await api.post('points', data);

        alert('Ponto de coleta criado!');

        history.push('/'); //volta pra home page
    }

    return (
        <div id='page-create-point'>
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to={'/'} >
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={11} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field">
                        <label htmlFor="address">Endereço</label>
                        <input
                            type="text"
                            name='address'
                            id='address'
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select
                                onChange={handleSelectUf}
                                value={selectedUf}
                                name="uf"
                                id="uf"
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map((uf) => (
                                    <option
                                        key={uf}
                                        value={uf}>
                                        {uf}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                onChange={handleSelectCity}
                                value={selectedCity}
                                name="city"
                                id="city"
                            >
                                <option value="0">Selecione a cidade</option>
                                {cities.map((city) => (
                                    <option
                                        key={city}
                                        value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {itens.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItens.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={api.defaults.baseURL + item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type='submit'>
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
}

export default CreatePoint;