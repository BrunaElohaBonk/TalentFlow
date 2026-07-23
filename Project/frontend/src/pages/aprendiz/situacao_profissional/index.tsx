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
            <div className="situacao-overlay" onClick={() => setVisible(false)}>
                <div className="situacao-card" onClick={(e) => e.stopPropagation()}>

                    <div className="situacao-header">
                        <h2 className='formacao-lista-titulo'>Situação Profissional</h2>
                        <div className="situacao-acoes">
                            <button className="situacao-editar" onClick={() => {
                                    setVisible(false)
                                    setEditarSituacao(true)
                                }}
                            >
                                <img src={icon_editar} alt="Editar" />
                            </button>
                            <button className="situacao-fechar" onClick={() => setVisible(false)}>
                                <img src={icon_fechar} alt="Fechar" />
                            </button>
                        </div>
                    </div>
                    <div className="situacao-conteudo">
                        <div className="situacao-item">
                            <span className='formacao-titulo'>Nome do Setor</span>
                            <p>{situacao.setor || "Não informado."}</p>
                        </div>
                        <div className="situacao-item">
                            <span className='formacao-titulo'>Nome do Líder</span>
                            <p>{situacao.lider || "Não informado."}</p>
                        </div>
                        <div className="situacao-item">
                            <span className='formacao-titulo'>Cumprindo Estágio?</span>
                            <p>{situacao.estagio || "Não informado."}</p>
                        </div>
                        <div className="situacao-item situacao-descricao">
                            <span className='formacao-titulo'>Situação atual e expectativas para o futuro</span>
                            <p>{situacao.descricao || "Não informado."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SituacaoProfissional