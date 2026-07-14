import { useEffect, useState } from "react"
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verInstrutor.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import lixeira from '../../../assets/img/lixeira.png'
import user from '../../../assets/img/icon_user.png'
import direita from '../../../assets/img/direita.png'
import esquerda from '../../../assets/img/esquerda.png'
import lupa from '../../../assets/img/pesquisar.png'
import { usuarios } from './users'

function VerInstrutor(){
    const [busca, setBusca] = useState("");
    const [instrutor, setInstrutor] = useState(usuarios[0]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const pesquisar = () => {
        const termo = busca.toLowerCase().trim();
        const encontrado = usuarios.find((item) =>
            item.edv.toString().includes(termo) ||
            item.name.toLowerCase().includes(termo) ||
            item.email.toLowerCase().includes(termo)
        );
        if (!encontrado) {
            Swal.fire({
                title: "Atenção!",
                text: "Nenhum instrutor encontrado.",
                icon: "warning",
            });
            return;
        }
        const novoIndice = usuarios.findIndex(
            (item) => item.edv === encontrado.edv
        );
        setInstrutor(encontrado);
        setIndiceAtual(novoIndice);
    };
    const proximoInstrutor = () => {
        if (indiceAtual < usuarios.length - 1) {
            const novoIndice = indiceAtual + 1;
            setIndiceAtual(novoIndice);
            setInstrutor(usuarios[novoIndice]);
        }
    };

    const instrutorAnterior = () => {
        if (indiceAtual > 0) {
            const novoIndice = indiceAtual - 1;
            setIndiceAtual(novoIndice);
            setInstrutor(usuarios[novoIndice]);
        }
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
    // useEffect(() => {
    //     fetchInstrutor();
    // }, []);

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
                        <button type="button" className="instrutor-button-pesquisar" onClick={pesquisar}>
                            <img src={lupa} alt="lupa" className="img-lupa"/>
                        </button>
                    </div>
                    <div className="instrutor-card-area">
                        <button className="instrutor-seta-btn instrutor-esquerda" onClick={instrutorAnterior}>
                            <img src={esquerda} alt="esquerda" className="instrutor-seta"/>
                        </button>
                        <div className="instrutor-modal">
                            <button className="instrutor-btn-delete" onClick={() => handleDelete(instrutor.edv)}>
                                <img src={lixeira} alt="deletar" className="instrutor-deletar"/>
                            </button>
                            <div className="instrutor-header">
                                <img src={user} alt="user" className="instrutor-img"/>
                                <span className="instrutor-titulo">{instrutor?.name}</span>
                            </div>
                            <div className="instrutor-conteudo">
                                <span className="instrutor-span">EDV: {instrutor?.edv}</span>
                                <span className="instrutor-span">Email: {instrutor?.email}</span>
                            </div>
                        </div>
                        <button className="instrutor-seta-btn instrutor-direita" onClick={proximoInstrutor}>
                            <img src={direita} alt="direita" className="instrutor-seta"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerInstrutor