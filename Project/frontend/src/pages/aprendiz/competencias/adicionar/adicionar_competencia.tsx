import './adicionar_competencia.css'
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
}

function AdicionarCompetencia({
    visible,
    setVisible,
    setCompetencia
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
            await axios.post(
                `link backend`,
                {
                    ...competencia
                }
            )

            Swal.fire({
                title:'Sucesso!',
                text:'Competência adicionada com sucesso.',
                icon:'success',
                confirmButtonColor:'#2B83D5'
            })
            setVisible(false);

        }catch(error){
            console.error(error)
            Swal.fire({
                title:'Erro!',
                text:'Não foi possível adicionar a competência.',
                icon:'error'
            })
        }
    }

    if(!visible){
        return null
    }

    return(
        <div className="adicionarCompetencia-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="adicionarCompetencia-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="adicionarCompetencia-fechar" onClick={()=>{
                        setVisible(false)
                        setCompetencia(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="adicionarCompetencia-titulo">Competência</span>
                <div className="adicionarCompetencia-container">
                    <div className="adicionarCompetencia-grupo">
                        <label className="adicionarCompetencia-label">Nome da Competência</label>
                        <input name="nomeCompetencia" className="adicionarCompetencia-input" value={competencia.nomeCompetencia} onChange={handleChange}/>
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
                    <div className="adicionarCompetencia-botoes">
                        <button type="submit" className="adicionarCompetencia-salvar">
                            ADICIONAR
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )   
}

export default AdicionarCompetencia