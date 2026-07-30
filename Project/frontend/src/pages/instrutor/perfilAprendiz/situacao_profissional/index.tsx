import './situacao_profissional.css'
import icon_fechar from '../../../../assets/img/close.png'

interface ISituacao {
    nome_Setor?: string;
    nome_Lider?: string;
    cumprido_Estagio?: boolean;
    bio_profissional?: string;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    situacao: ISituacao;
}

function SituacaoProfissional({visible, setVisible, situacao}: Props) {
    if (!visible) {
        return null
    }

    return (
        <div className="situacao-overlay" onClick={() => setVisible(false)}>
            <div className="situacao-card" onClick={(e) => e.stopPropagation()}>
                <div className="situacao-header">
                    <h2 className='formacao-lista-titulo'>Situação Profissional</h2>
                    <div className="situacao-acoes"><button className="situacao-fechar" onClick={() => setVisible(false)}><img src={icon_fechar} alt="Fechar" /></button></div>
                </div>
                <div className="situacao-conteudo">
                    <div className="situacao-item">
                        <span className='formacao-titulo'>Nome do Setor</span>
                        <p>{situacao.nome_Setor || "Não informado."}</p>
                    </div>
                    <div className="situacao-item">
                        <span className='formacao-titulo'>Nome do Líder</span>
                        <p>{situacao.nome_Lider || "Não informado."}</p>
                    </div>
                    <div className="situacao-item">
                        <span className='formacao-titulo'>Cumprindo Estágio?</span>
                        <p>{situacao.cumprido_Estagio ? "Sim" : "Não"}</p>
                    </div>
                    <div className="situacao-item situacao-descricao">
                        <span className='formacao-titulo'>Situação atual e expectativas para o futuro</span>
                        <p>{situacao.bio_profissional || "Não informado."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SituacaoProfissional