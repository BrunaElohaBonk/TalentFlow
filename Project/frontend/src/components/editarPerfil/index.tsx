import './editarPerfil.css'
import sair from '../../assets/img/close.png'
import download from '../../assets/img/icon download.png'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { useDropzone } from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import api from '../../services/api'

interface IPerfil {
    token: string;
    user: {
        EDV: number;
        name: string;
        user_bosch: string;
        email_bosch: string;
        contato: string;
        data_nascimento: string;
        imagem: File | string | null;
        ativo: boolean;
        tipo: string;
    };
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    edv: number;
    atualizarPerfil: () => void;
}

function EditarPerfil({ visible, setVisible, edv, atualizarPerfil }: Props){
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
                    user: {
                        ...prev.user,
                        imagem: arquivo,
                    },
                }));
            }
        },
    });
    const formatarData = (data: string) => {
        if (!data) return "";
        if (data.includes("/")) {
            return data;
        }
        const [ano, mes, dia] = data.split("T")[0].split("-");
        return `${dia}/${mes}/${ano}`;
    };
    const [perfil, setPerfil] = useState<IPerfil>({
        token: "",
        user: {
            EDV: 0,
            name: "",
            user_bosch: "",
            email_bosch: "",
            contato: "",
            data_nascimento: "",
            imagem: null,
            ativo: true,
            tipo: "",
        },
    });

    useEffect(() => {
        if (!visible) return;
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            console.log("Usuário local:", usuario);
            setPerfil({
                token: usuario.token,
                user: {
                    EDV: usuario.user.EDV,
                    name: usuario.user.name,
                    user_bosch: usuario.user.user_bosch,
                    email_bosch: usuario.user.email_bosch,
                    contato: usuario.user.contato,
                    data_nascimento: formatarData(usuario.user.data_nascimento),
                    imagem: usuario.user.imagem,
                    ativo: usuario.user.ativo,
                    tipo: usuario.user.tipo,
                },
            });
        }
    }, [visible]);
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPerfil((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [dia, mes, ano] = perfil.user.data_nascimento.split("/");
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
        if (!perfil.user.name || !perfil.user.email_bosch || !perfil.user.contato || !perfil.user.data_nascimento) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await api.put(`instrutor/editarInstrutor/${perfil.user.EDV}`, perfil.user);
            console.log(response.status);
            console.log(response.data);
            const usuario = JSON.parse(localStorage.getItem("usuario")!);
            usuario.user.name = perfil.user.name;
            usuario.user.email_bosch = perfil.user.email_bosch;
            usuario.user.contato = perfil.user.contato;
            usuario.user.data_nascimento = perfil.user.data_nascimento;
            localStorage.setItem("usuario", JSON.stringify(usuario));
            atualizarPerfil();
            Swal.fire({
                title: "Sucesso!",
                text: "Seu perfil foi atualizado com sucesso!",
                icon: "success",
            });
            console.log(response.data);
            setVisible(false);
        }
        catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error.response);

            Swal.fire({
                title: "Erro!",
                text: "Não foi possível atualizar o seu perfil.",
                icon: "error",
            });
        }
    }
    const formatarDataDigitada = (valor: string) => {
        let data = valor.replace(/\D/g, ""); 
        if (data.length > 8) {
            data = data.substring(0, 8);
        }
        if (data.length > 4) {
            data = data.replace(/^(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
        } 
        else if (data.length > 2) {
            data = data.replace(/^(\d{2})(\d+)/, "$1/$2");
        }
        return data;
    };
    const handleDataNascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerfil((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                data_nascimento: formatarDataDigitada(e.target.value),
            },
        }));
    };
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
            user: {
                ...prev.user,
                contato: formatarContato(e.target.value),
            },
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
                        <input ref={nomeRef} name="name" className="editarPerfil-input" value={perfil.user.name} onChange={handleChange}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">EDV</label>
                        <input ref={edvRef} name="EDV" className="editarPerfil-input" value={perfil.user.EDV} disabled/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Email</label>
                        <input ref={emailRef} name="email_bosch" className="editarPerfil-input" value={perfil.user.email_bosch} onChange={handleChange} onKeyDown={(e) => proximoCampo(e, userRef)}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">UserID</label>
                        <input ref={userRef} name="user_bosch" className="editarPerfil-input" value={perfil.user.user_bosch} onChange={handleChange}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Data de nascimento</label>
                        <input ref={nascimentoRef} name="data_nascimento" className="editarPerfil-input" value={perfil.user.data_nascimento} onChange={handleDataNascimento} maxLength={10}/>
                    </div>
                    <div className="editarPerfil-grupo">
                        <label className="editarPerfil-label">Contato</label>
                        <input ref={contatoRef} name="contato" className="editarPerfil-input" inputMode="numeric" value={perfil.user.contato || ''} onChange={handleContato} maxLength={15} onKeyDown={(e) => proximoCampo(e, salvarRef)}/>
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