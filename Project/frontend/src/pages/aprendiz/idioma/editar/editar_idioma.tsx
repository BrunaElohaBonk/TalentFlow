import './editar_idioma.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface IIdioma {
    nomeIdioma: string;
    nivel: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIdioma: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function EditarIdioma({
    visible,
    setVisible,
    setIdioma,
    id
}: Props) {

    const [idioma, setIdiomaState] = useState<IIdioma>({
        nomeIdioma: '',
        nivel: '',
        certificado: null
    })

    const [nomeCertificado, setNomeCertificado] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept:{
            "image/*":[]
        },
        multiple:false,
        maxFiles:1,
        onDrop:(acceptedFiles)=>{
            if(acceptedFiles.length > 0){
                const arquivo = acceptedFiles[0];
                setNomeCertificado(arquivo.name);
                setIdiomaState((prev)=>({
                    ...prev,
                    certificado: arquivo
                }))
            }
        }
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    )=>{
        setIdiomaState({
            ...idioma,
            [e.target.name]: e.target.value
        })
    }

    const handleNivel = (
        e: React.ChangeEvent<HTMLInputElement>
    )=>{
            setIdiomaState({
            ...idioma,
            nivel: e.target.value
        })
    }    

    const handleSubmit = async(
        e:React.FormEvent<HTMLFormElement>
    )=>{
        e.preventDefault();
        if(
            !idioma.nomeIdioma ||
            !idioma.nivel
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
                    ...idioma
                }
            )
            Swal.fire({
                title:'Sucesso!',
                text:'Idioma atualizado com sucesso.',
                icon:'success',
                confirmButtonColor:'#2B83D5'
            })
            setVisible(false);
        }catch(error){
            console.error(error)
            Swal.fire({
                title:'Erro!',
                text:'Não foi possível atualizar o idioma.',
                icon:'error'
            })
        }
    }

    if(!visible){
        return null
    }

    return(
        <div className="editarIdioma-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="editarIdioma-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="editarIdioma-fechar" onClick={()=>{
                        setVisible(false)
                        setIdioma(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="editarIdioma-titulo">Idioma</span>
                <div className="editarIdioma-container">
                    <div className="editarIdioma-grupo">
                        <label className="editarIdioma-label">Nome do Idioma</label>
                        <input name="nomeIdioma" className="editarIdioma-input" value={idioma.nomeIdioma} disabled/>
                    </div>
                    <div className="editarIdioma-grupo">
                        <label className="editarIdioma-label">Nível</label>
                        <FormControl className="editarIdioma-radio">
                            <RadioGroup 
                                row
                                name="nivel"
                                value={idioma.nivel}
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
                                <FormControlLabel
                                    value="Fluente"
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
                                    label="Fluente"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="editarIdioma-grupo">
                        <label className="editarIdioma-label">Certificado</label>
                        <div className="certificado-container"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} alt="upload" className="certificado-upload"/>
                        </div>
                    </div>
                    <div className="editarIdioma-botoes">
                        <button type="submit" className="editarIdioma-salvar">
                            SALVAR MODIFICAÇÃO
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditarIdioma;
