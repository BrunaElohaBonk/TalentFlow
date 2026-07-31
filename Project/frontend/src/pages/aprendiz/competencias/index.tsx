import Swal from "sweetalert2";
import axios from "axios";
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import CompetenciaVisualizar from "./ver/ver_competencia";
import './competencias.css'
import EditarCompetencia from "./editar/editar_competencia";
import AdicionarCompetencia from "./adicionar/adicionar_competencia";
import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Perfil {
    id: number,
    EDV_Aprendiz: number,
    competencias: Competencias[],
}
interface Competencias {
    id: number;
    Id_Profile: number;
    nome_Competencia: String;
    nivel_Competencia: string;
};
interface user {
    edv: number;
}

function Competencia({ visible, setVisible }: Props) {

    const [visualizarCompetencia, setVisualizarCompetencia] = useState(false);
    const [competenciaSelecionada, setCompetenciaSelecionada] = useState<any>(null);
    const [editarCompetencia, setEditarCompetencia] = useState(false);
    const [adicionarCompetencia, setAdicionarCompetencia] = useState(false);
    const [apireq, setApireq] = useState<Perfil | null>(null);
    const [aprendiz, setAprendiz] = useState<user | null>(null);
    useEffect(() => {
        async function carregarPerfil() {
            const usuario = localStorage.getItem("usuario");
            if (!usuario) return;
            const aprendizLogado = JSON.parse(usuario);
            const edv = aprendizLogado.user.EDV;
            setAprendiz({ edv });

            const response = await api.get(`/aprendiz/meuPerfil/${edv}`);
            setApireq(response.data.data)
        }
        carregarPerfil();
    }, []);

    if (!visible) {
        return null
    }

    const handleDelete = async (id: number) => {

        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O Curso Complementar será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })

        if (!confirm.isConfirmed) {
            return
        }

        try {
            await axios.delete(`link backend/${id}`)
            Swal.fire({
                title: 'Deletado!',
                text: 'Curso Complementar removido com sucesso!',
                icon: 'success'
            })
        }
        catch (error) {
            console.error('Erro ao deletar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar Curso Complementar',
                icon: 'error'
            })
        }
    }

    return (
        <div className="competencia-container" onClick={() => setVisible(false)}>
            <div className="competencia-body" onClick={(e) => e.stopPropagation()}>
                <div className="competencia-header">
                    <button type="button" className="btn-header" onClick={() => setAdicionarCompetencia(true)}>
                        <img src={adicionar} alt="adicionar" />
                    </button>
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}>
                        <img src={fechar} alt="fechar" className="icon-fechar-img" />
                    </button>
                </div>
                <span className="competencia-lista-titulo">Competências</span>
                <div className="competencia-modal">
                    {
                        apireq.competencias.length === 0 ?
                            <p className="competencia-vazia">Nenhuma formação acadêmica encontrada.</p>
                            :
                            apireq?.competencias?.map((item) => (
                                <div className="competencia-item" key={item.id}>
                                    <span className="competencia-titulo">{item.nome_Competencia}</span>
                                    <div className="competencia-acoes">
                                        <button type="button" className="btn-acao" onClick={() => {
                                            setCompetenciaSelecionada(item);
                                            setVisualizarCompetencia(true);
                                        }}
                                        >
                                            <img src={olho} alt="Visualizar" className="icon-olho" />
                                        </button>
                                        <button type="button" className="btn-acao" onClick={() => {
                                            setCompetenciaSelecionada(item);
                                            setEditarCompetencia(true);
                                        }}
                                        >
                                            <img src={icon_editar} alt="Editar" />
                                        </button>
                                        <button type="button" className="btn-acao" onClick={() => handleDelete(item.id)}>
                                            <img src={lixeira} alt="Excluir" />
                                        </button>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                {
                    visualizarCompetencia && competenciaSelecionada && (
                        <CompetenciaVisualizar
                            visible={visualizarCompetencia}
                            setVisible={setVisualizarCompetencia}
                            competencia={competenciaSelecionada}
                        />
                    )
                }
                {
                    editarCompetencia && competenciaSelecionada && (
                        <EditarCompetencia
                            visible={editarCompetencia}
                            setVisible={setEditarCompetencia}
                            setCompetencia={setVisible}
                            id={competenciaSelecionada.id}
                        />
                    )
                }
                {
                    adicionarCompetencia && (
                        <AdicionarCompetencia
                            visible={adicionarCompetencia}
                            setVisible={setAdicionarCompetencia}
                            setCompetencia={setVisible}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Competencia