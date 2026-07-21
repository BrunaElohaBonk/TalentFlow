import Swal from "sweetalert2";
import axios from "axios";
import olho from '../../../../assets/img/icon_olho.png'
import fechar from '../../../../assets/img/close.png'
import IdiomaVisualizar from "./ver/ver_idioma";
import { useState } from "react";
import './idioma.css'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Idioma({ visible, setVisible }: Props) {

    const [visualizarIdioma, setVisualizarIdioma] = useState(false);
    const [idiomaSelecionado, setIdiomaSelecionado] = useState<any>(null);

    if (!visible) {
        return null
    }

    const idiomas = [
        {
            id: 1,
            nomeIdioma: "Inglês",
            nivel: "Intermediário (B1)",
            situacao: "Cursando",
            instituicao: "Wizard",
            dataInicio: "10/02/2025",
            dataConclusao: "",
            descricao: "Curso de inglês com foco em conversação, compreensão auditiva, leitura e escrita para situações profissionais e acadêmicas.",
            certificado: null
        },
        {
            id: 2,
            nomeIdioma: "Espanhol",
            nivel: "Básico (A2)",
            situacao: "Concluído",
            instituicao: "Centro de Idiomas",
            dataInicio: "05/03/2024",
            dataConclusao: "15/12/2024",
            descricao: "Curso de espanhol abordando vocabulário, gramática, interpretação de textos e comunicação em situações do cotidiano.",
            certificado: null
        },
        {
            id: 3,
            nomeIdioma: "Alemão",
            nivel: "Iniciante (A1)",
            situacao: "Cursando",
            instituicao: "Goethe-Institut",
            dataInicio: "20/01/2025",
            dataConclusao: "",
            descricao: "Curso introdutório de alemão com foco em fundamentos da língua, pronúncia, vocabulário básico e comunicação inicial.",
            certificado: null
        }
    ];

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
                            idiomas.map((item) => (
                                <div
                                    className="formacao-item"
                                    key={item.id}
                                >
                                    <span className="formacao-titulo">
                                        {item.nomeIdioma}
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