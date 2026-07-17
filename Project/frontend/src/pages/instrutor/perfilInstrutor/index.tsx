import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import EditarPerfil from "../../../components/editarPerfil"
import "./perfilInstrutor.css"
import { useNavigate } from "react-router-dom"
import icon_editar from './../../../assets/img/icon_editar.png'
import user from '../../../assets/img/icon_user.png'
import { useEffect, useState } from "react"
import axios from "axios"

interface IPerfil {
    edv: number;
    img: string;
    name: string;
    email: string;
    user: string;
    contato: number;
    nascimento: Date;
}

function PerfilInstrutor(){
    const [editar, setEditar] = useState(false)
    const [perfil, setPerfil] = useState<IPerfil>({
        edv: 12345678,
        img: "foto.png",
        name: "Maria Joaquina Silveira",
        email: "maria.silveira@br.bosch.com",
        user: "MJS1CT",
        contato: 41991234567,
        nascimento: new Date("07/09/2008"),
    });


    const navigate = useNavigate()

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
        <div>
            <Header></Header>
            <EditarPerfil visible={editar} setVisible={setEditar} edv={perfil.edv}/>
            <div className="perfil-container">
                <Sidebar></Sidebar>
                <div className="perfil-body">   
                    <div className="perfil-form">
                        <button onClick={()=> setEditar(true)}>
                            <img src={icon_editar} alt="editar" className="perfil-editar"/>
                        </button>
                        <div className="perfil-header">
                            <img src={user} alt="user" className="perfil-user"/>
                            <span className="perfil-titulo" title={perfil.name}>{perfil.name}</span>
                        </div>
                        <div className="perfil-conteudo">
                            <span className="perfil-span" title={perfil.edv.toString()}>EDV: {perfil.edv}</span>
                            <span className="perfil-span" title={Telefone(perfil.contato)}>Contato: {Telefone(perfil.contato)}</span>
                            <span className="perfil-span" title={perfil.user}>User: {perfil.user}</span>
                            <span className="perfil-span" title={perfil.nascimento.toLocaleDateString("pt-BR")}>Data de Nascimento: {perfil.nascimento.toLocaleDateString("pt-BR")}</span>
                            <span className="perfil-span" title={perfil.email}>Email: {perfil.email}</span>
                            <span className="perfil-span" title={Idade(perfil.nascimento).toString()}>Idade: {Idade(perfil.nascimento)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PerfilInstrutor

function Telefone(numero: number) {
    const telefone = numero.toString();
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/,"($1)$2-$3");
}

function Idade(dataNascimento: Date) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
    ) {
        idade--;
    }
    return idade;
}   