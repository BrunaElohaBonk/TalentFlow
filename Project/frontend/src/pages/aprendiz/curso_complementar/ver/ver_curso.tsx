import './ver_curso.css'
import icon_fechar from '../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    curso: {
        id_Cursos:number;
        Id_Profile:number;
        name_Curso:string;
        status_Cursos: "CONCLUIDO" | "CURSANDO"|"NAO_INFORMADO";
        data_Conclusao:string;
        carga_horaria:number;
        certificado?: string |null;

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
        <div className="cursoVisualizar-overlay" onClick={() => setVisible(false)}>
            <div className="cursoVisualizar-card" onClick={(e) => e.stopPropagation()}>
                <div className="cursoVisualizar-header">
                    <h2>Curso Complementar</h2>
                    <div className="cursoVisualizar-acoes">
                        <button className="cursoVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar" />
                        </button>
                    </div>
                </div>
                <div className="cursoVisualizar-conteudo">
                    <div className="cursoVisualizar-item">
                        <span>Nome do Curso</span>
                        <p>{curso.name_Curso || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item">
                        <span>Situação</span>
                        <p>{curso.status_Cursos || "Não informado."}</p>
                    </div>
                    {
                        curso.status_Cursos === "CONCLUIDO" && (
                            <div className="cursoVisualizar-item">
                                <span>Data de Conclusão</span>
                                <p>{formatarData(curso.data_Conclusao) || "Não informado."}</p>
                            </div>
                        )
                    }
                    <div className="cursoVisualizar-item">
                        <span>Carga Horária</span>
                        <p>{curso.carga_horaria || "Não informado."}</p>
                    </div>
                    <div className="cursoVisualizar-item certificado-item">
                        <span>Certificado</span>
                        {
                            curso.certificado ? (
                                <p><img alt="Certificado" className="certificado-img" /></p>
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

function formatarData(data: string) {
    if (!data) return "";
    if (data.includes("T")) {
        const [ano, mes, dia] = data.split("T")[0].split("-");

        return `${dia}/${mes}/${ano}`;
    }
    if (data.includes("/")) {
        return data;
    }
    return "";
}