import Swal from "sweetalert2";
import axios from "axios";
import olho from "../../../../assets/img/icon_olho.png";
import fechar from "../../../../assets/img/close.png";
import { useState } from "react";
import FormacaoAcademicaVisualizar from "./ver/ver_formacao";
import "./formacao_academica.css";

interface IFormacao {
    nomeCurso: string,
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formacaoAcademica: IFormacao[]
}

function FormacaoAcademica({
    visible,
    setVisible,
    formacaoAcademica
}: Props) {
    const [visualizarFormacao, setVisualizarFormacao] = useState(false);
    const [formacaoSelecionada, setFormacaoSelecionada] = useState<any>(null);

    if (!visible) {
        return null;
    }

    const handleDelete = async (id: number) => {
        const confirm = await Swal.fire({
            title: "Tem certeza?",
            text: "A Formação Acadêmica será deletada!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) {
            return;
        }

        try {
            await axios.delete(`link backend/${id}`);

            Swal.fire({
                title: "Deletada!",
                text: "Formação removida com sucesso!",
                icon: "success",
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Erro!",
                text: "Erro ao deletar formação.",
                icon: "error",
            });
        }
    };

    return (
        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header">
                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => setVisible(false)}
                    >
                        <img
                            src={fechar}
                            alt="Fechar"
                            className="icon-fechar-img"
                        />
                    </button>
                </div>
                <span className="formacao-lista-titulo">Formação Acadêmica</span>
                <div className="formacao-modal">
                    {formacaoAcademica.map((item, index) => (
                        <div className="formacao-item" key={index}>
                            <span className="formacao-titulo">
                                {item.nomeCurso}
                            </span>

                            <div className="formacao-acoes">
                                <button
                                    type="button"
                                    className="btn-acao"
                                    onClick={() => {
                                        setFormacaoSelecionada(item);
                                        setVisualizarFormacao(true);
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
                    ))}
                </div>

                {visualizarFormacao && formacaoSelecionada && (
                    <FormacaoAcademicaVisualizar
                        visible={visualizarFormacao}
                        setVisible={setVisualizarFormacao}
                        formacao={formacaoSelecionada}
                    />
                )}
            </div>
        </div>
    );
}

export default FormacaoAcademica;