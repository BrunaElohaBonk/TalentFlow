import Swal from "sweetalert2";
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import IdiomaVisualizar from "./ver/ver_idioma";
import EditarIdioma from "./editar/editar_idioma";
import AdicionarIdioma from "./adicionar/adicionar_idioma";
import './idioma.css'
import { useEffect, useState } from "react";
import api from "../../../services/api";

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
}
interface Idioma {
    id: number;
    Id_Profile: number;
    nome_Idioma: string;
    nivel_Idioma: string;
    certificado: string | null;
}
function Idioma({ visible, setVisible }: Props) {

    const [visualizarIdioma, setVisualizarIdioma] = useState(false);
    const [editarIdioma, setEditarIdioma] = useState(false);
    const [adicionarIdioma, setAdicionarIdioma] = useState(false);
    const [idiomaSelecionado, setIdiomaSelecionado] = useState<Idioma | null>(null);
    const [idiomas, setIdiomas] = useState<Idioma[]>([]);
    const [edv, setEdv] = useState(0);
    const [idProfile, setIdProfile] = useState(0);

    const carregarIdiomas = async () => {

        try {

            const usuario = localStorage.getItem("usuario");

            if (!usuario) return;

            const aprendizLogado = JSON.parse(usuario);

            const EDV = aprendizLogado.user.EDV;

            setEdv(EDV);

            const perfil = await api.get(`/aprendiz/meuPerfil/${EDV}`);

            setIdProfile(perfil.data.data.id);

            const response = await api.get(
                `/aprendiz/meusIdiomas/${EDV}/${perfil.data.data.id}`
            );

            setIdiomas(response.data.data);

        } catch (error) {
            console.error(error);
        }

    };


    useEffect(() => {
        if (visible) {
            carregarIdiomas();
        }
    }, [visible]);

    if (!visible) {
        return null
    }

    const handleDelete = async (id: number) => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O idioma será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })
        if (!confirm.isConfirmed) {
            return
        }
        try {
            await api.delete(`/aprendiz/deletarIdioma/${edv}/${id}`);
            setIdiomas((prev) => prev.filter((idioma) => idioma.id !== id));
            Swal.fire({
                title: 'Deletada!',
                text: 'Idioma removido com sucesso!',
                icon: 'success'
            })
        }
        catch (error) {
            console.error('Erro ao deletar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar Idioma',
                icon: 'error'
            })
        }
    }

    return (
        <div className="idioma-container" onClick={() => setVisible(false)}>
            <div className="idioma-body" onClick={(e) => e.stopPropagation()}>
                <div className="idioma-header">
                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => {
                            console.log("ID PROFILE:", idProfile);
                            setAdicionarIdioma(true);
                        }}
                    >
                        <img src={adicionar} alt="adicionar" />
                    </button>
                    <button className="btn-header" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("CLICOU FECHAR");
                        setVisible(false);
                    }}>
                        <img src={fechar} alt="fechar" className="icon-fechar-img" />
                    </button>
                </div>
                <span className="idioma-lista-titulo">Idiomas</span>
                <div className="idioma-modal">
                    {
                        idiomas.length === 0 ?
                            <p className="idioma-vazia">Nenhum idioma encontrado.</p>
                            :
                            idiomas.map((item) => (
                                <div className="idioma-item" key={item.id}>
                                    <span className="idioma-titulo">
                                        {formatarIdioma(item.nome_Idioma)}
                                    </span>
                                    <div className="idioma-acoes">
                                        <button type="button" className="btn-acao" onClick={() => {
                                            setIdiomaSelecionado(item);
                                            setVisualizarIdioma(true);
                                        }}
                                        >
                                            <img src={olho} alt="Visualizar" className="icon-olho" />
                                        </button>
                                        <button type="button" className="btn-acao" onClick={() => {
                                            setIdiomaSelecionado(item);
                                            setEditarIdioma(true);
                                        }}
                                        >
                                            <img src={icon_editar} alt="Editar" />
                                        </button>
                                        <button type="button" className="btn-acao" onClick={() => handleDelete(item.id)}>
                                            <img src={lixeira} alt="Excluir" />
                                        </button>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                {
                    visualizarIdioma && idiomaSelecionado && (
                        <IdiomaVisualizar
                            visible={visualizarIdioma}
                            setVisible={setVisualizarIdioma}
                            idioma={idiomaSelecionado}
                        />
                    )
                }
                {
                    editarIdioma && idiomaSelecionado && (
                        <EditarIdioma
                            visible={editarIdioma}
                            setVisible={setEditarIdioma}
                            setIdioma={setVisible}
                            id={idiomaSelecionado.id}
                            edv={edv}
                            idiomaAtual={idiomaSelecionado}
                        />
                    )
                }
                {
                    adicionarIdioma && (
                        <AdicionarIdioma
                            visible={adicionarIdioma}
                            setVisible={setAdicionarIdioma}
                            setIdioma={setVisible}
                            id={idProfile}
                            edv={edv}
                            carregarIdiomas={carregarIdiomas}
                        />
                    )
                }
            </div>
        </div >
    )
}

export default Idioma