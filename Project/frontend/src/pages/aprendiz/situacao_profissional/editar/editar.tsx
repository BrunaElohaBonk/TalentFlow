import './editar.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface ISituacao {
    setor: string;
    lider: string;
    estagio: string;
    descricao: string;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    edv: number;
}

function EditarSituacaoProfissional({ visible, setVisible, edv }: Props) {
    const [situacao, setSituacao] = useState<ISituacao>({
        setor: '',
        lider: '',
        estagio: '',
        descricao: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSituacao({
            ...situacao,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!situacao.setor || !situacao.lider || !situacao.estagio || !situacao.descricao) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos obrigatórios.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return
        }

        try {
            // BACKEND
            // Enviar EDV e informações da situação profissional para o banco.
            const response = await axios.put(
                `link backend/${edv}`,
                {
                    ...situacao
                }
            )

            Swal.fire({
                title: 'Sucesso!',
                text: 'Situação profissional atualizada com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })

            console.log(response.data)
            setVisible(false)
        } catch (error) {
            console.error('Erro ao atualizar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar a situação profissional.',
                icon: 'error',
                confirmButtonColor: '#2B83D5'
            })
        }
    }

    if (!visible) return null;

    return (
        <div className="editarSituacao-overlay">
            <form onSubmit={handleSubmit} className="editarSituacao-card">
                <button 
                    type="button" 
                    onClick={() => setVisible(false)} 
                    className="editarSituacao-fechar"
                >
                    <img src={sair} alt="Fechar" />
                </button>
                <span className="editarSituacao-titulo">
                    Editar Situação Profissional
                </span>
                <div className="editarSituacao-container">
                    <div className="editarSituacao-grupo">
                        <label className="editarSituacao-label">
                            Nome do Setor
                        </label>
                        <input 
                            name="setor"
                            className="editarSituacao-input"
                            value={situacao.setor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editarSituacao-grupo">
                        <label className="editarSituacao-label">
                            Nome do Líder
                        </label>
                        <input 
                            name="lider"
                            className="editarSituacao-input"
                            value={situacao.lider}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editarSituacao-grupo editarSituacao-radioGrupo">
                        <label className="editarSituacao-label">
                            Cumprindo estágio?
                        </label>
                        <FormControl className="editarSituacao-radio">
                            <RadioGroup row name="estagio"value={situacao.estagio} onChange={handleChange}>
                                <FormControlLabel 
                                    value="Sim" 
                                    sx={{
                                        "& .MuiFormControlLabel-label": {
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: "1rem",
                                            color: "#6a6a6a"
                                        }
                                    }}
                                    control={
                                        <Radio 
                                            sx={{ 
                                                color: "#2B83D5", 
                                                "&.Mui-checked": { color: "#2B83D5" }, 
                                                "& .MuiSvgIcon-root": { fontSize: 24 } 
                                            }} 
                                        />
                                    } 
                                    label="Sim" 
                                />
                                <FormControlLabel 
                                    value="Não" 
                                    sx={{
                                        "& .MuiFormControlLabel-label": {
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: "1rem",
                                            color: "#6a6a6a"
                                        }
                                    }}
                                    control={
                                        <Radio 
                                            sx={{ 
                                                color: "#2B83D5", 
                                                "&.Mui-checked": { color: "#2B83D5" }, 
                                                "& .MuiSvgIcon-root": { fontSize: 24 } 
                                            }} 
                                        />
                                    } 
                                    label="Não" 
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="editarSituacao-grupo">
                        <label className="editarSituacao-label">
                            Descrição
                        </label>
                        <textarea
                            name="descricao"
                            className="editarSituacao-textarea"
                            value={situacao.descricao}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="editarSituacao-botoes">
                        <button type="submit" className="editarSituacao-salvar">
                            SALVAR MODIFICAÇÃO
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditarSituacaoProfissional