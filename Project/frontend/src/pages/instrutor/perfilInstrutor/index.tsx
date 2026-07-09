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
        email: "maria@email.com",
        user: "MAR1CT",
        contato: 41991234567,
        nascimento: new Date("2008-01-01"),
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
                        <button onClick={()=> navigate('/editar')}>
                            <img src={editar} alt="editar" className="perfil-editar"/>
                        </button>
                        <div>
                            <img src={user} alt="user" />
                            <span className="perfil-titulo">{perfil.name}</span>
                        </div>
                        <div>
                            <span>EDV: {perfil.edv}</span>
                            <span>User: {perfil.user}</span>
                            <span>Email: {perfil.email}</span>
                            <span>Data de Nascimento: 02/02/2005</span>
                            <span>Idade: </span>
                            <span>Contato: {perfil.contato}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PerfilInstrutor