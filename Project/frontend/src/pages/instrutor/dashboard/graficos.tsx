import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend } from "recharts";
import { useTheme } from "../../../context/themeContext";

interface Props {
    aprendizes: any[];
}

export function GraficoSetor({ aprendizes }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#F97316" : "#193B82";
    const dados = Object.values(
        aprendizes.reduce((acc, aprendiz) => {
            const setor = aprendiz.situacaoProfissional.nomeSetor;
            if (!acc[setor]) {
                acc[setor] = { setor, quantidade: 0 };
            }
            acc[setor].quantidade++;
            return acc;
        }, {})
    );
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"}/>
                <XAxis  dataKey="setor" stroke={darkMode ? "#fff" : "#000"}/>
                <YAxis stroke={darkMode ? "#fff" : "#000"}/>
                <Tooltip />
                <Bar dataKey="quantidade" fill={corPrimaria} radius={[10,10,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export function GraficoEstagio({ aprendizes }: Props) {
    const { darkMode } = useTheme();
    const corAzulEscuro = darkMode ? "#F97316" : "#193B82";
    const corAzulClaro = darkMode ? "#FACC15" : "#35A7CF";
    const estagiando = aprendizes.filter(aprendiz => aprendiz.situacaoProfissional.cumprindoEstagio).length;
    const dados = [
        {
            name:"Estagiando",
            value:estagiando,
            fill: corAzulEscuro
        },
        {
            name:"Não estagiando",
            value: aprendizes.length - estagiando,
            fill: corAzulClaro
        }
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dados} dataKey="value" nameKey="name" outerRadius={100}/>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function GraficoSuperior({ aprendizes }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#F97316" : "#193B82"; 
    const corSecundaria = darkMode ? "#FACC15" : "#35A7CF"; 
    const superior = aprendizes.filter(aprendiz =>  aprendiz.formacaoAcademica.some(formacao => formacao.nivelFormacao === "Graduação")).length;
    const dados = [
        {
            name:"Cursando",
            value: superior,
            fill: corPrimaria
        },
        {
            name:"Não cursando",
            value: aprendizes.length - superior,
            fill: corSecundaria
        }
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dados} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}/>
                <Tooltip contentStyle={{backgroundColor: darkMode ? "#242424" : "#fff", color: darkMode ? "#fff" : "#000", border: "none"}}/>
                <Legend wrapperStyle={{color: darkMode ? "#fff" : "#000"}}/>
            </PieChart>
        </ResponsiveContainer>
    );
}

export function GraficoCompetencias({ aprendizes }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#FACC15" : "#35A7CF";
    const dadosCompetencias = Object.values(
        aprendizes.reduce((acc, aprendiz) => {
            aprendiz.competencias.forEach((competencia: any) => {
                const nome = competencia.nome;
                if (!acc[nome]) {
                    acc[nome] = {
                        competencia: nome,
                        quantidade: 0,
                    };
                }
                acc[nome].quantidade++;
            });
            return acc;
        }, {} as Record<string, { competencia: string; quantidade: number }>)
    );

    return (
        <ResponsiveContainer width="100%" height={Math.max(300, dadosCompetencias.length * 40)}>
            <BarChart
                data={dadosCompetencias}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                    type="category"
                    dataKey="competencia"
                    width={140}
                    interval={0}
                />
                <Tooltip />
                <Bar
                    dataKey="quantidade"
                    fill={corPrimaria}
                    radius={[0, 10, 10, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}



export function GraficoIdiomas({ aprendizes }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#F97316" : "#193B82";
    const dadosIdiomas = Object.values(
        aprendizes.reduce((acc, aprendiz) => {
            aprendiz.idiomas.forEach((idioma: any) => {
                const nome = idioma.idioma;
                if (!acc[nome]) {
                    acc[nome] = { idioma: nome, quantidade: 0 };
                }
                acc[nome].quantidade++;
            });
            return acc;
        }, {} as Record<string, { idioma: string; quantidade: number }>)
    );
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosIdiomas} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="idioma" width={100} />
                <Tooltip />
                <Bar dataKey="quantidade" fill={corPrimaria} radius={[0, 10, 10, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}
