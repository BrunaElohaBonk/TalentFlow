import { useParams } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import './cadTurma.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface ITurma {
    id?: number;
    name: string;
    course: string;
    edvInstrutor: string;
    instrutor: string;
}

function CadTurma() {
    const { id } = useParams();
    const nameRef = useRef<HTMLInputElement>(null);
    const courseRef = useRef<HTMLInputElement>(null);
    const edvInstrutorRef = useRef<HTMLInputElement>(null);
    const instrutorRef = useRef<HTMLInputElement>(null);
    const salvarRef = useRef<HTMLButtonElement>(null);
    const proximoCampo = (e: React.KeyboardEvent<HTMLInputElement>, proximo: React.RefObject<HTMLElement | null>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            proximo.current?.focus();
        }};
    const [turma, setTurma] = useState<ITurma>({
        name: '',
        course: '',
        edvInstrutor: '',
        instrutor: '',
    });
    const fetchTurma = async () => {
        try {
            const response = await axios.get(`link backend`);
            const Turma = response.data.response;
            setTurma({
                name: Turma.name || '',
                course: Turma.course || '',
                edvInstrutor: Turma.edvInstrutor?.toString() || '',
                instrutor: Turma.instrutor || ''
            });
        } 
        catch (e) {
            console.error('Erro:', e);
        }
    };
    useEffect(() => {
        if (id) {
            fetchTurma();
        }
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTurma({
            ...turma, 
            [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!turma.name || !turma.course || !turma.edvInstrutor || !turma.instrutor){
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await axios.put(
                `link backend`,
                {
                    ...turma,
                    edvInstrutor: Number(turma.edvInstrutor)
                }
            );
            Swal.fire({
                title: 'Sucesso!',
                text: 'Turma cadastrada com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
        } 
        catch (e) {
            console.error('Erro ao cadastrar:', e);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível cadastrar a turma',
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
                    <form onSubmit={handleSubmit} className="cadTurma-form">
                        <span className="cadTurma-titulo">Cadastrar Turma</span>
                        <div className="cadTurma-conteudo">
                            <input ref={nameRef} name="name" placeholder="Nome da Turma" value={turma.name} onChange={handleChange} className="cadTurma-input" onKeyDown={(e) => proximoCampo(e, courseRef)}/>
                            <input ref={courseRef} name="course" placeholder="Curso" value={turma.course} onChange={handleChange} className="cadTurma-input" onKeyDown={(e) => proximoCampo(e, edvInstrutorRef)}/>
                            <input ref={edvInstrutorRef} name="edvInstrutor" type="number" placeholder="EDV do Instrutor" value={turma.edvInstrutor} onChange={handleChange} className="cadTurma-input" onKeyDown={(e) => proximoCampo(e, instrutorRef)}/>
                            <input ref={instrutorRef} name="instrutor" placeholder="Nome do Instrutor" value={turma.instrutor} onChange={handleChange} className="cadTurma-input" onKeyDown={(e) => proximoCampo(e, salvarRef)}/>
                        </div>
                        <div className="cadTurma-button">
                            <button ref={salvarRef} type="submit" className="cadTurma-salvar">CONFIRMAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadTurma;