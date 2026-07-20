import './ver_curso.css'
import icon_fechar from '../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    curso: {
        id: number;
        curso: string;
        situacao: string;
        dataConclusao: string;
        cargaHoraria: string;
        descricao: string;
        certificado: File | null;
    };
}

function CursoComplementarVisualizar({
    visible,
    setVisible,
    curso
}: Props) {

    if (!visible) {
        return null
    }

    return (
        <div className="cursoVisualizar-overlay">
            <div className="cursoVisualizar-card">
                <div className="cursoVisualizar-header">
                    <h2>Curso Complementar</h2>
                    <div className="cursoVisualizar-acoes">
                        <button className="cursoVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>
                <div className="cursoVisualizar-conteudo">
                    <div className="cursoVisualizar-item">
                        <span>Nome do Curso</span>
                        <p>{curso.curso || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item">
                        <span>Situação</span>
                        <p>{curso.situacao || "Não informado."}</p>
                    </div>
                    {
                        curso.situacao === "Concluído" && (
                            <div className="cursoVisualizar-item">
                                <span>Data de Conclusão</span>
                                <p>{curso.dataConclusao || "Não informado."}</p>
                            </div>
                        )
                    }
                    <div className="cursoVisualizar-item">
                        <span>Carga Horária</span>
                        <p>{curso.cargaHoraria || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item cursoVisualizar-descricao">
                        <span>Descrição</span>
                        <p>{curso.descricao || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item certificado-item">
                        <span>Certificado</span>
                        {
                            curso.certificado ? (
                                <p><img alt="Certificado" className="certificado-img"/></p>
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

export default CursoComplementarVisualizar