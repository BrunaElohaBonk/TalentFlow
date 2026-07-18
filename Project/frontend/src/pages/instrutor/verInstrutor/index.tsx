import { useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verInstrutor.css'
import axios from "axios"
import Swal from "sweetalert2"
import lixeira from '../../../assets/img/lixeira.png'
import user from '../../../assets/img/icon_user.png'
import lupa from '../../../assets/img/pesquisar.png'
import { usuarios } from './users'

function VerInstrutor(){
    const [busca, setBusca] = useState("");
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const filtro = usuarios
    .filter((item) => {
        const termo = normalizar(busca.trim());
        return (
            normalizar(item.name).includes(termo) ||
            normalizar(item.email).includes(termo) ||
            item.edv.toString().includes(termo)
        );
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    // const fetchInstrutor = async () => {
    //     try {
    //         const response = await axios.get("link backend");
    //         console.log("API RESPONSE:", response.data);
    //         setInstrutor(response.data.response);
    //     } 
    //     catch (error) {
    //         console.error("Erro:", error);
    //         setInstrutor(null);
    //     }
    // };

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
                // fetchInstrutor()
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
        <div className="instrutor">
            <Header></Header>
            <div className="instrutor-container">
                <Sidebar />
                <div className="instrutor-body">
                    <div className="instrutor-pesquisa">
                        <input type="text" className="instrutor-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button" className="instrutor-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                    </div>
                   <div className="instrutor-card-area">
                        {filtro.length > 0 ? (
                            filtro.map((instrutor) => (
                                <div className="instrutor-modal" key={instrutor.edv}>
                                    <button className="instrutor-btn-delete" onClick={() => handleDelete(instrutor.edv)}><img src={lixeira} alt="deletar" className="instrutor-deletar"/></button>
                                    <div className="instrutor-header">
                                        <img src={user} alt="user" className="instrutor-img"/>
                                        <span className="instrutor-titulo" title={instrutor.name}>{instrutor.name}</span>
                                    </div>
                                    <div className="instrutor-conteudo">
                                        <span className="instrutor-span">EDV: {instrutor.edv}</span>
                                        <span className="instrutor-span" title={instrutor.email}>Email: {instrutor.email}</span>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="instrutor-titulo">Nenhum instrutor encontrado.</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerInstrutor