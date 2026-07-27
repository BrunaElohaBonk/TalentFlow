import './adicionar_idoma.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'

interface IIdioma {
    nomeIdioma: string;
    nivel: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIdioma: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdicionarIdioma({
    visible,
    setVisible,
    setIdioma
}: Props) {

    const [idioma, setIdiomaState] = useState<IIdioma>({
        nomeIdioma: '',
        nivel: '',
        certificado: null
    })

    const idiomas = [
        "Alemão",
        "Árabe",
        "Coreano",
        "Espanhol",
        "Francês",
        "Inglês",
        "Italiano",
        "Japonês",
        "Mandarim",
        "Russo",
        "Tailandês"
    ];

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

    const handleSubmit = async (
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
            await axios.post(
                `link backend`,
                {
                    ...idioma
                }
            )
            Swal.fire({
                title:'Sucesso!',
                text:'Idioma adicionado com sucesso.',
                icon:'success',
                confirmButtonColor:'#2B83D5'
            })
            setVisible(false);
        }catch(error){
            console.error(error)
            Swal.fire({
                title:'Erro!',
                text:'Não foi possível adicionar o idioma.',
                icon:'error'
            })
        }
    }

    if(!visible){
        return null
    }

    return(
        <div className="adicionarIdioma-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="adicionarIdioma-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="adicionarIdioma-fechar" onClick={()=>{
                        setVisible(false)
                        setIdioma(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="adicionarIdioma-titulo">Idioma</span>
                <div className="adicionarIdioma-container">
                <div className="adicionarIdioma-grupo">
                    <label className="adicionarIdioma-label">Nome do Idioma</label>
                    <select name="nomeIdioma" className="adicionarIdioma-input" value={idioma.nomeIdioma} onChange={handleChange}>
                        <option value="">Selecione o idioma</option>
                        {
                            idiomas.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
                    <div className="adicionarIdioma-grupo">
                        <label className="adicionarIdioma-label">Nível</label>
                        <FormControl className="adicionarIdioma-radio">
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
                    <div className="adicionarIdioma-grupo">
                        <label className="adicionarIdioma-label">Certificado</label>
                        <div 
                            className="certificado-container"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()}/>
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} className="certificado-upload" alt="upload"/>
                        </div>
                    </div>
                    <div className="adicionarIdioma-botoes">
                        <button className="adicionarIdioma-salvar" type="submit">
                            ADICIONAR
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdicionarIdioma