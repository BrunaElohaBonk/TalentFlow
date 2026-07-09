import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import "./perfilInstrutor.css"
import { useNavigate } from "react-router-dom"
import editar from './../../../assets/img/icon_editar.png'
import user from '../../../assets/img/icon_user.png'
import { useEffect, useState } from "react"
import axios from "axios"

interface Perfil {
    edv: number;
    img: string;
    name: string;
    email: string;
    user: string;
    contato: number;
    nascimento: Date;
}

function PerfilInstrutor(){

    const [perfil, setPerfil] = useState<Perfil>({
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
            <div className="perfil-container">
                <Sidebar></Sidebar>
                <div className="perfil-body">   
                    <div className="perfil-form">
                        <button onClick={()=> navigate(`/Editar/${perfil.edv}`)}>
                            <img src={editar} alt="editar" className="perfil-editar"/>
                        </button>
                        <div className="perfil-header">
                            <img src={user} alt="user" className="perfil-user"/>
                            <span className="perfil-titulo">{perfil.name}</span>
                        </div>
                        <div className="perfil-conteudo">
                            <span className="perfil-span">EDV: {perfil.edv}</span>
                            <span className="perfil-span">User: {perfil.user}</span>
                            <span className="perfil-span">Email: {perfil.email}</span>
                            <span className="perfil-span">Data de Nascimento: {perfil.nascimento.toLocaleDateString("pt-BR")}</span>
                            <span className="perfil-span">Idade: {Idade(perfil.nascimento)}</span>
                            <span className="perfil-span">Contato: {Telefone(perfil.contato)}</span>
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