import './ver_competencia.css'
import icon_fechar from '../../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    competencia: {
        id: number;
        nomeCompetencia: string;
        nivel: string;
    };
}

function CompetenciaVisualizar({
    visible,
    setVisible,
    competencia
}: Props) {

    if (!visible) {
        return null
    }

    return (
        <div className="competenciaVisualizar-overlay">
            <div className="competenciaVisualizar-card">
                <div className="competenciaVisualizar-header">
                    <h2>Competência</h2>
                    <div className="competenciaVisualizar-acoes">
                        <button className="competenciaVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>
                <div className="competenciaVisualizar-conteudo">
                    <div className="competenciaVisualizar-item">
                        <span>Nome da Competência</span>
                        <p>{competencia.nomeCompetencia || "Não informado."}</p>
                    </div>
                    <div className="competenciaVisualizar-item">
                        <span>Nível</span>
                        <p>{competencia.nivel || "Não informado."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompetenciaVisualizar