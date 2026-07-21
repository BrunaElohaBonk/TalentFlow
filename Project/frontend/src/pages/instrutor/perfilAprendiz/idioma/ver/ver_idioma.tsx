import './ver_idioma.css'
import icon_fechar from '../../../../../assets/img/close.png'

interface IIdiomas{
     idioma: string;
    nivel: string;
    certificado: string | null;
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idioma: IIdiomas
}

function IdiomaVisualizar({
    visible,
    setVisible,
    idioma
}: Props) {

    if (!visible) {
        return null
    }

    return (
        <div className="idiomaVisualizar-overlay" onClick={() => setVisible(false)}>
            <div className="idiomaVisualizar-card" onClick={(e) => e.stopPropagation()}>
                <div className="idiomaVisualizar-header">
                    <h2>Idioma</h2>
                    <div className="idiomaVisualizar-acoes">
                        <button className="idiomaVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>
                <div className="idiomaVisualizar-conteudo">
                    <div className="idiomaVisualizar-item">
                        <span>Nome do Idioma</span>
                        <p>{idioma.idioma || "Não informado."}</p>
                    </div>
                    <div className="idiomaVisualizar-item">
                        <span>Nível</span>
                        <p>{idioma.nivel || "Não informado."}</p>
                    </div>
                    <div className="idiomaVisualizar-item certificado-item">
                        <span>Certificado</span>
                        <p>{idioma.certificado || "Não incluído"}</p>
                        {/* {
                            idioma.certificado ? (
                                <p>
                                    <img src={URL.createObjectURL(idioma.certificado)} alt="Certificado" className="certificado-img"/>
                                </p>
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

export default IdiomaVisualizar