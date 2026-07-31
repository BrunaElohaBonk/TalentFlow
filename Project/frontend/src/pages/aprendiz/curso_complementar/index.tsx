import Swal from "sweetalert2";
import axios from "axios";
import lixeira from '../../../assets/img/lixeira.png'
import olho from '../../../assets/img/icon_olho.png'
import icon_editar from '../../../assets/img/icon_editar.png'
import adicionar from '../../../assets/img/icon adicionar.png'
import fechar from '../../../assets/img/close.png'
import { useEffect, useState } from "react";
import CursoComplementarVisualizar from "./ver/ver_curso";
import EditarCursoComplementar from "./editar/editar_curso";
import AdicionarCursoComplementar from "./adicionar/adicionar_curso";
import './curso_complementar.css'
import api from "../../../services/api";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Perfil {
    id: number,
    EDV_Aprendiz: number,
    cursos: cursosComplementares[],
}
interface cursosComplementares {
    id: number;
    certificado: string;
    name_Curso: string;
    status_Cursos: boolean;
    data_Conclusao: Date;
    carga_horaria: number;
};
interface user {
    edv: number;
}


function CursoComplementar({ visible, setVisible }: Props) {
 
    const [visualizarCurso, setVisualizarCurso] = useState(false);
    const [editarCurso, setEditarCurso] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState<any>(null);
    const [adicionarCurso, setAdicionarCurso] = useState(false);
    const [cursos, setCursos] = useState<cursosComplementares[]>([]);
    const [apireq, setApireq] = useState<Perfil | null>(null);
    const [aprendiz, setAprendiz] = useState<user | null>(null);

    useEffect(() => {
        async function carregarPerfil() {
            const usuario = localStorage.getItem("usuario");
            if (!usuario) return;
            const aprendizLogado = JSON.parse(usuario);
            const edv = aprendizLogado.user.EDV;
            setAprendiz({ edv });

            const response = await api.get(`/aprendiz/meuPerfil/${edv}`);
            setApireq(response.data.data)
        }
        carregarPerfil();
    }, []);

    if (!visible) {
        return null
    }
    const handleDelete = async (id: number) => {
        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O idioma será deletado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        })
        if (!confirm.isConfirmed) {
            return
        }
        try {
            await api.delete(`/aprendiz/deletarCursos/${apireq.EDV_Aprendiz}/${id}`);
            setCursos((prev) => prev.filter((curso) => curso.id !== id));
            Swal.fire({
                title: 'Deletada!',
                text: 'Idioma removido com sucesso!',
                icon: 'success'
            })
        }
        catch (error) {
            console.error('Erro ao deletar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar Idioma',
                icon: 'error'
            })
        }
    }

    return (
        <div className="curso-container" onClick={() => setVisible(false)}>
            <div className="curso-body" onClick={(e) => e.stopPropagation()}>
                <div className="curso-header">
                    <button type="button" className="btn-header" onClick={() => setAdicionarCurso(true)}>
                        <img src={adicionar} alt="adicionar" />
                    </button>
                    <button type="button" className="btn-header" onClick={() => setVisible(false)}>
                        <img src={fechar} alt="fechar" className="icon-fechar-img" />
                    </button>
                </div>
                <span className="curso-lista-titulo">Cursos Complementares</span>
                <div className="curso-modal">
                    {
                        apireq.cursos.length === 0 ?
                            <p className="curso-vazia">Nenhum curso complementar encontrado.</p>
                        :
                        apireq.cursos.map((item) => (
                            <div className="curso-item" key={item.id}>
                                <span className="curso-titulo">{item.name_Curso}</span>
                                <div className="curso-acoes">
                                    <button type="button" className="btn-acao"
                                        onClick={() => {
                                            setCursoSelecionado(item);
                                            console.log("item ", item)
                                            setVisualizarCurso(true);
                                        }}
                                    >
                                        <img src={olho} alt="Visualizar" className="icon-olho"/>
                                    </button>
                                    <button type="button" className="btn-acao" onClick={() => {
                                        setCursoSelecionado(item);
                                        setEditarCurso(true);
                                    }}>
                                        <img src={icon_editar} alt="Editar"/>
                                    </button>
                                    <button type="button" className="btn-acao" onClick={() => handleDelete(item.id)}>
                                        <img src={lixeira} alt="Excluir"/>
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
                        curso={cursoSelecionado}
                    />
                }
                {
                    editarCurso && cursoSelecionado && (
                        <EditarCursoComplementar
                            visible={editarCurso}
                            setVisible={setEditarCurso}
                            setCursoComplementar={setVisible}
                            id_curso= {cursoSelecionado.id}
                            id_perfil={apireq.id}
                        />
                    )
                }
                {
                    adicionarCurso && (
                        <AdicionarCursoComplementar
                            visible={adicionarCurso}
                            setVisible={setAdicionarCurso}
                            setCursoComplementar={setVisible}
                            id={apireq.id}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default CursoComplementar;