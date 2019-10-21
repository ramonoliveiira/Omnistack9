import React, {useState ,useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard(){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
    //pode colocar um filtro no array para toda vez que o filtro alterar ele vai executar novamente
    //Com array vazio executa apenas uma única vez
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('dashboard/',{
                headers: { user_id }
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    //No header a primeira chave significa um valor/código javascript dentro do html e a segunda um objeto
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot =>(
                    <li key={spot._id}>
                        
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia`: 'Gratuito'}</span>
                    </li>
                ))}
            </ul>
            
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )

}