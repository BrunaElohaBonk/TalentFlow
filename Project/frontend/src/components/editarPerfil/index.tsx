import './editarPerfil.css'
import sair from '../../assets/img/close.png'
import download from '../../assets/img/icon download.png'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useDropzone } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import api from '../../services/api'

interface IPerfil {
    img: File | string | null;
    name: string;
    EDV: number;
    email_bosch: string;
    user_bosch: string;
    contato: string;
    data_nascimento: string;
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    edv: number;
}

function EditarPerfil({ visible, setVisible, edv }: Props){
    const nomeRef = useRef<HTMLInputElement>(null);
    const edvRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const userRef = useRef<HTMLInputElement>(null);
    const nascimentoRef = useRef<HTMLInputElement>(null);
    const contatoRef = useRef<HTMLInputElement>(null);
    const salvarRef = useRef<HTMLButtonElement>(null);
    const proximoCampo = (e: React.KeyboardEvent<HTMLInputElement>, proximo: React.RefObject<HTMLElement | null>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            proximo.current?.focus();
        }};
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
    const formatarData = (data: string) => {
    if (!data) return "";

    const [ano, mes, dia] = data.split("T")[0].split("-");

    return `${dia}/${mes}/${ano}`;
};
    const [perfil, setPerfil] = useState<IPerfil>({
        img: null,
        name: '',
        EDV: 0,
        email_bosch: '',
        user_bosch: '',
        contato: '',
        data_nascimento: '',
    });
    useEffect(() => {
        if (!visible) return;
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            console.log("Usuário local:", usuario);
            setPerfil({
                img: null,
                name: usuario.name || '',
                EDV: Number(usuario.EDV) || 0,
                email_bosch: usuario.email_bosch || '',
                user_bosch: usuario.user_bosch || '',
                contato: usuario.contato || '',
                data_nascimento: formatarData(usuario.data_nascimento),
            });
        }
    }, [visible]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [dia, mes, ano] = perfil.data_nascimento.split("/");
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
        if (!perfil.email_bosch || !perfil.contato || !perfil.data_nascimento) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await api.put(`instrutor/editarInstrutor/${perfil.EDV}`,perfil);
            const usuario = JSON.parse(localStorage.getItem("usuario")!);
            usuario.email = perfil.email_bosch;
            usuario.contato = perfil.contato;
            usuario.dataNascimento = perfil.data_nascimento;
            localStorage.setItem("usuario", JSON.stringify(usuario));
            Swal.fire({
                title: "Sucesso!",
                text: "Seu perfil foi atualizado com sucesso!",
                icon: "success",
            });
            console.log(response.data);
            setVisible(false);
        }
        catch (e) {
            console.error("Erro ao atualizar:", e);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível atualizar o seu perfil.",
                icon: "error",
            });
        }
    }
    const formatarContato = (contato: string | number) => {
        let value = String(contato).replace(/\D/g, "");
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        return value;
    };

    const handleContato = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerfil((prev) => ({
            ...prev,
            contato: formatarContato(e.target.value),
        }));
    };

    if (!visible) return null;
    return (
        <div className="editarPerfil-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="editarPerfil-card" onClick={(e) => e.stopPropagation()}>
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
                        <input ref={nomeRef} name="name" className="editarPerfil-input" value={perfil.name} disabled/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">EDV</label>
                        <input ref={edvRef} name="EDV" className="editarPerfil-input" value={perfil.EDV} disabled/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Email</label>
                        <input ref={emailRef} name="email_bosch" className="editarPerfil-input" value={perfil.email_bosch} onChange={handleChange} onKeyDown={(e) => proximoCampo(e, userRef)}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">UserID</label>
                        <input ref={userRef} name="user_bosch" className="editarPerfil-input" value={perfil.user_bosch} disabled/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Data de nascimento</label>
                        <input ref={nascimentoRef} name="data_nascimento" className="editarPerfil-input" value={perfil.data_nascimento} disabled/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Contato</label>
                        <input ref={contatoRef} name="contato" className="editarPerfil-input" inputMode="numeric" value={perfil.contato || ''} onChange={handleContato} maxLength={15} onKeyDown={(e) => proximoCampo(e, salvarRef)}/>
                    </div>
                    <div className="editarPerfil-botoes">
                        <button ref={salvarRef} className="editarPerfil-salvar" type="submit">SALVAR MODIFICAÇÃO</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditarPerfil