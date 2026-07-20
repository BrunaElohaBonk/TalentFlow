import './editar_curso.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'

interface ICurso {
    nomeCurso: string;
    situacao: string;
    dataConclusao: string;
    cargaHoraria: string;
    descricaoCurso: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCursoComplementar: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function EditarCursoComplementar({
    visible,
    setVisible,
    setCursoComplementar,
    id
}: Props) {

    const [curso, setCurso] = useState<ICurso>({
        nomeCurso: '',
        situacao: '',
        dataConclusao: '',
        cargaHoraria: '',
        descricaoCurso: '',
        certificado: null
    })

    const [nomeCertificado, setNomeCertificado] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        multiple:false,
        maxFiles:1,
        onDrop:(acceptedFiles)=>{
            if(acceptedFiles.length > 0){
                const arquivo = acceptedFiles[0];
                setNomeCertificado(arquivo.name);
                setCurso((prev)=>({
                    ...prev,
                    certificado: arquivo
                }))
            }
        }
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    )=>{

        setCurso({
            ...curso,
            [e.target.name]: e.target.value
        })
    }

    const handleSituacao = (
        e: React.ChangeEvent<HTMLInputElement>
    )=>{

        setCurso({
            ...curso,
            situacao:e.target.value,
            dataConclusao:
            e.target.value === "Cursando"
            ?
            ""
            :
            curso.dataConclusao
        })
    }

    const handleSubmit = async (
        e:React.FormEvent<HTMLFormElement>
    )=>{

        e.preventDefault();

        if(
            !curso.nomeCurso ||
            !curso.situacao ||
            !curso.cargaHoraria ||
            !curso.descricaoCurso
        ){

            Swal.fire({
                title:'Atenção!',
                text:'Preencha todos os campos obrigatórios.',
                icon:'warning',
                confirmButtonColor:'#2B83D5'
            })
            return;
        }

        if(
            curso.situacao === "Concluído" &&
            !curso.dataConclusao
        ){
            Swal.fire({
                title:'Atenção!',
                text:'Informe a data de conclusão.',
                icon:'warning',
                confirmButtonColor:'#2B83D5'
            })
            return;
        }

        try{
            await axios.put(
                `link backend/${id}`,
                {
                    ...curso
                }
            )

            Swal.fire({
                title:'Sucesso!',
                text:'Curso complementar atualizado com sucesso.',
                icon:'success',
                confirmButtonColor:'#2B83D5'
            })

            setVisible(false);

        }catch(error){
            console.error(error)

            Swal.fire({
                title:'Erro!',
                text:'Não foi possível atualizar o curso complementar.',
                icon:'error'
            })
        }
    }

    if(!visible){
        return null
    }

    return(
        <div className="editarCurso-overlay">
            <form onSubmit={handleSubmit} className="editarCurso-card">
                <button type="button" className="editarCurso-fechar" onClick={()=>{
                        setVisible(false)
                        setCursoComplementar(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="editarCurso-titulo">Curso Complementar</span>
                <div className="editarCurso-container">
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Nome do Curso</label>
                        <input name="nomeCurso" className="editarCurso-input" value={curso.nomeCurso} onChange={handleChange}/>
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Situação</label>
                        <FormControl>
                            <RadioGroup
                                row
                                name="situacao"
                                value={curso.situacao}
                                onChange={handleSituacao}
                            >
                                <FormControlLabel
                                    value="Concluído"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                }
                                            }}
                                        />
                                    }
                                    label="Concluído"
                                />
                                <FormControlLabel
                                    value="Cursando"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                }
                                            }}
                                        />
                                    }
                                    label="Cursando"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Data de Conclusão</label>
                        <input type="date" name="dataConclusao" disabled={curso.situacao !== "Concluído"} className={curso.situacao === "Concluído" ? "editarCurso-input" : "editarCurso-input curso-disabled"} value={curso.dataConclusao} onChange={handleChange}/>
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Carga Horária</label>
                        <input name="cargaHoraria" className="editarCurso-input" value={curso.cargaHoraria} onChange={handleChange}/>
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Descrição do Curso</label>
                        <textarea name="descricaoCurso" className="editarCurso-textarea" value={curso.descricaoCurso} onChange={handleChange}/>
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Certificado</label>
                        <div className="certificado-container"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()}/>
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} className="certificado-upload" alt="upload"/>
                        </div>
                    </div>
                    <div className="editarCurso-botoes">
                        <button className="editarCurso-salvar" type="submit">SALVAR MODIFICAÇÃO</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditarCursoComplementar