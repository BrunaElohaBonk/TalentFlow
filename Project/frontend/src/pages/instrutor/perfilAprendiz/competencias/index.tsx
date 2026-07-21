import Swal from "sweetalert2";
import axios from "axios";
import olho from '../../../../assets/img/icon_olho.png'
import fechar from '../../../../assets/img/close.png'
import CompetenciaVisualizar from "./ver/ver_competencia";
import './competencias.css'
import { useState } from "react";

interface ICompetencia {
    nome: string;
    nivel: string;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    competencias: ICompetencia[];
}

function Competencia({ visible, setVisible, competencias }: Props) {
    const [visualizarCompetencia, setVisualizarCompetencia] = useState(false);
    const [competenciaSelecionada, setCompetenciaSelecionada] = useState<any>(null);
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

        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header" >
                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => setVisible(false)}
                    >
                        <img src={fechar} alt="fechar" className="icon-fechar-img" />
                    </button>
                </div>
                <div className="formacao-modal" >
                    {
                        competencias.length === 0 ?
                            <p className="formacao-vazia">
                                Nenhuma formação acadêmica encontrada.
                            </p>
                            :
                            competencias.map((item, index) => (
                                <div
                                    className="formacao-item"
                                    key={index}
                                >
                                    <span className="formacao-titulo">
                                        {item.nome}
                                    </span>
                                    <div className="formacao-acoes">
                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => {
                                                setCompetenciaSelecionada(item);
                                                setVisualizarCompetencia(true);
                                            }}
                                        >
                                            <img
                                                src={olho}
                                                alt="Visualizar"
                                                className="icon-olho"
                                            />
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
            </div>
        </div>
    )
}

export default Competencia