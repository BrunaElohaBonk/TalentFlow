import './adicionar_soft_skill.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import api from "../../../../services/api";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSoftSkill: React.Dispatch<React.SetStateAction<boolean>>;
    edv: number;
    carregarSoftSkills: () => void;
}

function AdicionarSoftSkill({
    visible,
    setVisible,
    setSoftSkill,
    edv,
    carregarSoftSkills
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


    const converterSoftSkill = (skill: string) => {

        switch (skill) {
            case "Comunicação":
                return "COMUNICACAO";

            case "Trabalho em Equipe":
                return "TRABALHO_EM_EQUIPE";

            case "Liderança":
                return "LIDERANCA";

            case "Empatia":
                return "EMPATIA";

            case "Proatividade":
                return "PROATIVIDADE";

            case "Resolução de Problemas":
                return "RESOLUCAO_DE_PROBLEMAS";

            case "Pensamento Crítico":
                return "PENSAMENTO_CRITICO";

            case "Gestão do Tempo":
                return "GESTAO_DO_TEMPO";

            case "Organização":
                return "ORGANIZACAO";

            case "Criatividade":
                return "CRIATIVIDADE";

            case "Negociação":
                return "NEGOCIACAO";

            case "Resiliência":
                return "RESILIENCIA";

            case "Escuta Ativa":
                return "ESCUTA_ATIVA";

            case "Responsabilidade":
                return "RESPONSABILIDADE";

            case "Autonomia":
                return "AUTONOMIA";

            case "Aprendizado Contínuo":
                return "APRENDIZADO_CONTINUO";

            case "Inovação":
                return "INOVACAO";

            case "Oratória":
                return "ORATORIA";

            case "Comprometimento":
                return "COMPROMETIMENTO";

            default:
                return "NAO_INFORMADO";
        }
    };


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
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (softSkillsSelecionadas.length === 0) {

            Swal.fire({
                title: 'Atenção!',
                text: 'Selecione pelo menos uma competência.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            });

            return;
        }


        try {

            const softSkillsEnum = softSkillsSelecionadas.map(
                converterSoftSkill
            );


            await api.post(
                `/aprendiz/adicionarSoftskills/${edv}`,
                {
                    softSkills: softSkillsEnum
                }
            );


            await carregarSoftSkills();


            Swal.fire({
                title: 'Sucesso!',
                text: 'Softskills adicionadas com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            });


            setVisible(false);


        } catch (error:any) {
            console.log("ERRO COMPLETO:", error.response?.data);

            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível adicionar as softskills.',
                icon: 'error',
                confirmButtonColor: '#2B83D5'
            });
        }
    };


    if (!visible) {
        return null;
    }


    return (
        <div 
            className="adicionarSoftSkill-overlay" 
            onClick={() => setVisible(false)}
        >

            <form
                className="adicionarSoftSkill-card"
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
            >

                <button 
                    type="button" 
                    className="adicionarSoftSkill-fechar" 
                    onClick={() => {
                        setVisible(false);
                        setSoftSkill(true);
                    }}
                >
                    <img src={sair} alt="Fechar" />
                </button>


                <span className="adicionarSoftSkill-titulo">
                    Adicionar SoftSkills
                </span>


                <div className="adicionarSoftSkill-container">

                    <div className="adicionarSoftSkill-lista">

                        {softSkills.map((skill) => (

                            <label 
                                key={skill} 
                                className="adicionarSoftSkill-item"
                            >

                                <input
                                    type="checkbox"
                                    checked={softSkillsSelecionadas.includes(skill)}
                                    onChange={() => handleSelecionar(skill)}
                                />

                                <span className="adicionarSoftSkill-quadrado"></span>

                                <span className="adicionarSoftSkill-texto">
                                    {skill}
                                </span>

                            </label>

                        ))}

                    </div>


                    <div className="adicionarSoftSkill-botoes">

                        <button 
                            type="submit" 
                            className="adicionarSoftSkill-salvar"
                        >
                            ADICIONAR
                        </button>

                    </div>

                </div>

            </form>

        </div>
    )
}

export default AdicionarSoftSkill;