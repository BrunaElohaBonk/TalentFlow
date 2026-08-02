import Swal from "sweetalert2";
import lixeira from '../../../assets/img/lixeira.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import AdicionarSoftSkill from "./adicionar/adicionar_soft_skill";
import './soft_skill.css'
import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
    edv: number;
}

interface SoftSkill {
    id: number;
    nome_SoftSkills: string;
}
const formatarSoftSkill = (skill: string) => {
    const softSkills: Record<string, string> = {
        COMUNICACAO: "Comunicação",
        TRABALHO_EM_EQUIPE: "Trabalho em Equipe",
        LIDERANCA: "Liderança",
        EMPATIA: "Empatia",
        PROATIVIDADE: "Proatividade",
        RESOLUCAO_DE_PROBLEMAS: "Resolução de Problemas",
        PENSAMENTO_CRITICO: "Pensamento Crítico",
        GESTAO_DO_TEMPO: "Gestão do Tempo",
        ORGANIZACAO: "Organização",
        CRIATIVIDADE: "Criatividade",
        NEGOCIACAO: "Negociação",
        RESILIENCIA: "Resiliência",
        ESCUTA_ATIVA: "Escuta Ativa",
        RESPONSABILIDADE: "Responsabilidade",
        AUTONOMIA: "Autonomia",
        APRENDIZADO_CONTINUO: "Aprendizado Contínuo",
        INOVACAO: "Inovação",
        ORATORIA: "Oratória",
        COMPROMETIMENTO: "Comprometimento",
        NAO_INFORMADO: "Não informado"
    };

    return softSkills[skill] || skill;
};

function SoftSkill({ visible, setVisible, edv, onSuccess}: Props) {

    const [adicionarSoftSkill, setAdicionarSoftSkill] = useState(false);
    const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);

    const carregarSoftSkills = async () => {
        try {
            const response = await api.get(
                `/aprendiz/meuPerfil/${edv}`
            );

            setSoftSkills(
                response.data.data.soft_skills
            );

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (visible) {
            carregarSoftSkills();
        }
    }, [visible]);


    if (!visible) {
        return null;
    }
     async function atualizarTudo() {
        await carregarSoftSkills();
        onSuccess();
    }

    const handleDelete = async (id: number) => {

        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'A Soft Skill será deletada!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;


        try {

            await api.delete(
                `/aprendiz/deletarSoftskills/${edv}/${id}`
            );


            setSoftSkills((prev) =>
                prev.filter((skill) => skill.id !== id)
            );


            Swal.fire({
                title: 'Deletada!',
                text: 'Soft Skill removida com sucesso!',
                icon: 'success'
            });
            onSuccess();


        } catch (error) {

            console.error(error);

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar Soft Skill',
                icon: 'error'
            });
        }
    };


    return (
        <div 
            className="soft-skill-container" 
            onClick={() => setVisible(false)}
        >
            <div 
                className="soft-skill-body" 
                onClick={(e) => e.stopPropagation()}
            >

                <div className="soft-skill-header">

                    <button 
                        type="button" 
                        className="btn-header" 
                        onClick={() => setAdicionarSoftSkill(true)}
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


                <span className="soft-skill-lista-titulo">
                    Soft Skills
                </span>


                <div className="soft-skill-modal">

                    {
                        softSkills.length === 0 ?

                            <p className="soft-skill-vazia">
                                Nenhuma Soft Skill encontrada.
                            </p>

                            :

                            softSkills.map((item) => (

                                <div 
                                    className="soft-skill-item" 
                                    key={item.id}
                                >

                                    <span className="soft-skill-titulo">
                                        {formatarSoftSkill(item.nome_SoftSkills)}
                                    </span>


                                    <div className="soft-skill-acoes">

                                        <button 
                                            type="button" 
                                            className="btn-acao" 
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <img src={lixeira} alt="Excluir" />
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
                            onSuccess={atualizarTudo}
                            edv={edv}
                            carregarSoftSkills={carregarSoftSkills}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default SoftSkill;