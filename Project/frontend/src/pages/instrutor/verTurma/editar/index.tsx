import './editar.css'
import { useEffect, useState } from "react";
import fechar from "../../../../assets/img/close.png";
import Swal from 'sweetalert2';
import axios from 'axios';
interface ITurma {
    id: number;
    nome: string;
    curso: string;
    instrutorNome: string;
    instrutorEdv: number;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    turma: ITurma | null;
}

function EditarTurma({ visible, setVisible, turma }: Props) {
    const [nome, setNome] = useState("");
    const [curso, setCurso] = useState("");
    const [instrutorNome, setInstrutorNome] = useState("");
    const [instrutorEdv, setInstrutorEdv] = useState("");
    useEffect(() => {
        if (turma) {
            setNome(turma.nome);
            setCurso(turma.curso);
            setInstrutorNome(turma.instrutorNome);
            setInstrutorEdv(turma.instrutorEdv.toString());
        }
    }, [turma]);
    if (!visible || !turma) return null;
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nome || !curso || !instrutorEdv || !instrutorNome) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await axios.put(`link backend`, {
                id: turma.id,
                nome,
                curso,
                instrutorNome,
                instrutorEdv: Number(instrutorEdv)
            });
            Swal.fire({
                title: 'Sucesso!',
                text: 'A turma foi atualizada com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
        } 
        catch (e) {
            console.error('Erro ao atualizar:', e);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar a turma',
                icon: 'error'
            });
        }
    };

    return (
        <div className="editarTurma-overlay">
            <div className="editarTurma-card">
                <button className="editarTurma-fechar" onClick={() => setVisible(false)}><img src={fechar} alt="Fechar" /></button>
                <h1 className="editarTurma-titulo">Editar Turma</h1>
                <form className="editarTurma-form" onSubmit={handleSubmit}>
                    <div className="editarTurma-grupo">
                        <label className="editarTurma-label">Nome da Turma</label>
                        <input className="editarTurma-input" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="editarTurma-grupo">
                        <label className="editarTurma-label">Curso</label>
                        <input className="editarTurma-input" value={curso} onChange={(e) => setCurso(e.target.value)}/>
                    </div>
                    <div className="editarTurma-grupo">
                        <label className="editarTurma-label">Instrutor</label>
                        <input
                            className="editarTurma-input" value={instrutorNome} onChange={(e) => setInstrutorNome(e.target.value)}/>
                    </div>
                    <div className="editarTurma-grupo">
                        <label className="editarTurma-label">EDV do Instrutor</label>
                        <input className="editarTurma-input" value={instrutorEdv} onChange={(e) => setInstrutorEdv(e.target.value)}/>
                    </div>
                    <div className="editarTurma-botoes">
                        <button type="submit" className="editarTurma-salvar">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarTurma;