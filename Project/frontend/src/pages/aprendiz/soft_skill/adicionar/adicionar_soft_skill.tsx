import './adicionar_soft_skill.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSoftSkill: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdicionarSoftSkill({
    visible,
    setVisible,
    setSoftSkill
}: Props) {

    const [softSkillsSelecionadas, setSoftSkillsSelecionadas] = useState<string[]>([]);

    const softSkills = [
        "Comunicação",
        "Trabalho em Equipe",
        "Liderança",
        "Empatia",
        "Proatividade",
        "Resolução de Problemas",
        "Pensamento Crítico",
        "Gestão do Tempo",
        "Organização",
        "Criatividade",
        "Negociação",
        "Resiliência",
        "Escuta Ativa",
        "Responsabilidade",
        "Autonomia",
        "Aprendizado Contínuo",
        "Inovação",
        "Oratória",
        "Comprometimento"
    ];

    const handleSelecionar = (skill: string) => {
        if (softSkillsSelecionadas.includes(skill)) {
            setSoftSkillsSelecionadas(
                softSkillsSelecionadas.filter(item => item !== skill)
            );
        } else {
            setSoftSkillsSelecionadas([
                ...softSkillsSelecionadas,
                skill
            ]);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (softSkillsSelecionadas.length === 0) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Selecione pelo menos uma competência.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return;
        }
        try {
            await axios.post(
                `link backend`,
                {
                    competencias: softSkillsSelecionadas
                }
            )
            Swal.fire({
                title: 'Sucesso!',
                text: 'Softskills adicionadas com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })
            setVisible(false);
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível adicionar as softskills.',
                icon: 'error',
                confirmButtonColor: '#2B83D5'
            })
        }
    }

    if (!visible) {
        return null
    }

    return (
        <div className="adicionarSoftSkill-overlay" onClick={() => setVisible(false)}>
            <form className="adicionarSoftSkill-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="adicionarSoftSkill-fechar" onClick={() => {
                        setVisible(false)
                        setSoftSkill(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="adicionarSoftSkill-titulo">Adicionar SoftSkills</span>
                <div className="adicionarSoftSkill-container">
                    <div className="adicionarSoftSkill-lista">
                        {
                            softSkills.map((skill) => (
                                <label key={skill} className="adicionarSoftSkill-item">
                                    <input type="checkbox" checked={softSkillsSelecionadas.includes(skill)} onChange={() => handleSelecionar(skill)}/>
                                    <span className="adicionarSoftSkill-quadrado"></span>
                                    <span className="adicionarSoftSkill-texto">{skill}</span>
                                </label>
                            ))
                        }
                    </div>
                    <div className="adicionarSoftSkill-botoes">
                        <button type="submit" className="adicionarSoftSkill-salvar">
                            SALVAR MODIFICAÇÃO
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdicionarSoftSkill