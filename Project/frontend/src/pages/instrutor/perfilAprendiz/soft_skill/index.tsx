import fechar from '../../../../assets/img/close.png'
import './soft_skill.css'

interface ISoft{
    id: number;
    nome_SoftSkills: string[];
}
interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    softSkills: ISoft[]
}

function SoftSkill({ visible, setVisible, softSkills }: Props) {
    if (!visible) {
        return null
    }

    return (
        <div className="formacao-container" onClick={() => setVisible(false)}>
            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>
                <div className="formacao-header">
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}><img src={fechar} alt="fechar" className="icon-fechar-img" /></button>
                </div>
                <span className="formacao-lista-titulo">Soft Skills</span>
                <div className="formacao-modal">
                    {softSkills.length === 0 ? <p className="formacao-vazia">Nenhuma soft skills encontrada.</p>:
                        softSkills.map((item, index) => (
                            <div className="formacao-item" key={index}>
                                <span className="formacao-titulo">{item.nome_SoftSkills}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SoftSkill