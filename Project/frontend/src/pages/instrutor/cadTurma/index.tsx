import { useParams } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import './cadTurma.css';
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import api from "../../../services/api";

interface ITurma {
    id?: number;
    nomeTurma: string;
    name_Curso: string;
    EDV_Instrutor: string;
    nomeInstrutor: string;
}

function CadTurma() {
    const { id } = useParams();
    const nameRef = useRef<HTMLInputElement>(null);
    const courseRef = useRef<HTMLInputElement>(null);
    const edvInstrutorRef = useRef<HTMLInputElement>(null);
    const instrutorRef = useRef<HTMLInputElement>(null);
    const salvarRef = useRef<HTMLButtonElement>(null);
    const [turma, setTurma] = useState<ITurma>({
        nomeTurma: '',
        name_Curso: '',
        EDV_Instrutor: '',
        nomeInstrutor: '',
    });
    const proximoCampo = (
        e: React.KeyboardEvent<HTMLInputElement>,
        proximo: React.RefObject<HTMLElement | null>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            proximo.current?.focus();
        }
    };
    const fetchTurma = async () => {
        try {
            const response = await api.get(`/turma/buscarTurma/${id}`);
            const Turma = response.data;
            setTurma({
                nomeTurma: Turma.nomeTurma || '',
                name_Curso: Turma.name_Curso || '',
                EDV_Instrutor: Turma.EDV_Instrutor?.toString() || '',
                nomeInstrutor: Turma.nomeInstrutor || ''
            });
        } catch (e) {
            console.error("Erro:", e);
        }
    };
    useEffect(() => {

        if (id) {
            fetchTurma();
        }
    }, [id]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTurma({
            ...turma,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (
            !turma.nomeTurma ||
            !turma.name_Curso ||
            !turma.EDV_Instrutor ||
            !turma.nomeInstrutor
        ) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await api.post(
                "/turma/criarTurma",
                {
                    nomeTurma: turma.nomeTurma,
                    name_Curso: turma.name_Curso,
                    EDV_Instrutor: Number(turma.EDV_Instrutor),
                    nomeInstrutor: turma.nomeInstrutor
                }
            );

            Swal.fire({
                title: 'Sucesso!',
                text: 'Turma criada com sucesso!',
                icon: 'success'
            });

            console.log(response.data);

        } catch (e: any) {
            console.error(e);
            Swal.fire({
                title: 'Erro!',
                text: e.response?.data?.message || "Erro ao criar turma",
                icon: 'error'
            });
        }
    };
    return (
        <div className="cadTurma">
            <Header />
            <div className="cadTurma-container">
                <Sidebar />
                <div className="cadTurma-body">
                    <form
                        onSubmit={handleSubmit}
                        className="cadTurma-form"
                    >
                        <span className="cadTurma-titulo">
                            Cadastrar Turma
                        </span>
                        <div className="cadTurma-conteudo">
                            <input
                                ref={nameRef}
                                name="nomeTurma"
                                placeholder="Nome da Turma"
                                value={turma.nomeTurma}
                                onChange={handleChange}
                                className="cadTurma-input"
                                onKeyDown={(e) => proximoCampo(e, courseRef)}
                            />
                            <input
                                ref={courseRef}
                                name="name_Curso"
                                placeholder="Curso"
                                value={turma.name_Curso}
                                onChange={handleChange}
                                className="cadTurma-input"
                                onKeyDown={(e) => proximoCampo(e, edvInstrutorRef)}
                            />
                            <input
                                ref={edvInstrutorRef}
                                name="EDV_Instrutor"
                                type="number"
                                placeholder="EDV do Instrutor"
                                value={turma.EDV_Instrutor}
                                onChange={handleChange}
                                className="cadTurma-input"
                                onKeyDown={(e) => proximoCampo(e, instrutorRef)}
                            />
                            <input
                                ref={instrutorRef}
                                name="nomeInstrutor"
                                placeholder="Nome do Instrutor"
                                value={turma.nomeInstrutor}
                                onChange={handleChange}
                                className="cadTurma-input"
                                onKeyDown={(e) => proximoCampo(e, salvarRef)}
                            />
                        </div>
                        <div className="cadTurma-button">
                            <button
                                ref={salvarRef}
                                type="submit"
                                className="cadTurma-salvar"
                            >
                                CONFIRMAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadTurma;