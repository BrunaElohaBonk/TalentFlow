import Swal from "sweetalert2";
import lixeira from "../../../assets/img/lixeira.png";
import olho from "../../../assets/img/icon_olho.png";
import icon_editar from "../../../assets/img/icon_editar.png";
import adicionar from "../../../assets/img/icon adicionar.png";
import fechar from "../../../assets/img/close.png";
import { useEffect, useState } from "react";
import CursoComplementarVisualizar from "./ver/ver_curso";
import EditarCursoComplementar from "./editar/editar_curso";
import AdicionarCursoComplementar from "./adicionar/adicionar_curso";
import "./curso_complementar.css";
import api from "../../../services/api";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Cursos {
    id_Cursos:number;
    Id_Profile:number;
    name_Curso:string;
    status_Cursos: "CONCLUIDO" | "CURSANDO"|"NAO_INFORMADO";
    data_Conclusao:string;
    carga_horaria:number;
    certificado?: string |null;
}


function CursoComplementar({ visible, setVisible }: Props) {
  const [visualizarCurso, setVisualizarCurso] = useState(false);
  const [editarCurso, setEditarCurso] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Cursos | null>(null);
  const [adicionarCurso, setAdicionarCurso] = useState(false);
  const [curso, setCurso] = useState<Cursos []>([]);
  const [edv, setEdv] = useState(0);
  const [idProfile, setIdProfile] = useState(0);

  async function carregarCursos () {
      const usuario = localStorage.getItem("usuario");
      if (!usuario) return;
      const aprendizLogado = JSON.parse(usuario);
      const EDV = aprendizLogado.user.EDV;
      setEdv(EDV);

      const perfil = await api.get(`/aprendiz/meuPerfil/${edv}`);
      setIdProfile(perfil.data.data.id);
      const response = await api.get(
        `/aprendiz/meusCursos/${EDV}/${perfil.data.data.id}`,
      );
      setCurso(response.data.data);
  };
  useEffect(() => {
    if (visible) {
      carregarCursos();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Tem certeza?",
      text: "O idioma será deletado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) {
      return;
    }
    try {
      await api.delete(`/aprendiz/deletarCursos/${edv}/${id}`);
      setCurso((prev) =>
        prev.filter((curso) => curso.id_Cursos !== id),);
      Swal.fire({
        title: "Deletada!",
        text: "Cursos removido com sucesso!",
        icon: "success",
      });
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao deletar Cursos",
        icon: "error",
      });
    }
  };

  return (
    <div className="curso-container" onClick={() => setVisible(false)}>
      <div className="curso-body" onClick={(e) => e.stopPropagation()}>
        <div className="curso-header">
          <button
            type="button"
            className="btn-header"
            onClick={() => setAdicionarCurso(true)}
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
        <span className="curso-lista-titulo">Cursos Complementares</span>
        <div className="curso-modal">
          {curso?.length === 0 ? (
            <p className="curso-vazia">Nenhum curso complementar encontrado.</p>
          ) : (
            curso?.map((item) => (
              <div className="curso-item" key={item.id_Cursos}>
                <span className="curso-titulo">{item.name_Curso}</span>
                <div className="curso-acoes">
                  <button
                    type="button"
                    className="btn-acao"
                    onClick={() => {
                      setCursoSelecionado(item);
                      setVisualizarCurso(true);
                    }}
                  >
                    <img src={olho} alt="Visualizar" className="icon-olho" />
                  </button>
                  <button
                    type="button"
                    className="btn-acao"
                    onClick={() => {
                      setCursoSelecionado(item);
                      setEditarCurso(true);
                    }}
                  >
                    <img src={icon_editar} alt="Editar" />
                  </button>
                  <button
                    type="button"
                    className="btn-acao"
                    onClick={() => handleDelete(item.id_Cursos)}
                  >
                    <img src={lixeira} alt="Excluir" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {visualizarCurso && cursoSelecionado && (
          <CursoComplementarVisualizar
            visible={visualizarCurso}
            setVisible={setVisualizarCurso}
            curso={cursoSelecionado}
          />
        )}
        {editarCurso && cursoSelecionado && (
          <EditarCursoComplementar
            visible={editarCurso}
            setVisible={setEditarCurso}
            setCursoComplementar={setVisible}
            cursoAtual={cursoSelecionado}
            id_perfil={idProfile}
          />
        )}
        {adicionarCurso && (
          <AdicionarCursoComplementar
            visible={adicionarCurso}
            setVisible={setAdicionarCurso}
            setCursoComplementar={setVisible}
            id_profile={idProfile}
            edv={edv}
          />
        )}
      </div>
    </div>
  );
}

export default CursoComplementar;
