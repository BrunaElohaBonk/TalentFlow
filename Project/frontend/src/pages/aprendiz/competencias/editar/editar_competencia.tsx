import './editar_competencia.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface ICompetencia {
    nomeCompetencia: string;
    nivel: string;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCompetencia: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function EditarCompetencia({
    visible,
    setVisible,
    setCompetencia,
    id
}: Props) {

    const [competencia, setCompetenciaState] = useState<ICompetencia>({
        nomeCompetencia: '',
        nivel: ''
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCompetenciaState({
            ...competencia,
            [e.target.name]: e.target.value
        })
    }

    const handleNivel = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCompetenciaState({
            ...competencia,
            nivel: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if(
            !competencia.nomeCompetencia ||
            !competencia.nivel
        ){
            Swal.fire({
                title:'Atenção!',
                text:'Preencha todos os campos obrigatórios.',
                icon:'warning',
                confirmButtonColor:'#2B83D5'
            })
            return;
        }
        try{
            await axios.put(
                `link backend/${id}`,
                {
                    ...competencia
                }
            )
            Swal.fire({
                title:'Sucesso!',
                text:'Competência atualizada com sucesso.',
                icon:'success',
                confirmButtonColor:'#2B83D5'
            })
            setVisible(false);
        }catch(error){
            console.error(error)
            Swal.fire({
                title:'Erro!',
                text:'Não foi possível atualizar a competência.',
                icon:'error'
            })
        }
    }

    if(!visible){
        return null
    }

    return(
        <div className="editarCompetencia-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit}className="editarCompetencia-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="editarCompetencia-fechar" onClick={()=>{
                        setVisible(false)
                        setCompetencia(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="editarCompetencia-titulo">Competência</span>
                <div className="editarCompetencia-container">
                    <div className="editarCompetencia-grupo">
                        <label className="editarCompetencia-label">Nome da Competência</label>
                        <input name="nomeCompetencia" className="editarCompetencia-input" value={competencia.nomeCompetencia} onChange={handleChange}/>
                    </div>
                    <div className="editarCompetencia-grupo">
                        <label className="editarCompetencia-label">Nível</label>
                        <FormControl className="editarCompetencia-radio">
                            <RadioGroup
                                row
                                name="nivel"
                                value={competencia.nivel}
                                onChange={handleNivel}
                            >
                                <FormControlLabel
                                    value="Básico"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root":{
                                                    fontSize:24
                                                }
                                            }}
                                        />
                                    }
                                    label="Básico"
                                />
                                <FormControlLabel
                                    value="Intermediário"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root":{
                                                    fontSize:24
                                                }
                                            }}
                                        />
                                    }
                                    label="Intermediário"
                                />
                                <FormControlLabel
                                    value="Avançado"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root":{
                                                    fontSize:24
                                                }
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
    )
}

export default EditarCompetencia
