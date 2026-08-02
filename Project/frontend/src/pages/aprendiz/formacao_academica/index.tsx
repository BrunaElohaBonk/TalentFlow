import Swal from "sweetalert2";
import lixeira from "../../../assets/img/lixeira.png";
import olho from "../../../assets/img/icon_olho.png";
import icon_editar from "../../../assets/img/icon_editar.png";
import adicionar from "../../../assets/img/icon adicionar.png";
import fechar from "../../../assets/img/close.png";
import FormacaoAcademicaVisualizar from "./ver/ver_formacao";
import "./formacao_academica.css";
import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditarFormacao: React.Dispatch<React.SetStateAction<boolean>>;
    setAdicionarFormacao: React.Dispatch<React.SetStateAction<boolean>>;
    setFormacaoSelecionada: React.Dispatch<React.SetStateAction<Formacao | null>>;
    onSuccess: () => void;
}

interface Formacao {
    id: number;
    Id_Profile: number;
    name_Curso: string;
    nome_Institucao: string;
    status_Academico: string;
    periodo_Atual: number;
    total_Periodo: number;
    nivel_formacao: string;
    certificado: string | null;
}

function FormacaoAcademica({
    visible,
    setVisible,
    onSuccess,
    setEditarFormacao,
    setAdicionarFormacao,
    setFormacaoSelecionada
}: Props) {
    const [visualizarFormacao, setVisualizarFormacao] = useState(false);
    const [formacoes, setFormacoes] = useState<Formacao[]>([]);
    const [formacaoVisualizar, setFormacaoVisualizar] = useState<Formacao | null>(null);
    const [edv, setEdv] = useState(0);

    const carregarFormacoes = async () => {
        try {
            const usuario = localStorage.getItem("usuario");

            if (!usuario) return;

            const aprendiz = JSON.parse(usuario);
            const EDV = aprendiz.user.EDV;

            setEdv(EDV);

            const response = await api.get(
                `/aprendiz/meuPerfil/${EDV}`
            );

            setFormacoes(
                response.data.data.formacao_academica
            );

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (visible) {
            carregarFormacoes();
        }
    }, [visible]);

    if (!visible) {
        return null;
    }
     async function atualizarTudo() {
        await carregarFormacoes();
        onSuccess();
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

        if (!confirm.isConfirmed) return;

        try {
            await api.delete(`/aprendiz/deletarformacao/${edv}/${id}`);

            setFormacoes((prev) =>
                prev.filter((formacao) => formacao.id !== id)
            );

            await Swal.fire({
                title: "Deletada!",
                text: "Formação removida com sucesso!",
                icon: "success",
            });
            onSuccess();
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
                        onClick={() => {
                            setVisible(false);
                            setAdicionarFormacao(true);
                        }}
                    >
                        <img src={adicionar} alt="Adicionar" />
                    </button>

                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => setVisible(false)}
                    >
                        <img src={fechar} alt="Fechar" className="icon-fechar-img" />
                    </button>
                </div>

                <span className="formacao-lista-titulo">
                    Formação Acadêmica
                </span>

                <div className="formacao-modal">
                    {
                        formacoes.length === 0 ?
                            <p>Nenhuma formação encontrada.</p>
                            :
                            formacoes.map((item) => (
                                <div className="formacao-item" key={item.id}>
                                    <span className="formacao-titulo">
                                        {item.name_Curso}
                                    </span>

                                    <div className="formacao-acoes">
                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => {
                                                setFormacaoVisualizar(item);
                                                setVisualizarFormacao(true);
                                            }}
                                        >
                                            <img src={olho} alt="Visualizar" className="icon-olho" />
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => {
                                                setFormacaoSelecionada(item);
                                                setVisible(false);
                                                setEditarFormacao(true);
                                            }}
                                        >
                                            <img src={icon_editar} alt="Editar" />
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <img src={lixeira} alt="Excluir" />
                                        </button>
                                    </div>
                                </div>
                            ))
                    }
                </div>

                {
                    visualizarFormacao && formacaoVisualizar && (
                        <FormacaoAcademicaVisualizar
                            visible={visualizarFormacao}
                            setVisible={setVisualizarFormacao}
                            onSuccess={atualizarTudo}
                            formacao={formacaoVisualizar}
                            edv={edv}
                            atualizarFormacoes={carregarFormacoes}
                        />
                    )
                }
            </div>
        </div >
    );
}

export default FormacaoAcademica;