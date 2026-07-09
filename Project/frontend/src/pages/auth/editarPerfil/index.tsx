import './editarPerfil.css'
import Header from '../../../components/header'
import Sidebar from '../../../components/sidebar'
import sair from '../../../assets/img/close.png'
import download from '../../../assets/img/icon download.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

function EditarPerfil(){
    const { edv } = useParams();
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState({
        img: '',
        name: '',
        email: '',
        user: '',
        contato: '',
        nascimento: '',
    });
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`link backend`)
            const User = response.data.response

            setPerfil({
                name: User.name || '',
                img: User.img || '',
                email: User.email || '',
                user: User.user || '',
                contato: User.contato || '',
                nascimento: User.nascimento || ''
            })

        } 
        catch (e) {
            console.error('Erro:', e)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleChange = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!perfil.name || !perfil.email || !perfil.contato || !perfil.email || !perfil.nascimento) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await axios.put(
                `link backend`,
                {
                    ...perfil
                }
            );
            Swal.fire({
                title: 'Sucesso!',
                text: 'Seu perfil foi atualizado com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
            navigate('/PerfilInstrutor') 

        } 
        catch (e) {
            console.error('Erro ao atualizar:', e);

            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar o seu perfil',
                icon: 'error'
            });
        }
    }
    
    return(
        <div>
            <Header></Header>
            <div className='editar-body'>
                <form onSubmit={handleSubmit} className="editar-form">
                    <button onClick={()=>navigate('/PerfilInstrutor')} className='editar-botao'>
                        <img src={sair} alt="voltar" className='editar-sair'/>
                    </button>
                    <span className='editar-titulo'>EDITAR PERFIL</span>
                    <div className='editar-container'>
                        <div className="foto-container">

                            <input
                                type="file"
                                name="img"
                                accept="image/*"
                                onChange={handleChange}
                                className="editar-input"
                            />
                            <img 
                                src={download} 
                                alt="download" 
                                className="editar-download"
                            />
                        </div>

                        <input 
                            name="name" 
                            placeholder="Nome completo" 
                            value={perfil.name} 
                            onChange={handleChange} 
                            className='editar-input'
                        />

                        <input 
                            name="email" 
                            placeholder="Email" 
                            value={perfil.email} 
                            onChange={handleChange} 
                            className='editar-input'
                        />

                        <input 
                            name="user" 
                            placeholder="UserID" 
                            value={perfil.user} 
                            onChange={handleChange} 
                            className='editar-input'
                        />

                        <input 
                            name="nascimento" 
                            type="date"
                            placeholder="Data de nascimeto" 
                            value={perfil.nascimento} 
                            onChange={handleChange} 
                            className='editar-input'
                        />

                        <input 
                            name="contato" 
                            placeholder="Contato" 
                            value={perfil.contato} 
                            onChange={handleChange} 
                            type='number'
                            className='editar-input'
                        />

                        <div className='editar-button'>
                            <button className='editar-salvar' type='submit'>SALVAR MODIFICAÇÃO</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditarPerfil