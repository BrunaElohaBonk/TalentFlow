import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import EditarPerfil from "../../../components/editarPerfil"
import "./perfilInstrutor.css"
import icon_editar from './../../../assets/img/icon_editar.png'
import user from '../../../assets/img/icon_user.png'
import { useEffect, useState } from "react"
import { useTheme } from '../../../context/themeContext'

interface IPerfil {
    edv: number;
    img: string;
    nome: string;
    email: string;
    user: string;
    contato: number;
    nascimento: string;
}

function PerfilInstrutor(){
    const [editar, setEditar] = useState(false)
    const [perfil, setPerfil] = useState<IPerfil | null>(null);
    const { darkMode, alternarTema } = useTheme();
    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        if (usuarioSalvo) {
            const usuario = JSON.parse(usuarioSalvo);
            console.log(usuario)
            setPerfil({
                edv: usuario.EDV,
                img: usuario.imagem,
                nome: usuario.name,
                email: usuario.email_bosch,
                user: usuario.user_bosch,
                contato: Number(usuario.contato),
                nascimento: formatarData(usuario.data_nascimento)
            });
        }
    }, []);

    // const [perfil, setPerfil] = useState([])
    // const fetchPerfil = async () => {
    //     try {
    //         const response = await axios.get('link do backend')
    //         console.log("API RESPONSE:", response.data)
    //         setPerfil(response.data.response || [])
    //     } 
    //     catch (e) {
    //         console.error('Erro:', e)
    //         setPerfil([])
    //     }
    // }

    // useEffect(() => {
    //     fetchPerfil()
    // }, [])

    return(
        <div className="perfil">
            <Header></Header>
            <EditarPerfil visible={editar} setVisible={setEditar} edv={perfil?.edv ?? 0}/>
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
                                    <img src={user} alt="user" className="perfil-user"/>
                                    <span className="perfil-titulo" title={perfil.nome}>{perfil.nome}</span>
                                </div>
                                <div className="perfil-conteudo">
                                    <span className="perfil-span">EDV: {perfil.edv}</span>
                                    <span className="perfil-span">User: {perfil.user}</span>
                                    <span className="perfil-span">Email: {perfil.email}</span>
                                    <span className="perfil-span">Data de Nascimento: {formatarData(perfil.nascimento)}</span>
                                    <span className="perfil-span">Idade: {Idade(perfil.nascimento)} anos</span>
                                    <span className="perfil-span">Contato:Contato: {Telefone(perfil.contato)}</span>
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