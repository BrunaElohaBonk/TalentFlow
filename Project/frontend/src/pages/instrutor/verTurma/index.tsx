import { useState } from "react";
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import { turmas } from './turma'
import Swal from "sweetalert2";
import axios from "axios";
import lupa from '../../../assets/img/pesquisar.png'
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import './verTurma.css'
import VisualizarTurma from "./visualizar";
import EditarTurma from "./editar";

function VerTurma(){
    const [visualizar, setVisualizar] = useState(false);
    const [editar, setEditar] = useState(false);
    const [turmaSelecionada, setTurmaSelecionada] = useState<any>(null);
    const [busca, setBusca] = useState("");
    const turmasFiltradas = turmas.filter((item) => {
        const termo = busca.toLowerCase().trim();
        return (
            item.nome.toLowerCase().includes(termo) ||
            item.curso.toLowerCase().includes(termo) ||
            item.instrutorNome.toLowerCase().includes(termo) ||
            item.instrutorEdv.toString().includes(termo)
        );
    });
    // const fetchTurma = async () => {
    //     try {
    //         const response = await axios.get("link backend");
    //         console.log("API RESPONSE:", response.data);
    //         setTurma(response.data.response);
    //     } 
    //     catch (error) {
    //         console.error("Erro:", error);
    //         setTurma(null);
    //     }
    // };
    // useEffect(() => {
    //     fetchTurma();
    // }, []);
    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'A turma será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })

        if (!confirm.isConfirmed) return
            try {
                await axios.delete(`link backend/`)
                Swal.fire({
                    title: 'Deletado!',
                    text: 'Turma removida com sucesso!',
                    icon: 'success'
                })
                // fetchTurma()
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
    return (
        <div>
            <Header />
            <VisualizarTurma visible={visualizar} setVisible={setVisualizar} turma={turmaSelecionada}/>
            <EditarTurma visible={editar} setVisible={setEditar} turma={turmaSelecionada}/>
            <div className="turma-container">
                <Sidebar />
                <div className="turma-body">
                    <div className="turma-pesquisa">
                        <input type="text" className="turma-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button"className="turma-button-pesquisar"> <img src={lupa} alt="Pesquisar" className="img-lupa"/></button>
                    </div>
                    <div className="turma-modal">
                        {turmasFiltradas.length === 0 ? (<p className="turma-vazia">Nenhuma turma encontrada.</p>) : (
                            turmasFiltradas.map((item) => (
                                <div className="turma-item" key={item.id}>
                                    <span className="turma-titulo">{item.nome}</span>
                                    <div className="turma-acoes">
                                        <button className="btn-acao" onClick={() => { setTurmaSelecionada(item); setVisualizar(true);}}><img src={olho} alt="Visualizar" className="turma-visualizar"/></button>
                                        <button className="btn-acao" onClick={() => { setTurmaSelecionada(item); setEditar(true);}}><img src={icon_editar} alt="Editar" /></button>
                                        <button type="button" className="btn-acao" onClick={handleDelete}><img src={lixeira} alt="Excluir"/></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VerTurma