import './editarPerfil.css'
import sair from '../../../assets/img/close.png'
import download from '../../../assets/img/icon download.png'
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
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    edv: number;
}

function EditarPerfil({ visible, setVisible, edv }: Props){
    const [nomeArquivo, setNomeArquivo] = useState("");
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
            const response = await axios.get(`link backend/${edv}`);
            console.log("Resposta API:", response.data);
            const User = response.data.response;
            console.log("Usuário:", User);
            setPerfil({
                name: User.name || '',
                img: null,
                email: User.email || '',
                user: User.user || '',
                contato: User.contato || '',
                nascimento: User.nascimento? new Date(User.nascimento).toLocaleDateString("pt-BR"): ''
            });
        } 
        catch (e) {
            console.error('Erro:', e);
        }
    };

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
                `link backend`,{
                    ...perfil
                }
            );
            Swal.fire({
                title: 'Sucesso!',
                text: 'Seu perfil foi atualizado com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
            setVisible(false)
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
    useEffect(() => {
        if (visible) {
            fetchPerfil();
        }
    }, [visible]);

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

    if (!visible) return null;
    return (
        <div className="editarPerfil-overlay">
            <form onSubmit={handleSubmit} className="editarPerfil-card">
                <button type="button" onClick={() => setVisible(false)} className="editarPerfil-fechar"><img src={sair} alt="Fechar" /></button>
                <span className="editarPerfil-titulo">Editar Perfil</span>
                <div className="editarPerfil-container">
                    <div className='editarPerfil-grupo'>
                        <label className='editarPerfil-label'>Foto de Perfil</label>
                        <div className="foto-container" {...getRootProps()}>
                            <input {...getInputProps()} name="img" />
                            <p className="editar-file">{nomeArquivo}</p>
                            <img src={download} alt="download" className="editar-download"/>
                        </div>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Nome Completo</label>
                        <input name="name" className="editarPerfil-input" value={perfil.name} onChange={handleChange}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Email</label>
                        <input name="email" className="editarPerfil-input" value={perfil.email} onChange={handleChange}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">UserID</label>
                        <input name="user" className="editarPerfil-input" value={perfil.user} onChange={handleChange}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Data de nascimento</label>
                        <input name="nascimento" className="editarPerfil-input" inputMode="numeric" value={perfil.nascimento} onChange={handleNascimento} maxLength={10}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Contato</label>
                        <input name="contato" className="editarPerfil-input" inputMode="numeric" value={perfil.contato || ''} onChange={handleContato} maxLength={15}/>
                    </div>
                    <div className="editarPerfil-botoes">
                        <button className="editarPerfil-salvar" type="submit">SALVAR MODIFICAÇÃO</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditarPerfil