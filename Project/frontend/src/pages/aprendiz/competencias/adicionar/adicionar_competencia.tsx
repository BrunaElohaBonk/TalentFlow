import "./adicionar_competencia.css";
import sair from "../../../../assets/img/close.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import api from "../../../../services/api";

interface ICompetencia {
  nomeCompetencia: string;
  nivel: "BASICO"|"INTERMEDIARIO"| "AVANÇADO"
}


interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  id:number;
  edv:number;
}

function AdicionarCompetencia({ visible, setVisible, onSuccess, id,edv }: Props) {
  const [competencia, setCompetenciaState] = useState<ICompetencia>({nomeCompetencia: "",nivel: 'BASICO'});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompetenciaState({
      ...competencia,
      [e.target.name]: e.target.value,
    });
  };

  const handleNivel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompetenciaState({
      ...competencia,
      nivel: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!competencia.nomeCompetencia || !competencia.nivel) {
      Swal.fire({
        title: "Atenção!",
        text: "Preencha todos os campos obrigatórios.",
        icon: "warning",
        confirmButtonColor: "#2B83D5",
      });
      return;
    }

    try {
      await api.post(
        `/aprendiz/adicionarCompetencia/${edv}/${id}`,
        {
          nome_Competencia: competencia.nomeCompetencia,
          nivel_Competencia: competencia.nivel,
        },
      );
      Swal.fire({
        title: "Sucesso!",
        text: "Competência adicionada com sucesso.",
        icon: "success",
        confirmButtonColor: "#2B83D5",
      });
      setVisible(false);
onSuccess();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível adicionar a competência.",
        icon: "error",
      });
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="adicionarCompetencia-overlay"
      onClick={() => setVisible(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="adicionarCompetencia-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="adicionarCompetencia-fechar"
          onClick={() => {
            setVisible(false);
          }}
        >
          <img src={sair} alt="Fechar" />
        </button>
        <span className="adicionarCompetencia-titulo">Competência</span>
        <div className="adicionarCompetencia-container">
          <div className="adicionarCompetencia-grupo">
            <label className="adicionarCompetencia-label">
              Nome da Competência
            </label>
            <input
              name="nomeCompetencia"
              className="adicionarCompetencia-input"
              value={competencia.nomeCompetencia}
              onChange={handleChange}
            />
          </div>
          <div className="adicionarCompetencia-grupo">
            <label className="adicionarCompetencia-label">Nível</label>
            <FormControl className="adicionarCompetencia-radio">
              <RadioGroup
                row
                name="nivel"
                value={competencia.nivel}
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
          <div className="adicionarCompetencia-botoes">
            <button type="submit" className="adicionarCompetencia-salvar">
              ADICIONAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdicionarCompetencia;
