import { useEffect, useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verInstrutor.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

function VerInstrutor(){
    const [instrutor, setInstrutor] = useState([])
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
                <div className="instrutor-modal">

                </div>
            </div>
        </div>
    )
}
export default VerInstrutor