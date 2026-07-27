import './ver_curso.css'
import icon_fechar from '../../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    cursosComplementares: {
        nomeCurso: string;
        status: boolean;
        dataConclusao: Date | string | null;
        cargaHoraria: number;
        descricaoCurso: string;
        certificado: string | null;
    };
}

function CursoComplementarVisualizar({
    visible,
    setVisible,
    cursosComplementares
}: Props) {

    if (!visible) {
        return null
    }

    return (
        <div className="cursoVisualizar-overlay" onClick={() => setVisible(false)}>
            <div className="cursoVisualizar-card" onClick={(e) => e.stopPropagation()}>
                <div className="cursoVisualizar-header">
                    <h2 className='formacao-lista-titulo'>Curso Complementar</h2>
                    <div className="cursoVisualizar-acoes">
                        <button className="cursoVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>
                <div className="cursoVisualizar-conteudo">
                    <div className="cursoVisualizar-item">
                        <span className='formacao-titulo'>Nome do Curso</span>
                        <p>{cursosComplementares.nomeCurso || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item">
                        <span className='formacao-titulo'>Situação</span>
                        <p>{cursosComplementares.status ? "Concluído" : "Cursando"}</p>
                    </div>

                    {
                        cursosComplementares.status && (
                            <div className="cursoVisualizar-item">
                                <span className='formacao-titulo'>Data de Conclusão</span>
                                <p>{cursosComplementares.dataConclusao  ? new Date(cursosComplementares.dataConclusao).toLocaleDateString("pt-BR"):"Não informado."}</p>
                            </div>
                        )
                    }
                    <div className="cursoVisualizar-item">
                        <span className='formacao-titulo'>Carga Horária</span>
                        <p>{cursosComplementares.cargaHoraria || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item cursoVisualizar-descricao">
                        <span className='formacao-titulo'>Descrição</span>
                        <p>{cursosComplementares.descricaoCurso || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item certificado-item">
                        <span className='formacao-titulo'>Certificado</span>
                        <p>{cursosComplementares.certificado || "Não informado"}</p>
                        {/* {
                            cursosComplementares.certificado ? (
                                <p><img alt="Certificado" className="certificado-img"/></p>
                            ) : (
                                <p>Não incluído</p>
                            )
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CursoComplementarVisualizar