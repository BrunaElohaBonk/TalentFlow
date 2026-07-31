import './ver_formacao.css'
import icon_fechar from '../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formacao: {
        id: number;
        Id_Profile: number;
        name_Curso: string;
        nome_Institucao: string;
        status_Academico: string;
        periodo_Atual: number | null;
        total_Periodo: number | null;
        nivel_formacao: string;
        certificado: string | null;
    };
    edv: number;
    atualizarFormacoes: () => void;
}

const formatarSituacao = (situacao: string) => {
    const situacoes: Record<string, string> = {
        CURSANDO: "Cursando",
        CONCLUIDO: "Concluído",
        TRANCADO: "Trancado"
    };

    return situacoes[situacao] || situacao;
};

function FormacaoAcademicaVisualizar({
    visible,
    setVisible,
    formacao,
    edv,
    atualizarFormacoes
}: Props) {

    if (!visible) {
        return null;
    }

    return (
        <div 
            className="formacaoVisualizar-overlay" 
            onClick={() => setVisible(false)}
        >
            <div 
                className="formacaoVisualizar-card" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="formacaoVisualizar-header">
                    <h2>Formação Acadêmica</h2>
                    <div className="formacaoVisualizar-acoes">
                        <button 
                            className="formacaoVisualizar-fechar" 
                            onClick={() => setVisible(false)}
                        >
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>

                <div className="formacaoVisualizar-conteudo">
                    <div className="formacaoVisualizar-item">
                        <span>Nome do Curso</span>
                        <p>{formacao.name_Curso || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span>Nome da Instituição</span>
                        <p>{formacao.nome_Institucao  || "Não informado."}</p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span>Situação</span>
                        <p>
                            {formatarSituacao(formacao.status_Academico)}
                        </p>
                    </div>
                    {
                        formacao.status_Academico  === "CURSANDO" && (
                            <div className="formacaoVisualizar-item">
                                <span>Período Atual</span>
                                <p>
                                    {formacao.periodo_Atual ?? "Não informado."}
                                </p>
                            </div>
                        )
                    }
                    <div className="formacaoVisualizar-item">
                        <span>Total de Períodos</span>
                        <p>
                            {formacao.total_Periodo ?? "Não informado."}
                        </p>
                    </div>
                    <div className="formacaoVisualizar-item">
                        <span>Nível de Formação</span>
                        <p>
                            {formacao.nivel_formacao || "Não informado."}
                        </p>
                    </div>
                    <div className="formacaoVisualizar-item certificado-item">
                        <span>Certificado</span>
                        {
                            formacao.certificado ? (
                                <p>
                                    <img
                                        src={formacao.certificado}
                                        alt="Certificado"
                                        className="certificado-img"
                                    />
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