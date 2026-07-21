import Swal from "sweetalert2";
import axios from "axios";
import olho from '../../../../assets/img/icon_olho.png'
import fechar from '../../../../assets/img/close.png'
import { useState } from "react";
import CursoComplementarVisualizar from "./ver/ver_curso";
import './curso_complementar.css'

interface ICurso {
    nomeCurso: string;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    cursoComplementar: ICurso[]
}


function CursoComplementar({ visible, setVisible, cursoComplementar }: Props) {

    const [visualizarCurso, setVisualizarCurso] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState<any>(null);


    if (!visible) {
        return null
    }

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

        <div className="formacao-container" onClick={() => setVisible(false)}>

            <div className="formacao-body" onClick={(e) => e.stopPropagation()}>


                <div className="formacao-header">

                    


                    <button
                        type="button"
                        className="btn-header"
                        onClick={() => setVisible(false)}
                    >

                        <img 
                            src={fechar} 
                            alt="fechar" 
                            className="icon-fechar-img" 
                        />

                    </button>

                </div>




                <div className="formacao-modal">


                    {
                        cursoComplementar.length === 0 ?

                            <p className="formacao-vazia">
                                Nenhum curso complementar encontrado.
                            </p>

                        :

                        cursoComplementar.map((item, index) => (

                            <div
                                className="formacao-item"
                                key={index}
                            >

                                <span className="formacao-titulo">

                                    {item.nomeCurso}

                                </span>



                                <div className="formacao-acoes">


                                    <button
                                        type="button"
                                        className="btn-acao"
                                        onClick={() => {
                                            setCursoSelecionado(item);
                                            setVisualizarCurso(true);
                                        }}
                                    >

                                        <img
                                            src={olho}
                                            alt="Visualizar"
                                            className="icon-olho"
                                        />

                                    </button>



                                </div>


                            </div>

                        ))

                    }


                </div>



                {
                    visualizarCurso &&
                    cursoSelecionado &&

                    <CursoComplementarVisualizar
                        visible={visualizarCurso}
                        setVisible={setVisualizarCurso}
                        cursosComplementares={cursoSelecionado}
                    />
                }


            </div>

        </div>

    )

}


export default CursoComplementar;