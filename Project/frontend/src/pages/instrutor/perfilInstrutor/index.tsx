import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import EditarPerfil from "../../../components/editarPerfil"
import "./perfilInstrutor.css"
import icon_editar from './../../../assets/img/icon_editar.png'
import user from '../../../assets/img/icon_user.png'
import { useEffect, useState } from "react"
import { useTheme } from '../../../context/themeContext'

interface IPerfil {
    token: string;
    user: {
        EDV: number;
        name: string;
        user_bosch: string;
        email_bosch: string;
        contato: string;
        data_nascimento: string;
        fotoPerfil: File | string | null;
        ativo: boolean;
        tipo: string;
    };
}

function PerfilInstrutor(){
    const [editar, setEditar] = useState(false)
    const [perfil, setPerfil] = useState<IPerfil | null>(null);
    const { darkMode, alternarTema } = useTheme();

    const carregarPerfil = () => {
        const usuarioSalvo = localStorage.getItem("usuario");
        if (!usuarioSalvo) return;
        const usuario = JSON.parse(usuarioSalvo);
        setPerfil({
            token: usuario.token,
            user: {
                EDV: usuario.user.EDV,
                name: usuario.user.name,
                user_bosch: usuario.user.user_bosch,
                email_bosch: usuario.user.email_bosch,
                contato: usuario.user.contato,
                data_nascimento: formatarData(usuario.user.data_nascimento),
                fotoPerfil: usuario.user.fotoPerfil,
                ativo: usuario.user.ativo,
                tipo: usuario.user.tipo,
            },
        });
    }; 

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        carregarPerfil();
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            console.log(usuario)
            console.log("Imagem salva no localStorage:", usuario.user.imagem);
            setPerfil({
                token: usuario.token,
                user: {
                    EDV: usuario.user.EDV,
                    name: usuario.user.name,
                    user_bosch: usuario.user.user_bosch,
                    email_bosch: usuario.user.email_bosch,
                    contato: usuario.user.contato,
                    data_nascimento: formatarData(usuario.user.data_nascimento),
                    fotoPerfil: usuario.user.imagem,
                    ativo: usuario.user.ativo,
                    tipo: usuario.user.tipo,
                },
            });
        }
    }, []);

    console.log("perfil:", perfil);
console.log("localStorage:", localStorage.getItem("perfil"));

    return(
        <div className="perfil">
            <Header></Header>
            <EditarPerfil visible={editar} setVisible={setEditar} edv={perfil?.user.EDV ?? 0} onSuccess={carregarPerfil} atualizarPerfil={carregarPerfil}/>
            <div className="perfil-container">
                <Sidebar></Sidebar>
                <div className="perfil-body">   
                     <label htmlFor="theme" className="theme">
                        <span className="theme__toggle-wrap">
                            <input id="theme" className="theme__toggle" type="checkbox" role="switch" name="theme" checked={darkMode} onChange={alternarTema}/>
                            <span className="theme__fill"></span>
                            <span className="theme__icon">
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                                <span className="theme__icon-part"></span>
                            </span>
                        </span>
                    </label>
                    <div className="perfil-form">
                        <button onClick={()=> setEditar(true)}>
                            <img src={icon_editar} alt="editar" className="perfil-editar"/>
                        </button>
                        {perfil ? (
                            <>
                                <div className="perfil-header">
                                    <img
                                        src={
                                            perfil.user.fotoPerfil && typeof perfil.user.fotoPerfil === "string"
                                                ? perfil.user.fotoPerfil
                                                : user
                                        }
                                        alt="Perfil"
                                        className="perfil-user"
                                    />
                                    <span className="perfil-titulo" title={perfil.user.name}>{perfil.user.name}</span>
                                </div>
                                <div className="perfil-conteudo">
                                    <span className="perfil-span">EDV: {perfil.user.EDV}</span>
                                    <span className="perfil-span">User: {perfil.user.user_bosch}</span>
                                    <span className="perfil-span">Email: {perfil.user.email_bosch}</span>
                                    <span className="perfil-span">Data de Nascimento: {formatarData(perfil.user.data_nascimento)}</span>
                                    <span className="perfil-span">Idade: {Idade(perfil.user.data_nascimento)} anos</span>
                                    <span className="perfil-span">Contato: {perfil?.user.contato ? Telefone(perfil.user.contato) : "Sem contato"}</span>
                                </div>
                            </>
                        ):(
                             <span>Nenhum usuário encontrado</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PerfilInstrutor

function Telefone(numero: number | string) {
    const telefone = String(numero).replace(/\D/g, "");
    return telefone.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1) $2-$3"
    );
}

function Idade(data_nascimento: string) {
    const [dia, mes, ano] = data_nascimento.split("/");
    const nascimento = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia)
    );
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }
    return idade;
}

function formatarData(data: string) {
    if (!data) return "";
    if (data.includes("T")) {
        const [ano, mes, dia] = data.split("T")[0].split("-");

        return `${dia}/${mes}/${ano}`;
    }
    if (data.includes("/")) {
        return data;
    }
    return "";
}