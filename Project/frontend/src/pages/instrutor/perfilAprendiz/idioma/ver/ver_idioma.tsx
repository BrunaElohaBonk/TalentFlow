import './ver_idioma.css'
import icon_fechar from '../../../../../assets/img/close.png'

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
                    <h2 className='formacao-lista-titulo'>Idioma</h2>
                    <div className="idiomaVisualizar-acoes">
                        <button className="idiomaVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar"/>
                        </button>
                    </div>
                </div>
                <div className="idiomaVisualizar-conteudo">
                    <div className="idiomaVisualizar-item">
                        <span className='formacao-titulo'>Nome do Idioma</span>
                        <p>{idioma.nome_Idioma || "Não informado."}</p>
                    </div>
                    <div className="idiomaVisualizar-item">
                        <span className='formacao-titulo'>Nível</span>
                        <p>{idioma.nivel_Idioma || "Não informado."}</p>
                    </div>
                    <div className="idiomaVisualizar-item certificado-item">
                        <span className='formacao-titulo'>Certificado</span>
                        <p>
                            {idioma.certificado ?? "Não incluído"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdiomaVisualizar