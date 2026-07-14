import { useEffect, useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verInstrutor.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import lixeira from '../../../assets/img/lixeira.png'
import user from '../../../assets/img/icon_user.png'

interface Instrutor {
    edv: number;
    img: string;
    name: string;
    email: string;
    user: string;
    contato: number;
    nascimento: Date;
}


function VerInstrutor(){
    const [instrutor, setInstrutor] = useState<Instrutor>({
        edv: 12345678,
        img: "foto.png",
        name: "Maria Joaquina Silveira",
        email: "maria.silveira@br.bosch.com",
        user: "MJS1CT",
        contato: 41991234567,
        nascimento: new Date("07/09/2008"),
    });
    const navigate = useNavigate()
    const fetchInstrutor = async () => {
        try {
            const response = await axios.get('link bakcend')
            console.log("API RESPONSE:", response.data)
            setInstrutor(response.data.response || [])
        } 
        catch (error) {
            console.error('Erro:', error)
            setInstrutor([])
        }
    }

    useEffect(() => {
        fetchInstrutor()
    }, [])

    const handleDelete = async (edv) => {
    const confirm = await Swal.fire({
      title: 'Tem certeza?',
      text: 'O instrutor será deletado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return
        try {
            await axios.delete(`link backend/${edv}`)
            Swal.fire({
                title: 'Deletado!',
                text: 'Instrutor removido com sucesso!',
                icon: 'success'
        })
        fetchInstrutor()
        } 
        catch (error) {
            console.error('Erro ao deletar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar instrutor',
                icon: 'error'
            })
        }
    }

    return(
        <div>
            <Header></Header>
            <div className="instrutor-container">
                <Sidebar />
                <div className="instrutor-body">
                    <div className="instrutor-modal">
                        <button onClick={() => handleDelete(instrutor.edv)}>
                            <img src={lixeira} alt="deletar" className="instrutor-deletar"/>
                        </button>
                        <div className="instrutor-header">
                            <img src={user} alt="user" className="instrutor-img"/>
                            <span className="instrutor-titulo">{instrutor.name}</span>
                        </div>
                        <div className="instrutor-conteudo">
                            <span className="instrutor-span">EDV: {instrutor.edv}</span>
                            <span className="instrutor-span">Email: {instrutor.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerInstrutor