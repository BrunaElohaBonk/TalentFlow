import './ver_formacao.css'
import icon_fechar from '../../../../../assets/img/close.png'

type NivelFormacao = "ENSINO_MEDIO" | "TECNICO" | "GRADUACAO" | "POS_GRADUACAO";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formacao: {
        id: number;
        name_Curso: string;
        nome_Institucao: string;
        status_Academico: "CONCLUIDO" | "CURSANDO";
        periodo_Atual: number;
        total_Periodo: number;
        nivel_formacao: NivelFormacao;
        certificado: string | null;
    };
}

function FormacaoAcademicaVisualizar({ visible, setVisible, formacao}: Props) {
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
                        <p>{formacao.name_Curso || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Nome da Instituição</span>
                        <p>{formacao.nome_Institucao || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Situação</span>
                        <p>{formacao.status_Academico ? "Concluído" : "Cursando"}</p>
                    </div>
                    {
                        formacao.status_Academico && (
                            <div className="formacaoVisualizar-item">
                                <span className='formacao-titulo'>Período Atual</span>
                                <p>{formacao.periodo_Atual || "Não informado."}</p>
                            </div>
                        )
                    }
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Total de Períodos</span>
                        <p>{formacao.total_Periodo || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span className='formacao-titulo'>Nível de Formação</span>
                        <p>{formacao.nivel_formacao || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item certificado-item">
                        <span className='formacao-titulo'>Certificado</span>
                        {
                            formacao.certificado ? (
                                <p><img src={formacao.certificado} alt="Certificado" className="certificado-img"/></p>
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