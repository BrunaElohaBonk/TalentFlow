import { useEffect, useState } from "react";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import Swal from "sweetalert2";
import lupa from "../../../assets/img/pesquisar.png";
import lixeira from "../../../assets/img/lixeira.png";
import olho from "../../../assets/img/icon_olho.png";
import icon_editar from "../../../assets/img/icon_editar.png";
import "./verTurma.css";
import VisualizarTurma from "./visualizar";
import EditarTurma from "./editar";
import api from "../../../services/api";

interface ITurma {
    id: number;
    nomeTurma: string;
    name_Curso: string;
    EDV_Instrutor: number;
    nomeInstrutor: string;
}

function VerTurma() {
    const [visualizar, setVisualizar] = useState(false);
    const [editar, setEditar] = useState(false);
    const [turmaSelecionada, setTurmaSelecionada] = useState<ITurma | null>(null);
    const [turmas, setTurmas] = useState<ITurma[]>([]);
    const [busca, setBusca] = useState("");

    const normalizar = (texto: string) =>
        texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    const fetchTurmas = async () => {
        try {
            const response = await api.get("/turma/visualizarTurmas");

            const lista = response.data.response ?? response.data;

            setTurmas(lista);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        fetchTurmas();
    }, []);

    const filtro = turmas.filter((item) => {
        const termo = normalizar(busca.trim());

        return (
            normalizar(item.nomeTurma).includes(termo) ||
            normalizar(item.name_Curso).includes(termo) ||
            normalizar(item.nomeInstrutor).includes(termo) ||
            item.EDV_Instrutor.toString().includes(termo)
        );
    });
    const handleDelete = async (id: number) => {
        const confirm = await Swal.fire({
            title: "Tem certeza?",
            text: "A turma será deletada!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;

        try {
            await api.delete(`/turma/deletarTurma/${id}`);

            Swal.fire({
                title: "Sucesso!",
                text: "Turma removida com sucesso!",
                icon: "success",
            });

            fetchTurmas();
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Erro!",
                text: "Erro ao deletar turma.",
                icon: "error",
            });
        }
    };
    return (
        <div className="turma">
            <Header />

            <VisualizarTurma
                visible={visualizar}
                setVisible={setVisualizar}
                turma={turmaSelecionada}
            />
            <EditarTurma
                visible={editar}
                setVisible={setEditar}
                turma={turmaSelecionada}
            />
            <div className="turma-container">
                <Sidebar />
                <div className="turma-body">
                    <div className="turma-pesquisa">
                        <input
                            type="text"
                            className="turma-input"
                            placeholder="Pesquisar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <button
                            type="button"
                            className="turma-button-pesquisar"
                        >
                            <img
                                src={lupa}
                                alt="Pesquisar"
                                className="img-lupa"
                            />
                        </button>
                    </div>
                    <div className="turma-modal">
                        {filtro.length === 0 ? (
                            <p className="turma-vazia">
                                Nenhuma turma encontrada.
                            </p>
                        ) : (
                            filtro.map((item) => (
                                <div className="turma-item" key={item.id}>
                                    <span
                                        className="turma-titulo"
                                        title={item.nomeTurma}
                                    >
                                        {item.nomeTurma}
                                    </span>
                                    <div className="turma-acoes">
                                        <button
                                            className="btn-acao"
                                            onClick={() => {
                                                setTurmaSelecionada(item);
                                                setVisualizar(true);
                                            }}
                                        >
                                            <img
                                                src={olho}
                                                alt="Visualizar"
                                                className="turma-visualizar"
                                            />
                                        </button>
                                        <button
                                            className="btn-acao"
                                            onClick={() => {
                                                setTurmaSelecionada(item);
                                                setEditar(true);
                                            }}
                                        >
                                            <img
                                                src={icon_editar}
                                                alt="Editar"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            <img
                                                src={lixeira}
                                                alt="Excluir"
                                            />
                                        </button>
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

export default VerTurma;