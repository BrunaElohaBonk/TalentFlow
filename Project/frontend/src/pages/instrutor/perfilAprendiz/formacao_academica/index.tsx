import olho from "../../../../assets/img/icon_olho.png";
import fechar from "../../../../assets/img/close.png";
import { useState } from "react";
import FormacaoAcademicaVisualizar from "./ver/ver_formacao";
import "./formacao_academica.css";

type NivelFormacao = "ENSINO_MEDIO" | "TECNICO" | "GRADUACAO" | "POS_GRADUACAO";
interface IFormacao {
    id: number;
    name_Curso: string;
    nome_Institucao: string;
    status_Academico: "CONCLUIDO" | "CURSANDO";
    periodo_Atual: number;
    total_Periodo: number;
    nivel_formacao: NivelFormacao;
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formacaoAcademica: IFormacao[]
}

function FormacaoAcademica({ visible, setVisible, formacaoAcademica}: Props) {
    const [visualizarFormacao, setVisualizarFormacao] = useState(false);
    const [formacaoSelecionada, setFormacaoSelecionada] = useState<any>(null);

    if (!visible) {
        return null;
    }

    return (
        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header">
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}><img src={fechar} alt="Fechar" className="icon-fechar-img"/></button>
                </div>
                <span className="formacao-lista-titulo">Formação Acadêmica</span>
                <div className="formacao-modal">
                    {formacaoAcademica.length === 0 ? (<p className="formacao-vazia">Nenhuma formação acadêmica encontrada.</p>
                        ) : (
                            formacaoAcademica.map((item, index) => (
                                <div className="formacao-item" key={index}>
                                    <span className="formacao-titulo">{item.name_Curso}</span>
                                    <div className="formacao-acoes">
                                        <button  type="button"  className="btn-acao"  onClick={() => {setFormacaoSelecionada(item); setVisualizarFormacao(true)}}>
                                            <img  src={olho}  alt="Visualizar"  className="icon-olho"/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
                {visualizarFormacao && formacaoSelecionada && (
                    <FormacaoAcademicaVisualizar visible={visualizarFormacao} setVisible={setVisualizarFormacao} formacao={formacaoSelecionada}/>
                )}
            </div>
        </div>
    );
}

export default FormacaoAcademica;