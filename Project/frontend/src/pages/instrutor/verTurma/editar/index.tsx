import './editar.css'
import { useEffect, useState } from "react";
import fechar from "../../../../assets/img/close.png";
import Swal from 'sweetalert2';
import api from "../../../../services/api";
interface ITurma {
    id: number;
    nomeTurma: string;
    name_Curso: string;
    nomeInstrutor: string;
    EDV_Instrutor: number;
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    turma: ITurma | null;
}
function EditarTurma({ setVisible, turma }: Props) {
    const [nome, setNome] = useState("");
    const [curso, setCurso] = useState("");
    const [instrutorNome, setInstrutorNome] = useState("");
    const [instrutorEdv, setInstrutorEdv] = useState("");
    useEffect(() => {
        if (turma) {
            setNome(turma.nomeTurma);
            setCurso(turma.name_Curso);
            setInstrutorNome(turma.nomeInstrutor);
            setInstrutorEdv(turma.EDV_Instrutor.toString());
        }
    }, [turma]);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome || !curso || !instrutorEdv || !instrutorNome) {
        Swal.fire({
            title: "Atenção!",
            text: "Preencha os campos obrigatórios!",
            icon: "warning",
        });
        return;
    }
    try {
        const response = await api.put(
            `/turma/atualizarTurma/${turma.id}`,
            {
                nomeTurma: nome,
                name_Curso: curso,
                nomeInstrutor: instrutorNome,
                EDV_Instrutor: Number(instrutorEdv)
            }
        );
        Swal.fire({
            title: "Sucesso!",
            text: "Turma atualizada com sucesso!",
            icon: "success",
        });
        console.log(response.data);
        setVisible(false);
    } catch (e) {
        console.error(e);
        Swal.fire({
            title: "Erro!",
            text: "Não foi possível atualizar a turma.",
            icon: "error",
        });
    }
};
return (
    <div className="editarTurma-overlay" onClick={() => setVisible(false)}>
        <div className="editarTurma-card">
            <button className="editarTurma-fechar" onClick={() => setVisible(false)}><img src={fechar} alt="Fechar" /></button>
            <h1 className="editarTurma-titulo">Editar Turma</h1>
            <form className="editarTurma-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <div className="editarTurma-grupo">
                    <label className="editarTurma-label">Nome da Turma</label>
                    <input className="editarTurma-input" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="editarTurma-grupo">
                    <label className="editarTurma-label">Curso</label>
                    <input className="editarTurma-input" value={curso} onChange={(e) => setCurso(e.target.value)} />
                </div>
                <div className="editarTurma-grupo">
                    <label className="editarTurma-label">Instrutor</label>
                    <input
                        className="editarTurma-input" value={instrutorNome} onChange={(e) => setInstrutorNome(e.target.value)} />
                </div>
                <div className="editarTurma-grupo">
                    <label className="editarTurma-label">EDV do Instrutor</label>
                    <input className="editarTurma-input" value={instrutorEdv} onChange={(e) => setInstrutorEdv(e.target.value)} />
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