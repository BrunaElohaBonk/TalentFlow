import Swal from "sweetalert2";
import axios from "axios";
import lixeira from '../../../assets/img/lixeira.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import AdicionarSoftSkill from "./adicionar/adicionar_soft_skill";
import { useState } from "react";
import './soft_skill.css'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function SoftSkill({ visible, setVisible }: Props) {

    const [adicionarSoftSkill, setAdicionarSoftSkill] = useState(false);

    if (!visible) {
        return null
    }

    const softSkills = [
        {
            id: 1,
            nome: "Comunicação"
        },
        {
            id: 2,
            nome: "Trabalho em equipe"
        },
        {
            id: 3,
            nome: "Resolução de problemas"
        },
        {
            id: 4,
            nome: "Proatividade"
        },
        {
            id: 5,
            nome: "Organização"
        },
        {
            id: 6,
            nome: "Adaptabilidade"
        },
        {
            id: 7,
            nome: "Liderança"
        },
        {
            id: 8,
            nome: "Pensamento crítico"
        },
        {
            id: 9,
            nome: "Gestão do tempo"
        },
        {
            id: 10,
            nome: "Inteligência emocional"
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
        <div className="soft-skill-container" onClick={() => setVisible(false)}>
            <div className="soft-skill-body" onClick={(e) => e.stopPropagation()}>
                <div className="soft-skill-header">
                    <button type="button" className="btn-header" onClick={() => setAdicionarSoftSkill(true)}>
                        <img src={adicionar} alt="adicionar" />
                    </button>
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}>
                        <img src={fechar} alt="fechar" className="icon-fechar-img" />
                    </button>
                </div>
                <span className="soft-skill-lista-titulo">Soft Skills</span>
                <div className="soft-skill-modal">
                    {
                        softSkills.length === 0 ?
                            <p className="soft-skill-vazia">
                                Nenhuma formação acadêmica encontrada.
                            </p>
                            :
                            softSkills.map((item) => (
                                <div className="soft-skill-item" key={item.id}>
                                    <span className="soft-skill-titulo">{item.nome}</span>
                                    <div className="soft-skill-acoes">
                                        <button type="button" className="btn-acao" onClick={() => handleDelete(item.id)}>
                                            <img src={lixeira} alt="Excluir"/>
                                        </button>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                {
                    adicionarSoftSkill && (
                        <AdicionarSoftSkill
                            visible={adicionarSoftSkill}
                            setVisible={setAdicionarSoftSkill}
                            setSoftSkill={setVisible}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default SoftSkill