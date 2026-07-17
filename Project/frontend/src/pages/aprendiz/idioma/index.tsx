import Swal from "sweetalert2";
import axios from "axios";
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import './idioma.css'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Idioma({ visible, setVisible }: Props) {

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
            certificado: "certificado_ingles.png"
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
            certificado: "certificado_espanhol.png"
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
            certificado: "certificado_alemao.png"
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
            // Buscar novamente as formações
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

        <div className="formacao-container">
            <div className="formacao-body">
                <div className="formacao-header">
                    <button
                        type="button"
                        className="btn-header"
                    >
                        <img src={adicionar} alt="adicionar" />
                    </button>
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
                                            onClick={() => console.log(item)}
                                        >
                                            <img
                                                src={olho}
                                                alt="Visualizar"
                                                className="icon-olho"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => console.log(item)}
                                        >
                                            <img
                                                src={icon_editar}
                                                alt="Editar"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-acao"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <img
                                                src={lixeira}
                                                alt="Excluir"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Idioma