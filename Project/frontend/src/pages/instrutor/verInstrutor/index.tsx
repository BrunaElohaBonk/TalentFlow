import { useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verInstrutor.css'
import axios from "axios"
import Swal from "sweetalert2"
import lixeira from '../../../assets/img/lixeira.png'
import user from '../../../assets/img/icon_user.png'
import direita from '../../../assets/img/direita.png'
import esquerda from '../../../assets/img/esquerda.png'
import lupa from '../../../assets/img/pesquisar.png'
import { usuarios } from './users'

function VerInstrutor(){
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [busca, setBusca] = useState("");
    const instrutoresFiltrados = usuarios.filter((item) => {
        const termo = busca.toLowerCase().trim();
        return (
            item.name.toLowerCase().includes(termo) ||
            item.email.toLowerCase().includes(termo) ||
            item.edv.toString().includes(termo)
        );
    });
    const instrutor =  instrutoresFiltrados[indiceAtual];
    const proximoInstrutor = () => {
        if (instrutoresFiltrados.length === 0) return;
        setIndiceAtual((atual) =>
            atual === instrutoresFiltrados.length - 1 ? 0 : atual + 1
        );
    };
    const instrutorAnterior = () => {
        if (instrutoresFiltrados.length === 0) return;
        setIndiceAtual((atual) =>
            atual === 0 ? instrutoresFiltrados.length - 1 : atual - 1
        );
    };

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
        <div>
            <Header></Header>
            <div className="instrutor-container">
                <Sidebar />
                <div className="instrutor-body">
                    <div className="instrutor-pesquisa">
                        <input type="text" className="instrutor-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button" className="instrutor-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                    </div>
                    <div className="instrutor-card-area">
                        <button className="instrutor-seta-btn instrutor-esquerda" onClick={instrutorAnterior}><img src={esquerda} alt="esquerda" className="instrutor-seta"/></button>
                        {instrutor? (
                            <div className="instrutor-modal">
                                <button className="instrutor-btn-delete" onClick={() => handleDelete(instrutor.edv)}><img src={lixeira} alt="deletar" className="instrutor-deletar"/></button>
                                <div className="instrutor-header">
                                    <img src={user} alt="user" className="instrutor-img"/>
                                    <span className="instrutor-titulo">{instrutor?.name}</span>
                                </div>
                                <div className="instrutor-conteudo">
                                    <span className="instrutor-span">EDV: {instrutor?.edv}</span>
                                    <span className="instrutor-span">Email: {instrutor?.email}</span>
                                </div>
                            </div>
                        ):(<div className="instrutor-titulo"><p>Nenhum instrutor encontrado.</p></div>)}
                        <button className="instrutor-seta-btn instrutor-direita" onClick={proximoInstrutor}><img src={direita} alt="direita" className="instrutor-seta"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerInstrutor