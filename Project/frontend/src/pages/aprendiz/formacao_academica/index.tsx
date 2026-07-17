import Swal from "sweetalert2";
import axios from "axios";
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import './formacao_academica.css'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditarFormacao: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormacaoAcademica({ visible, setVisible, setEditarFormacao }: Props) {

    if (!visible) {
        return null
    }

    const formacoes = [
        {
            id: 1,
            curso: "Engenharia de Controle e Automação",
            instituicao: "Universidade Tecnológica Federal do Paraná",
            situacao: "Cursando",
            periodoAtual: 6,
            totalPeriodos: 10,
            nivelFormacao: "Superior",
            descricao: "Graduação voltada para automação industrial."
        },
        {
            id: 2,
            curso: "Técnico em Automação Industrial",
            instituicao: "SENAI",
            situacao: "Concluído",
            periodoAtual: 4,
            totalPeriodos: 4,
            nivelFormacao: "Técnico",
            descricao: "Formação técnica em automação."
        }
    ];

    const handleDelete = async (id:number) => {

        const confirm = await Swal.fire({
            title:'Tem certeza?',
            text:'A Formação Acadêmica será deletada!',
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'Sim, deletar!',
            cancelButtonText:'Cancelar'
        })

        if(!confirm.isConfirmed){
            return
        }

        try{

            await axios.delete(`link backend/${id}`)

            Swal.fire({
                title:'Deletada!',
                text:'Formação removida com sucesso!',
                icon:'success'
            })

        }catch(error){

            console.error(error)

            Swal.fire({
                title:'Erro!',
                text:'Erro ao deletar formação.',
                icon:'error'
            })

        }

    }

    return(
        <div className="formacao-container">

            <div className="formacao-body">

                <div className="formacao-header">

                    <button
                        type="button"
                        className="btn-header"
                    >
                        <img src={adicionar} alt="Adicionar"/>
                    </button>

                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => setVisible(false)}
                    >
                        <img src={fechar} alt="Fechar" className="icon-fechar-img"/>
                    </button>

                </div>


                <div className="formacao-modal">

                    {
                        formacoes.map((item)=>(

                            <div className="formacao-item" key={item.id}>

                                <span className="formacao-titulo">
                                    {item.curso}
                                </span>


                                <div className="formacao-acoes">


                                    <button
                                        type="button"
                                        className="btn-acao"
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
                                        onClick={()=>{
                                            setVisible(false)
                                            setEditarFormacao(true)
                                        }}
                                    >
                                        <img
                                            src={icon_editar}
                                            alt="Editar"
                                        />
                                    </button>


                                    <button
                                        type="button"
                                        className="btn-acao"
                                        onClick={()=>handleDelete(item.id)}
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

export default FormacaoAcademica