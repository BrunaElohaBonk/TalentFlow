import './situacao_profissional.css'
import icon_fechar from '../../../../assets/img/close.png'

interface ISituacao {
    nomeSetor: string;
    nomeLider: string;
    cumprindoEstagio: boolean;
    descricaoEstagio: string;
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
        <>
            <div className="situacao-overlay" onClick={() => setVisible(false)}>
                <div className="situacao-card" onClick={(e) => e.stopPropagation()}>

                    <div className="situacao-header">
                        <h2>
                            Situação Profissional
                        </h2>

                        <div className="situacao-acoes">
                            <button
                                className="situacao-fechar"
                                onClick={() => setVisible(false)}
                            >
                                <img src={icon_fechar} alt="Fechar" />
                            </button>

                        </div>

                    </div>


                    <div className="situacao-conteudo">

                        <div className="situacao-item">
                            <span>
                                Nome do Setor
                            </span>
                            <p>
                                {situacao.nomeSetor || "Não informado."}
                            </p>
                        </div>


                        <div className="situacao-item">
                            <span>
                                Nome do Líder
                            </span>
                            <p>
                                {situacao.nomeLider || "Não informado."}
                            </p>
                        </div>


                        <div className="situacao-item">
                            <span>
                                Cumprindo Estágio?
                            </span>
                            <p>
                                {situacao.cumprindoEstagio ? "Sim" : "Não"}
                            </p>
                        </div>


                        <div className="situacao-item situacao-descricao">

                            <span>
                                Situação atual e expectativas para o futuro
                            </span>

                            <p>
                                {situacao.descricaoEstagio || "Não informado."}
                            </p>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SituacaoProfissional