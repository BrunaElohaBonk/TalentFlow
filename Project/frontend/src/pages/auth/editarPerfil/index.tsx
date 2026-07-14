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

interface IPerfil {
    img: File | null;
    name: string;
    email: string;
    user: string;
    contato: string;
    nascimento: string;
}

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
                    img: arquivo,
                }));
            }
        },
    });
    const [perfil, setPerfil] = useState<IPerfil>({
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
                img: null,
                email: User.email || '',
                user: User.user || '',
                contato: User.contato || '',
                nascimento: User.nascimento? new Date(User.nascimento).toLocaleDateString("pt-BR"): ''
            })
        } 
        catch (e) {
            console.error('Erro:', e)
        }
    };
    useEffect(() => {
        fetchPerfil();
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [dia, mes, ano] = perfil.nascimento.split("/");
        const dataNascimento = new Date(
            Number(ano),
            Number(mes) - 1,
            Number(dia)
        );
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        if (mesAtual < dataNascimento.getMonth() || (mesAtual === dataNascimento.getMonth() && diaAtual < dataNascimento.getDate())) {
            idade--;
        }

        if (idade < 15 || idade > 100) {
            Swal.fire({
                title: "Idade inválida!",
                text: "O usuário deve ter entre 15 e 100 anos.",
                icon: "warning",
            });
            return;
        }
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

    const handleNascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/, "$1/$2");
        }
        if (value.length > 5) {
            value = value.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
        }
        setPerfil({
            ...perfil,
            nascimento: value
        });
    };

    const handleContato = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");

        setPerfil({
            ...perfil,
            contato: value
        });
    };
    
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
                        <input name="nascimento" placeholder="Data de nascimento" inputMode="numeric" value={perfil.nascimento} onChange={handleNascimento} className="editar-input" maxLength={10}/>
                        <input name="contato" placeholder="Contato" inputMode="numeric" value={perfil.contato || ''} onChange={handleContato} className="editar-input" maxLength={15} />
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