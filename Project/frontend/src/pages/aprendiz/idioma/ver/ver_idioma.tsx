import './ver_idioma.css'
import icon_fechar from '../../../../assets/img/close.png'

const formatarIdioma = (idioma: string) => {
    const idiomas: Record<string, string> = {
        ALEMAO: "Alemão",
        ARABE: "Árabe",
        COREANO: "Coreano",
        ESPANHOL: "Espanhol",
        FRANCES: "Francês",
        INGLES: "Inglês",
        ITALIANO: "Italiano",
        JAPONES: "Japonês",
        MANDARIM: "Mandarim",
        RUSSO: "Russo",
        TAILANDES: "Tailandês"
    };

    return idiomas[idioma] || idioma;
};
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
    idioma: {
        id: number;
        Id_Profile: number;
        nome_Idioma: string;
        nivel_Idioma: string;
        certificado: string | null;
    };
}

function IdiomaVisualizar({
    visible,
    setVisible,
    onSuccess,
    idioma
}: Props) {

    if (!visible) {
        return null
    }
    onSuccess();

    return (
        <div className="idiomaVisualizar-overlay" onClick={() => setVisible(false)}>
            <div className="idiomaVisualizar-card" onClick={(e) => e.stopPropagation()}>
                <div className="idiomaVisualizar-header">
                    <h2>Idioma</h2>
                    <div className="idiomaVisualizar-acoes">
                        <button className="idiomaVisualizar-fechar" onClick={() => setVisible(false)}>
                            <img src={icon_fechar} alt="Fechar" />
                        </button>
                    </div>
                </div>
                <div className="idiomaVisualizar-conteudo">
                    <div className="idiomaVisualizar-item">
                        <span>Nome do Idioma</span>
                        <p>{formatarIdioma(idioma.nome_Idioma) || "Não informado."}</p>
                    </div>
                    <div className="idiomaVisualizar-item">
                        <span>Nível</span>
                        <p>{idioma.nivel_Idioma || "Não informado."}</p>
                    </div>
                    <div className="idiomaVisualizar-item certificado-item">
                        <span>Certificado</span>

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