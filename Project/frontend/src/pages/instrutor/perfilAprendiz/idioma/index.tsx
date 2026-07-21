import Swal from "sweetalert2";
import axios from "axios";
import olho from '../../../../assets/img/icon_olho.png'
import fechar from '../../../../assets/img/close.png'
import IdiomaVisualizar from "./ver/ver_idioma";
import { useState } from "react";
import './idioma.css'

interface IIdiomas{
    idioma: string
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

    const handleDelete = async (id: number) => {

        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'A Formação Acadêmica será deletada!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })

        if (!confirm.isConfirmed) {
            return
        }

        try {

            await axios.delete(`link backend/${id}`)

            Swal.fire({
                title: 'Deletada!',
                text: 'Formação Acadêmica removida com sucesso!',
                icon: 'success'
            })
        }

        catch (error) {
            console.error('Erro ao deletar:', error)

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar Formação Acadêmica',
                icon: 'error'
            })
        }
    }

    return (

        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header">
                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => setVisible(false)}
                    >
                        <img src={fechar} alt="fechar" className="icon-fechar-img" />
                    </button>
                </div>
                <div className="formacao-modal">
                    {
                        idiomas.length === 0 ?
                            <p className="formacao-vazia">
                                Nenhuma formação acadêmica encontrada.
                            </p>
                            :
                            idiomas.map((item, index) => (
                                <div
                                    className="formacao-item"
                                    key={index}
                                >
                                    <span className="formacao-titulo">
                                        {item.idioma}
                                    </span>
                                    <div className="formacao-acoes">
                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => {
                                                setIdiomaSelecionado(item);
                                                setVisualizarIdioma(true);
                                            }}
                                        >
                                            <img
                                                src={olho}
                                                alt="Visualizar"
                                                className="icon-olho"
                                            />
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
            </div>
        </div>
    )
}

export default Idioma