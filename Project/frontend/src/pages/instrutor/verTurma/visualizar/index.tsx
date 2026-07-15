import './visualizar.css'

interface ITurma {
    id: number;
    nome: string;
    curso: string;
    instrutorEdv: number;
    instrutorNome: string;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    turma: ITurma | null;
}

function VisualizarTurma({ visible, setVisible, turma }: Props) {

    if (!visible || !turma) return null;

    return (
        <div className="visualizar-overlay">
            <div className="visualizar-card">

                <button
                    className="visualizar-fechar"
                    onClick={() => setVisible(false)}
                >
                    ✕
                </button>

                <h1 className="visualizar-titulo">
                    {turma.nome}
                </h1>

                <div className="visualizar-conteudo">

                    <div className="visualizar-linha">
                        <span className="visualizar-label">Curso</span>
                        <span className="visualizar-valor">{turma.curso}</span>
                    </div>

                    <div className="visualizar-linha">
                        <span className="visualizar-label">Instrutor</span>
                        <span className="visualizar-valor">{turma.instrutorNome}</span>
                    </div>

                    <div className="visualizar-linha">
                        <span className="visualizar-label">EDV</span>
                        <span className="visualizar-valor">{turma.instrutorEdv}</span>
                    </div>

                </div>

                <button
                    className="visualizar-botao"
                    onClick={() => setVisible(false)}
                >
                    Fechar
                </button>

            </div>
    </div>
    );
}

export default VisualizarTurma;