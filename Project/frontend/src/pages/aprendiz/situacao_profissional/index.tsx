import './situacao_profissional.css'
import icon_editar from '../../../assets/img/icon_editar.png'
import icon_fechar from '../../../assets/img/close.png'

function SituacaoProfissional({visible, setVisible, setEditarSituacao}: any) {

    if (!visible) {
        return null
    }

    const situacao = {
        setor: "",
        lider: "",
        estagio: "",
        descricao: ""
    }

    return (
        <>
            <div className="situacao-overlay">
                <div className="situacao-card">
                    <div className="situacao-header">
                        <h2>
                            Situação Profissional
                        </h2>

                        <div className="situacao-acoes">

                            <button
                                className="situacao-editar"
                                onClick={() => {
                                    setVisible(false)
                                    setEditarSituacao(true)
                                }}
                            >
                                <img src={icon_editar} alt="Editar" />
                            </button>

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
                                {situacao.setor || "Não informado."}
                            </p>
                        </div>


                        <div className="situacao-item">
                            <span>
                                Nome do Líder
                            </span>
                            <p>
                                {situacao.lider || "Não informado."}
                            </p>
                        </div>


                        <div className="situacao-item">
                            <span>
                                Cumprindo Estágio?
                            </span>
                            <p>
                                {situacao.estagio || "Não informado."}
                            </p>
                        </div>


                        <div className="situacao-item situacao-descricao">

                            <span>
                                Situação atual e expectativas para o futuro
                            </span>

                            <p>
                                {situacao.descricao || "Não informado."}
                            </p>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SituacaoProfissional