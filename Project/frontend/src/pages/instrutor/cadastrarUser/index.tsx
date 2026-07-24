import { useParams } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
// import icon_olho from '../../../assets/img/icon_olho.png'
// import icon_olho_fechado from '../../../assets/img/icon_olho_fechado.png'
import './cadastrarUser.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { useTheme } from "../../../context/themeContext";
import api from "../../../services/api";
import { turmas as turmasMock } from "../verTurma/turma";

interface ITurma {
    id: number;
    nome: string;
    curso: string;
    instrutorEdv: number;
    instrutorNome: string;
}

interface IUser {
    edv: number;
    name: string;
    turma: string;
    email: string;
    user: string;
    nascimento: string;
    contato: string;
    senha: string;
    tipo: "instrutor" | "aprendiz";
}

function CadastrarUser() {
    const { id } = useParams();
    const { darkMode } = useTheme();
    const edvRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const userRef = useRef<HTMLInputElement>(null);
    const nascimentoRef = useRef<HTMLInputElement>(null);
    const contatoRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);
    const salvarRef = useRef<HTMLButtonElement>(null);
    const [turmas, setTurmas] = useState<ITurma[]>([]);
    const [selectTurma, setSelectTurma] = useState(turmasMock);
    const token = localStorage.getItem("token");
    // const [showPassword, setShowPassword] = useState(false)
    const proximoCampo = (e: React.KeyboardEvent<HTMLInputElement>, proximo: React.RefObject<HTMLElement | null>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            proximo.current?.focus();
        }};
        const [user, setUser] = useState<IUser>({
            edv: 0,
            name: '',
            turma: '',  
        email: '',
        user: '',
        nascimento: '',
        contato: '',
        senha: '',
        tipo: "aprendiz"
    });
    
    const fetchTurmas = async () => {
        try {
            const response = await api.get(`turma/visualizarTurmas`);
            setTurmas(response.data.response);
        }
        catch (e) {
            console.log(e);
        }
    };
    
    const fetchUser = async () => {
        try {
            const response = await api.get(`link backend`);
            const Usuario = response.data.response;
            setUser({
                edv: Usuario.edv || 0,
                name: Usuario.name || '',
                turma: Usuario.turma?.toString() || '',
                email: Usuario.email || '',
                user: Usuario.user || '',
                nascimento: Usuario.nascimento? new Date(Usuario.nascimento).toLocaleDateString("pt-BR"): '',
                contato: Usuario.contato || '',
                senha: '',
                tipo: Usuario.tipo
            });
        }
        catch (e) {
            console.error('Erro:', e);
        }
    };
    
    useEffect(() => {
        if (id) {
            fetchUser();
        }
        setSelectTurma(turmasMock);
        fetchTurmas();
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === "edv" ? Number(value) : value
        }));
    };
    
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [dia, mes, ano] = user.nascimento.split("/");
        const dataNascimento = new Date(
            Number(ano),
            Number(mes) - 1,
            Number(dia) + 1
        );
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        if (mesAtual < dataNascimento.getMonth() || (mesAtual === dataNascimento.getMonth() && diaAtual < dataNascimento.getDate())) {
            idade--;
        }
        
        if (idade < 15 || idade > 100) {
            Swal.fire({
                title: "Idade inválida!",
                text: "O usuário deve ter entre 15 e 100 anos.",
                icon: "warning",
            });
            return;
        }
        if (!user.edv || !user.name || !user.email || !user.nascimento || !user.contato || (user.tipo === "aprendiz" && !user.turma)) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            let response;
            if (user.tipo === "instrutor") {
                const dadosInstrutor = {
                    EDV: user.edv,
                    tipoUser: "INSTRUTOR",
                    name: user.name,
                    email_bosch: user.email,
                    user_bosch: user.user,
                    data_nascimento: user.nascimento,
                    contato: user.contato,
                    password_login: user.senha
                };
                console.log("Token enviado:", token);
                response = await api.post("instrutor/criarInstrutor", dadosInstrutor);
            } 
            else {
                const dadosAprendiz = { 
                    EDV: user.edv,
                    Id_Turma: Number(user.turma)
                };
                console.log("Token enviado:", token);
                response = await api.post("aprendiz/criar", dadosAprendiz, {headers: {Authorization: `Bearer ${token}`}});
            }
            Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário cadastrado com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
        } 
        catch (e) {
            console.error('Erro ao cadastrar:', e);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível cadastrar o usuário',
                icon: 'error'
            });
        }
    };

    const handleNascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/, "$1/$2");
        }
        if (value.length > 5) {
            value = value.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
        }
        setUser(prev => ({
            ...prev,
            nascimento: value,
            senha: prev.senha === "" || prev.senha === prev.nascimento? value: prev.senha
        }));
    };

    const handleContato = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");

        setUser({
            ...user,
            contato: value
        });
    };

    return (
        <div className="user">
            <Header />
            <div className="user-container">
                <Sidebar />
                <div className="user-body">
                    <form onSubmit={handleSubmit} className="user-form">
                        <span className="user-titulo">Cadastrar Usuário</span>
                        <div className="user-conteudo">
                            <div className="user-row">
                                <input ref={edvRef} name="edv" type="number" placeholder="EDV" value={user.edv || ''} onChange={handleChange} className="user-input" onKeyDown={(e) => proximoCampo(e, nameRef)}/>
                                <input ref={nameRef} name="name" placeholder="Nome Completo" value={user.name} onChange={handleChange} className="user-input" onKeyDown={(e) => proximoCampo(e, userRef)}/>
                            </div>
                            <div className="user-row">
                                <input ref={userRef} name="user" placeholder="User" value={user.user} onChange={handleChange} className="user-input" onKeyDown={(e) => proximoCampo(e, emailRef)}/>
                                <input ref={emailRef} name="email" placeholder="Email" value={user.email} onChange={handleChange} className="user-input" onKeyDown={(e) => proximoCampo(e, nascimentoRef)}/>
                            </div>
                            <div className="user-row">
                                <input ref={nascimentoRef} name="nascimento" placeholder="Data de nascimento" inputMode="numeric" value={user.nascimento} onChange={handleNascimento} className="user-input" maxLength={10} onKeyDown={(e) => proximoCampo(e, contatoRef)}/>
                                <input ref={contatoRef} name="contato" placeholder="Contato" inputMode="numeric" value={user.contato || ''} onChange={handleContato} className="user-input" maxLength={15} onKeyDown={(e) => proximoCampo(e, senhaRef)}/>
                            </div>
                            <div className="user-row">
                                <FormControl className="user-radio">
                                    <FormLabel>Tipo de usuário</FormLabel>
                                    <RadioGroup row value={user.tipo} onChange={(e) => {
                                            const tipo = e.target.value;
                                            setUser({...user, tipo: tipo as "instrutor" | "aprendiz", turma: tipo === "aprendiz" ? user.turma : ""});
                                        }}>
                                        <FormControlLabel value="instrutor" control={<Radio sx={{ color: "#2B83D5", "&.Mui-checked": { color: "#2B83D5" }, "& .MuiSvgIcon-root": { fontSize: 24 } }} />} label="Instrutor" />
                                        <FormControlLabel value="aprendiz" control={<Radio sx={{ color: "#2B83D5", "&.Mui-checked": { color: "#2B83D5" }, "& .MuiSvgIcon-root": { fontSize: 24 } }} />} label="Aprendiz" />
                                    </RadioGroup>
                                </FormControl>
                                {user.tipo === "aprendiz" && (
                                    <Select fullWidth displayEmpty value={user.turma} className={`user-select ${darkMode ? "dark" : ""}`} MenuProps={{classes:{paper: darkMode ? "user-select-dark-menu" : ""}}} onChange={(e) =>setUser({ ...user, turma: e.target.value })}>
                                        <MenuItem value="" disabled>Selecione uma turma</MenuItem>
                                        {selectTurma.map((turma) => (<MenuItem key={turma.id} value={turma.id}>{turma.nome}</MenuItem>))}
                                    </Select>
                                )}
                            </div>
                            {/* <div className="user-senha">
                                <input ref={senhaRef} name="senha" type={showPassword ? "text" : "password"} placeholder="Senha" value={user.senha} onChange={handleChange} className="user-input" onKeyDown={(e) => proximoCampo(e, salvarRef)}/>
                                <img src={showPassword ? icon_olho_fechado : icon_olho} alt="Visualizar senha" className='user-eye-icon' onClick={() => setShowPassword(!showPassword)}/>
                            </div> */}
                        </div>
                        <div className="user-button">
                            <button ref={salvarRef} type="submit" className="user-salvar">CONFIRMAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastrarUser;
