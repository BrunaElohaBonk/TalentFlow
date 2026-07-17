import './filter.css'
import { aprendizes } from '../../pages/instrutor/verAprendiz/aprendizes'
import { turmas } from '../../pages/instrutor/verTurma/turma'
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Button, FormLabel } from "@mui/material";
import { useState } from 'react';

function Filtro({ visible, setVisible, filtros, setFiltros }){
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

    if (!visible) return null;
    return(
        <div className='filtro-overlay'>
            <div className="filtro-modal">
                <FormControl fullWidth className="filtro-select">
                    <InputLabel>Turma</InputLabel>
                    <Select multiple value={filtros.turmas} label="Turma" onChange={(e)=> setFiltros({...filtros, turmas: e.target.value})}>
                        <MenuItem value="">Todas</MenuItem>
                        {turmas.map(turma=>(
                            <MenuItem key={turma.id} value={turma.nome}>{turma.nome}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className="filtro-checkbox">
                    <FormLabel>Setor</FormLabel>
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

                <div className="filtro-idade">
                    <FormLabel>Idade</FormLabel>
                    <input className="filtro-input" type="number" placeholder="Minímo" value={filtros.idadeMin} onChange={(e)=> setFiltros({...filtros, idadeMin:e.target.value})}/>
                    <span>até</span>
                    <input className="filtro-input" type="number" placeholder="Máximo" value={filtros.idadeMax} onChange={(e)=> setFiltros({...filtros,  idadeMax:e.target.value})}/>
                </div>

                <div className="filtro-checkbox">
                    <FormLabel>Idiomas</FormLabel>
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
                <div className="filtro-checkbox">
                    <FormLabel>Formação Acadêmica</FormLabel>
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

                <Box className="filtro-botoes">
                    <Button color="inherit" className="filtro-button secondary">Limpar</Button>
                    <Button variant="contained" className="filtro-button primary" onClick={()=>setVisible(false)}>Aplicar filtros</Button>
                </Box>
            </div>
        </div>
    );
}

export default Filtro