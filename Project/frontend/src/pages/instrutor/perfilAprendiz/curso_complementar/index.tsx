import olho from '../../../../assets/img/icon_olho.png'
import fechar from '../../../../assets/img/close.png'
import { useState } from "react";
import CursoComplementarVisualizar from "./ver/ver_curso";
import './curso_complementar.css'

interface ICurso {
    id: number;
    name_Curso: string;
    status_Cursos: "CONCLUIDO" | "CURSANDO";
    data_Conclusao: string;
    carga_horaria: number;
    certificado: string | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    cursoComplementar: ICurso[]
}

function CursoComplementar({ visible, setVisible, cursoComplementar }: Props) {
    const [visualizarCurso, setVisualizarCurso] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState<any>(null);

    if (!visible) {
        return null
    }

    return (
        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header">
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}><img  src={fechar}  alt="fechar"  className="icon-fechar-img" /></button>
                </div>
                <span className="formacao-lista-titulo">Cursos Complementares</span>
                <div className="formacao-modal">
                    {cursoComplementar.length === 0 ? <p className="formacao-vazia">Nenhum curso complementar encontrado.</p>:
                        cursoComplementar.map((item, index) => (
                            <div className="formacao-item" key={index}>
                                <span className="formacao-titulo">{item.name_Curso}</span>
                                <div className="formacao-acoes">
                                    <button type="button" className="btn-acao" onClick={() => {setCursoSelecionado(item); setVisualizarCurso(true)}}>
                                        <img src={olho} alt="Visualizar" className="icon-olho"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {visualizarCurso && cursoSelecionado &&
                    <CursoComplementarVisualizar visible={visualizarCurso} setVisible={setVisualizarCurso} cursosComplementares={cursoSelecionado}/>
                }
            </div>
        </div>
    )
}

export default CursoComplementar;