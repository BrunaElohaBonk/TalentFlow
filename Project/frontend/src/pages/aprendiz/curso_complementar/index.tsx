import Swal from "sweetalert2";
import axios from "axios";
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import './curso_complementar.css'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function CursoComplementar({ visible, setVisible }: Props) {

    if (!visible) {
        return null
    }

    const cursosComplementares = [
        {
            id: 1,
            nomeCurso: "Power BI para Análise de Dados",
            situacao: "Concluído",
            dataConclusao: "15/03/2025",
            cargaHoraria: "40 horas",
            descricaoCurso: "Curso voltado para criação de dashboards, tratamento de dados, criação de indicadores e análise de informações utilizando Power BI.",
            certificado: "certificado_powerbi.png"
        },
        {
            id: 2,
            nomeCurso: "Excel Avançado",
            situacao: "Concluído",
            dataConclusao: "20/08/2024",
            cargaHoraria: "30 horas",
            descricaoCurso: "Aperfeiçoamento em fórmulas avançadas, tabelas dinâmicas, gráficos, automações e análise de dados no Microsoft Excel.",
            certificado: "certificado_excel.png"
        },
        {
            id: 3,
            nomeCurso: "Introdução à Programação com Python",
            situacao: "Cursando",
            dataConclusao: "",
            cargaHoraria: "60 horas",
            descricaoCurso: "Curso de fundamentos da programação utilizando Python, abordando lógica, estruturas de dados, funções e automação de tarefas.",
            certificado: "certificado_python.png"
        },
        {
            id: 4,
            nomeCurso: "Fundamentos de Gestão de Projetos",
            situacao: "Concluído",
            dataConclusao: "10/11/2024",
            cargaHoraria: "20 horas",
            descricaoCurso: "Curso sobre planejamento, organização, acompanhamento de projetos, definição de metas e gerenciamento de recursos.",
            certificado: "certificado_gestao_projetos.png"
        },
        {
            id: 5,
            nomeCurso: "Comunicação Empresarial",
            situacao: "Concluído",
            dataConclusao: "05/06/2025",
            cargaHoraria: "15 horas",
            descricaoCurso: "Desenvolvimento de habilidades de comunicação profissional, apresentações, escrita corporativa e relacionamento interpessoal.",
            certificado: "certificado_comunicacao.png"
        },
        {
            id: 6,
            nomeCurso: "Segurança da Informação",
            situacao: "Cursando",
            dataConclusao: "",
            cargaHoraria: "45 horas",
            descricaoCurso: "Curso sobre conceitos de segurança digital, proteção de dados, ameaças virtuais e boas práticas de segurança da informação.",
            certificado: "certificado_seguranca.png"
        }
    ];

    const handleDelete = async (id: number) => {

        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O Curso Complementar será deletado!',
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
                title: 'Deletado!',
                text: 'Curso Complementar removido com sucesso!',
                icon: 'success'
            })
            // Buscar novamente as formações
        }

        catch (error) {
            console.error('Erro ao deletar:', error)

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar Curso Complementar',
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
                        cursosComplementares.length === 0 ?
                            <p className="formacao-vazia">
                                Nenhuma formação acadêmica encontrada.
                            </p>
                            :
                            cursosComplementares.map((item) => (
                                <div
                                    className="formacao-item"
                                    key={item.id}
                                >
                                    <span className="formacao-titulo">
                                        {item.nomeCurso}
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

export default CursoComplementar