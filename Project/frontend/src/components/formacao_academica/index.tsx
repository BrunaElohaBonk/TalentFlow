import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import lupa from '../../assets/img/pesquisar.png'
import lixeira from '../../assets/img/lixeira.png'
import olho from '../../assets/img/icon_olho.png'
import icon_editar from '../../assets/img/icon_editar.png'
import './formacao_academica.css'

function FormacaoAcademica({visible, setVisible, setEditarSituacao}: any) {

    if (!visible) {
        return null
    }

    const [visualizar, setVisualizar] = useState(false);
    const [formacaoSelecionada, setFormacaoSelecionada] = useState<any>(null);
    const [busca, setBusca] = useState("");

    const formacoes = [
        {
            id: 1,
            curso: "Engenharia de Controle e Automação",
            instituicao: "Universidade Tecnológica Federal do Paraná",
            situacao: "Cursando",
            periodoAtual: 6,
            totalPeriodos: 10,
            nivelFormacao: "Superior",
            descricao: "Graduação voltada para automação industrial, controle de processos e sistemas inteligentes."
        },
        {
            id: 2,
            curso: "Técnico em Automação Industrial",
            instituicao: "SENAI",
            situacao: "Concluído",
            periodoAtual: 4,
            totalPeriodos: 4,
            nivelFormacao: "Técnico",
            descricao: "Formação técnica em sistemas automatizados, CLPs, sensores e manutenção industrial."
        },
        {
            id: 3,
            curso: "Administração",
            instituicao: "Universidade Estadual de Ponta Grossa",
            situacao: "Trancado",
            periodoAtual: 3,
            totalPeriodos: 8,
            nivelFormacao: "Superior",
            descricao: "Curso com foco em gestão empresarial, processos administrativos e liderança."
        },
        {
            id: 4,
            curso: "Desenvolvimento de Sistemas",
            instituicao: "Instituto Federal do Paraná",
            situacao: "Cursando",
            periodoAtual: 2,
            totalPeriodos: 3,
            nivelFormacao: "Técnico",
            descricao: "Formação em desenvolvimento de software, banco de dados e programação."
        },
        {
            id: 5,
            curso: "Pós-Graduação em Gestão Industrial",
            instituicao: "Centro Universitário Positivo",
            situacao: "Concluído",
            periodoAtual: 2,
            totalPeriodos: 2,
            nivelFormacao: "Pós-Graduação",
            descricao: "Especialização em gestão de processos industriais e melhoria contínua."
        },
        {
            id: 6,
            curso: "Mecatrônica Industrial",
            instituicao: "SENAI",
            situacao: "Cursando",
            periodoAtual: 3,
            totalPeriodos: 4,
            nivelFormacao: "Técnico",
            descricao: "Curso focado em integração entre mecânica, eletrônica e automação."
        }
    ];

    const formacoesFiltradas = formacoes.filter((item) => {
        const termo = busca.toLowerCase().trim();
        return (
            item.curso.toLowerCase().includes(termo) ||
            item.instituicao.toLowerCase().includes(termo) ||
            item.situacao.toLowerCase().includes(termo) ||
            item.periodoAtual.toString().includes(termo) ||
            item.totalPeriodos.toString().includes(termo) ||
            item.nivelFormacao.toString().includes(termo) ||
            item.descricao.toString().includes(termo) 
        );
    });

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'A Formação Acadêmica será deletada!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })

        if (!confirm.isConfirmed) return
            try {
                await axios.delete(`link backend/`)
                Swal.fire({
                    title: 'Deletada!',
                    text: 'Formação Acadêmica removida com sucesso!',
                    icon: 'success'
                })
                // fetchformacao()
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
                    <div className="formacao-pesquisa">
                        <input type="text" className="formacao-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button"className="formacao-button-pesquisar"> <img src={lupa} alt="Pesquisar" className="img-lupa"/></button>
                    </div>
                    <div className="formacao-modal">
                        {formacoesFiltradas.length === 0 ? (<p className="formacao-vazia">Nenhuma formação acadêmica encontrada.</p>) : (
                            formacoesFiltradas.map((item) => (
                                <div className="formacao-item" key={item.id}>
                                    <span className="formacao-titulo">{item.curso}</span>
                                    <div className="formacao-acoes">
                                        <button className="btn-acao" onClick={() => { setFormacaoSelecionada(item); setVisualizar(true);}}><img src={olho} alt="Visualizar" className="formacao-visualizar"/></button>
                                        <button type="button" className="btn-acao" onClick={handleDelete}><img src={lixeira} alt="Excluir"/></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
    );
}
export default FormacaoAcademica