import './editarPerfil.css'
import Header from '../../../components/header'
import sair from '../../../assets/img/close.png'
import download from '../../../assets/img/icon download.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useDropzone } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'

function EditarPerfil(){
    const { edv } = useParams();
    const navigate = useNavigate();
    const [nomeArquivo, setNomeArquivo] = useState("Selecione uma foto");
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        multiple: false,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
            const arquivo = acceptedFiles[0];
            setNomeArquivo(arquivo.name);
            setPerfil((prev) => ({
                ...prev,
                img: URL.createObjectURL(arquivo),
            }));
            }
        },
    });
    const [perfil, setPerfil] = useState({
        img: null,
        name: '',
        email: '',
        user: '',
        contato: '',
        nascimento: '',
    });
    const fetchPerfil = async () => {
        try {
            const response = await axios.get(`link backend`)
            const User = response.data.response
            setPerfil({
                name: User.name || '',
                img: null as File | null,
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
        fetchPerfil();
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
                    <button type="button" onClick={()=>navigate('/PerfilInstrutor')} className='editar-botao'>
                        <img src={sair} alt="voltar" className='editar-sair'/>
                    </button>
                    <span className='editar-titulo'>Editar Perfil</span>
                    <div className='editar-container'>
                        <div className="foto-container" {...getRootProps()}>
                            <input {...getInputProps()} name="img" />
                            <p className="editar-file">{nomeArquivo}</p>
                            <img src={download} alt="download" className="editar-download"/>
                        </div>
                        <input name="name" placeholder="Nome completo" value={perfil.name} onChange={handleChange} className='editar-input'/>
                        <input name="email" placeholder="Email" value={perfil.email} onChange={handleChange} className='editar-input'/>
                        <input name="user" placeholder="UserID" value={perfil.user} onChange={handleChange} className='editar-input'/>
                        <DatePicker
                            selected={perfil.nascimento ? new Date(perfil.nascimento) : null}
                            onChange={(date) =>setPerfil({...perfil, nascimento: date ? date.toISOString().split("T")[0] : "",})}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data de nascimento"
                            className='placeholderText'/>
                        <input name="contato" placeholder="Contato" value={perfil.contato} onChange={handleChange}  type='number'className='editar-input'/>
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