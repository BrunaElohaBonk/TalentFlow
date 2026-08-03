import olho from '../../../../assets/img/icon_olho.png'
import fechar from '../../../../assets/img/close.png'
import IdiomaVisualizar from "./ver/ver_idioma";
import { useState } from "react";
import './idioma.css'

type NivelIdioma ="BASICO" | "INTERMEDIARIO" | "AVANCADO" | "FLUENTE";
interface IIdiomas{
    id: number;
    nome_Idioma: string;
    nivel_Idioma: NivelIdioma;
    certificado: string | null;
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idiomas: IIdiomas[]
}

function Idioma({ visible, setVisible, idiomas }: Props) {
    const [visualizarIdioma, setVisualizarIdioma] = useState(false);
    const [idiomaSelecionado, setIdiomaSelecionado] = useState<any>(null);

    if (!visible) {
        return null
    }

    return (
        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header">
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}><img src={fechar} alt="fechar" className="icon-fechar-img" /></button>
                </div>
                <span className="formacao-lista-titulo">Idiomas</span>
                <div className="formacao-modal">
                    {idiomas.length === 0 ? <p className="formacao-vazia">Nenhum idioma encontrado.</p>:
                        idiomas.map((item, index) => (
                            <div className="formacao-item" key={index}>
                                <span className="formacao-titulo">{item.nome_Idioma}</span>
                                <div className="formacao-acoes">
                                    <button type="button" className="btn-acao" onClick={() => {setIdiomaSelecionado(item); setVisualizarIdioma(true)}}>
                                        <img src={olho} alt="Visualizar" className="icon-olho"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {visualizarIdioma && idiomaSelecionado && 
                    (<IdiomaVisualizar visible={visualizarIdioma} setVisible={setVisualizarIdioma} idioma={idiomaSelecionado}/>)
                }
            </div>
        </div>
    )
}

export default Idioma