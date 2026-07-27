import Swal from "sweetalert2";
import axios from "axios";
import fechar from '../../../../assets/img/close.png'
import './soft_skill.css'

interface ISoft{
    nome: string
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
                <span className="formacao-lista-titulo">Soft Skills</span>
                <div className="formacao-modal">
                    {
                        softSkills.length === 0 ?
                            <p className="formacao-vazia">
                                Nenhuma formação acadêmica encontrada.
                            </p>
                            :
                            softSkills.map((item, index) => (
                                <div
                                    className="formacao-item"
                                    key={index}
                                >
                                    <span className="formacao-titulo">
                                        {item.nome}
                                    </span>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SoftSkill