import './situacao_profissional.css'
import icon_editar from '../../assets/img/icon_editar.png'
import icon_fechar from '../../assets/img/close.png'

function SituacaoProfissional({visible, setVisible, setEditarSituacao}: any) {

    if (!visible) {
        return null
    }

    // TEMPORÁRIO - REMOVER NA INTEGRAÇÃO COM BACKEND
    // Esses dados futuramente devem vir da API/banco de dados.
    // Substituir esse objeto pela resposta da API.

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
                        <p>
                            <strong>Nome do Setor:</strong> {situacao.setor || "Não informado."}
                        </p>
                        <p>
                            <strong>Nome do Líder:</strong> {situacao.lider || "Não informado."}
                        </p>
                        <p>
                            <strong>Cumprindo Estágio?</strong> {situacao.estagio || "Não informado."}
                        </p>
                        <p>
                            <strong>Situação atual e expectativas para o futuro: </strong>{situacao.descricao || "Não informado."}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SituacaoProfissional