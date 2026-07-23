import './visualizar.css'
import fechar from '../../../../assets/img/close.png'

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
        <div className="visualizar-overlay" onClick={() => setVisible(false)}>
            <div className="visualizar-card" onClick={(e) => e.stopPropagation()}>
                <button className="visualizar-fechar" onClick={() => setVisible(false)}>
                    <img src={fechar} alt="fechar" />
                </button>
                <h1 className="visualizar-titulo">{turma.nome}</h1>
                <div className="visualizar-conteudo">
                    <div className="visualizar-linha">
                        <span className="visualizar-label">Curso: {turma.curso}</span>
                    </div>
                    <div className="visualizar-linha">
                        <span className="visualizar-label">Instrutor: {turma.instrutorNome}</span>
                    </div>
                    <div className="visualizar-linha">
                        <span className="visualizar-label">EDV: {turma.instrutorEdv}</span>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarTurma;