import './filter.css'
import { aprendizes } from '../../pages/instrutor/verAprendiz/aprendizes'
import { turmas } from '../../pages/instrutor/verTurma/turma'
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Button, FormLabel } from "@mui/material";
import { useState } from 'react';
import fechar from '../../assets/img/close.png'
import setinha from '../../assets/img/setinha.png'

function Filtro({ visible, setVisible, filtros, setFiltros }){
    const [aberto, setAberto] = useState<string | null>(null);
    const alternarFiltro = (nome: string) => {
        setAberto(aberto === nome ? null : nome);
    };
    const setores = [
        "Engenharia",
        "RH",
        "TEF",
        "BDO",
        "BD",
        "Logística",
        "CRIN"
    ];

    const idiomas = [
        "Alemão",
        "Italiano",
        "Inglês",
        "Espanhol",
        "Francês",
        "Russo"
    ];

     const formacoes = [
        ...new Set(
            aprendizes.flatMap(ap =>
                ap.formacaoAcademica.map(f => f.nomeCurso)
            )
        )
    ];

    const limparFiltros = () => {
        setFiltros({
            turmas: [],
            setores: [],
            idadeMin: "",
            idadeMax: "",
            idiomas: [],
            formacoes: []
        });
    };

    if (!visible) return null;
    return(
        <div className='filtro-overlay' onClick={() => setVisible(false)}>
            <div className="filtro-modal" onClick={(e) => e.stopPropagation()}>
                <div className='filtro-fechar'>
                    <button type="button" onClick={() => {setVisible(false); limparFiltros();}} className='filtro-fechar-button'><img src={fechar} alt="fechar" className='filtro-img-fechar'/></button>
                </div>
                <div className="filtro-titulo-expansivel"  onClick={() => setAberto(aberto === "turmas" ? null : "turmas")}>
                    <span>Turma</span>
                    <img  src={setinha} alt="abrir filtro" className="filtro-titulo-img"/>
                </div>
                <div className={`filtro-expansao ${aberto === "turmas" ? "mostrar" : ""}`}>
                    <div className="filtro-checkbox">
                        <FormGroup>
                            {turmas.map((turma) => (
                                <FormControlLabel key={turma.id} label={turma.nome} control={
                                    <Checkbox checked={filtros.turmas?.includes(turma.nome) ?? false} onChange={(e) => {
                                        if (e.target.checked) {
                                            setFiltros({...filtros, turmas: [...(filtros.turmas ?? []), turma.nome]});
                                        } else {
                                            setFiltros({...filtros, turmas: (filtros.turmas ?? []).filter(t => t !== turma.nome)});
                                        }}}
                                    />}
                                />
                            ))}
                        </FormGroup>
                    </div>
                </div>
                <div className="filtro-titulo-expansivel" onClick={() => alternarFiltro("setor")}>
                    <span>Setores</span>
                    <img  src={setinha} alt="abrir filtro" className="filtro-titulo-img"/>
                </div>
                <div className={`filtro-expansao ${aberto === "setor" ? "mostrar" : ""}`}>
                    <div className="filtro-checkbox">
                        <FormGroup>
                            {setores.map(setor=>(
                                <FormControlLabel key={setor} label={setor}  control={
                                    <Checkbox checked={filtros.setores?.includes(setor) ?? false} onChange={(e)=>{
                                        if(e.target.checked) {
                                            setFiltros({...filtros, setores:[...(filtros.setores ?? []),setor]})
                                        }
                                        else {
                                            setFiltros({...filtros, setores: (filtros.setores ?? []).filter(s => s !== setor)})
                                        }}}
                                    />
                                }/>
                        ))}
                        </FormGroup>
                    </div>
                </div>
                <div className="filtro-titulo-expansivel" onClick={() => alternarFiltro("idade")}>
                    <span>Idade</span>
                    <img  src={setinha} alt="abrir filtro" className="filtro-titulo-img"/>
                </div>
                <div className={`filtro-expansao ${aberto === "idade" ? "mostrar" : ""}`}>
                    <FormControl fullWidth>
                        <div className="filtro-idade-inputs">
                            <input className="filtro-input" type="number" placeholder="Mínimo" value={filtros.idadeMin} onChange={(e) => setFiltros({...filtros, idadeMin: e.target.value})}/>
                            <span>até</span>
                            <input className="filtro-input" type="number" placeholder="Máximo" value={filtros.idadeMax} onChange={(e) => setFiltros({...filtros, idadeMax: e.target.value})}/>
                        </div>
                    </FormControl>
                </div>
                
                <div className="filtro-titulo-expansivel" onClick={() => alternarFiltro("idiomas")}>
                    <span>Idiomas</span>
                    <img  src={setinha} alt="abrir filtro" className="filtro-titulo-img"/>
                </div>
                <div className={`filtro-expansao ${aberto === "idiomas" ? "mostrar" : ""}`}>
                    <div className="filtro-checkbox">
                        <FormGroup>
                            {idiomas.map(idioma=>(
                                <FormControlLabel key={idioma} label={idioma} control={
                                    <Checkbox checked={filtros.idiomas?.includes(idioma) ?? false} onChange={(e)=>{
                                        if(e.target.checked) {
                                            setFiltros({...filtros, idiomas:[...filtros.idiomas, idioma]})
                                        }
                                        else {
                                            setFiltros({...filtros, idiomas: filtros.idiomas.filter(i=>i!==idioma)})
                                        }}}
                                    />
                                }/>
                            ))}
                        </FormGroup>
                    </div>
                </div>
                <div className="filtro-titulo-expansivel" onClick={() => alternarFiltro("formacao")}>
                    <span>Formação Acadêmica</span>
                    <img  src={setinha} alt="abrir filtro" className="filtro-titulo-img"/>
                </div>
                <div className={`filtro-expansao ${aberto === "formacao" ? "mostrar" : ""}`}>
                    <div className="filtro-checkbox">
                        <FormGroup>
                            {formacoes.map(formacao=>(
                                <FormControlLabel key={formacao} label={formacao} control={
                                    <Checkbox checked={filtros.formacoes?.includes(formacao) ?? false} onChange={(e)=>{
                                        if(e.target.checked) {
                                            setFiltros({...filtros, formacoes:[...filtros.formacoes, formacao]})
                                        }
                                        else {
                                            setFiltros({...filtros, formacoes: filtros.formacoes.filter(f=>f!==formacao)})
                                        }}}/>
                                    }
                                />
                            ))}
                        </FormGroup>
                    </div>
                </div>

                <Box className="filtro-botoes">
                    <Button color="inherit" className="filtro-button secondary" onClick={limparFiltros}>Limpar</Button>
                    <Button variant="contained" className="filtro-button primary" onClick={()=>setVisible(false)}>Aplicar filtros</Button>
                </Box>
            </div>
        </div>
    );
}

export default Filtro