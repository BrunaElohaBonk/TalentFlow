import './ver_formacao.css'
import icon_fechar from '../../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formacao: {
        nomeCurso: string;
        instituicao: string;
        status: boolean;
        periodoAtual: number;
        totalPeriodos: number;
        nivelFormacao: string;
        descricaoCurso: string;
        certificado: File | null;
    };
}

function FormacaoAcademicaVisualizar({
    visible,
    setVisible,
    formacao
}: Props) {

    if (!visible) {
        return null
    }

    return (
        <div className="formacaoVisualizar-overlay" onClick={() => setVisible(false)}>
            <div className="formacaoVisualizar-card" onClick={(e) => e.stopPropagation()}>
                <div className="formacaoVisualizar-header">
                    <h2 className='formacao-lista-titulo'>Formação Acadêmica</h2>
                    <div className="formacaoVisualizar-acoes">
                        <button className="formacaoVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>
                <div className="formacaoVisualizar-conteudo">
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Nome do Curso</span>
                        <p>{formacao.nomeCurso || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Nome da Instituição</span>
                        <p>{formacao.instituicao || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Situação</span>
                        <p>{formacao.status ? "Concluído" : "Cursando"}</p>
                    </div>
                    {
                        formacao.status && (
                            <div className="formacaoVisualizar-item">
                                <span className='formacao-titulo'>Período Atual</span>
                                <p>{formacao.periodoAtual || "Não informado."}</p>
                            </div>
                        )
                    }
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Total de Períodos</span>
                        <p>{formacao.totalPeriodos || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Nível de Formação</span>
                        <p>{formacao.nivelFormacao || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item formacaoVisualizar-descricao">
                        <span className='formacao-titulo'>Descrição</span>
                        <p>{formacao.descricaoCurso || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item certificado-item">
                        <span className='formacao-titulo'>Certificado</span>
                        {
                            formacao.certificado ? (
                                <p>
                                    <img src={URL.createObjectURL(formacao.certificado)} alt="Certificado" className="certificado-img"/>
                                </p>
                            ) : (
                                <p>Não incluído</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormacaoAcademicaVisualizar