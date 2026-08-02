import "./editar_competencia.css";
import sair from "../../../../assets/img/close.png";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import api from "../../../../services/api";

interface ICompetencia {
  id: number;
  nivel_Competencia: "BASICO" | "INTERMEDIARIO" | "AVANÇADO";
  nome_Competencia: string;
}

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCompetencia: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  id_profile: number;
  edv: number;

  competenciaAtual: {
    id: number;
    nivel_Competencia: "BASICO" | "INTERMEDIARIO" | "AVANÇADO";
    nome_Competencia: string;
  };
}

function EditarCompetencia({
  visible,
  setVisible,
  setCompetencia,
  competenciaAtual,
  id_profile,
  edv,
  onSuccess,
}: Props) {
  const [competencia, setCompetenciaState] = useState<ICompetencia>({
    id: competenciaAtual.id,
    nivel_Competencia: competenciaAtual.nivel_Competencia,
    nome_Competencia: competenciaAtual.nome_Competencia,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompetenciaState({
      ...competencia,
      [e.target.name]: e.target.value,
    });
  };

  const handleNivel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompetenciaState({
      ...competencia,
      nivel_Competencia: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!competencia.nome_Competencia || !competencia.nivel_Competencia) {
      Swal.fire({
        title: "Atenção!",
        text: "Preencha todos os campos obrigatórios.",
        icon: "warning",
        confirmButtonColor: "#2B83D5",
      });
      return;
    }
    try {
      await api.put(`/aprendiz/atualizarCompetencias/${edv}/${id_profile}`, {
        id: competencia.id,
        nome_Competencia: competencia.nome_Competencia,
        nivel_Competencia: competencia.nivel_Competencia,
      });
      Swal.fire({
        title: "Sucesso!",
        text: "Competência atualizada com sucesso.",
        icon: "success",
        confirmButtonColor: "#2B83D5",
      });
      setVisible(false);
      onSuccess();
    } catch (error: any) {
      console.error("Detalhe do erro:", error.response?.data);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível atualizar a competência.",
        icon: "error",
      });
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="editarCompetencia-overlay"
      onClick={() => setVisible(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="editarCompetencia-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="editarCompetencia-fechar"
          onClick={() => {
            setVisible(false);
            setCompetencia(true);
          }}
        >
          <img src={sair} alt="Fechar" />
        </button>
        <span className="editarCompetencia-titulo">Competência</span>
        <div className="editarCompetencia-container">
          <div className="editarCompetencia-grupo">
            <label className="editarCompetencia-label">
              Nome da Competência
            </label>
            <input
              name="nomeCompetencia"
              className="editarCompetencia-input"
              value={competencia.nome_Competencia}
              onChange={handleChange}
            />
          </div>
          <div className="editarCompetencia-grupo">
            <label className="editarCompetencia-label">Nível</label>
            <FormControl className="editarCompetencia-radio">
              <RadioGroup
                row
                name="nivel"
                value={competencia.nivel_Competencia}
                onChange={handleNivel}
              >
                <FormControlLabel
                  value="BASICO"
                  control={
                    <Radio
                      sx={{
                        color: "#2B83D5",
                        "&.Mui-checked": {
                          color: "#2B83D5",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                    />
                  }
                  label="Básico"
                />
                <FormControlLabel
                  value="INTERMEDIARIO"
                  control={
                    <Radio
                      sx={{
                        color: "#2B83D5",
                        "&.Mui-checked": {
                          color: "#2B83D5",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                    />
                  }
                  label="Intermediário"
                />
                <FormControlLabel
                  value="AVANÇADO"
                  control={
                    <Radio
                      sx={{
                        color: "#2B83D5",
                        "&.Mui-checked": {
                          color: "#2B83D5",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 24,
                        },
                      }}
                    />
                  }
                  label="Avançado"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="editarCompetencia-botoes">
            <button className="editarCompetencia-salvar" type="submit">
              SALVAR MODIFICAÇÃO
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditarCompetencia;
