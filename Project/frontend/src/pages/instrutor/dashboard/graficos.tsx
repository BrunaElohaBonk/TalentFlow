import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend } from "recharts";
import { useTheme } from "../../../context/themeContext";

interface Props {
    dados: any;
}

export function GraficoSetor( {dados} : Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#F97316" : "#193B82";
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"}/>
                <XAxis  dataKey="nome" stroke={darkMode ? "#fff" : "#000"}/>
                <YAxis stroke={darkMode ? "#fff" : "#000"}/>
                <Tooltip />
                <Bar dataKey="quantidade" fill={corPrimaria} radius={[10,10,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export function GraficoEstagio({ dados }: Props) {
    const { darkMode } = useTheme();
    const corAzulEscuro = darkMode ? "#F97316" : "#193B82";
    const corAzulClaro = darkMode ? "#FACC15" : "#35A7CF";
    const dadosGrafico = [
        {
            name:"Estagiando",
            value:dados.quantidade,
            fill: corAzulEscuro
        },
        {
            name:"Não estagiando",
            value: dados.naoEstagiando,
            fill: corAzulClaro
        }
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dadosGrafico} dataKey="value" nameKey="name" outerRadius={100}/>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function GraficoSuperior({ dados }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#F97316" : "#193B82"; 
    const corSecundaria = darkMode ? "#FACC15" : "#35A7CF"; 
    const dadosGrafico = [
        {
            name:"Cursando",
            value:dados.cursoSuperior,
            fill: corPrimaria
        },
        {
            name:"Não cursando",
            value:dados.naocursoSuperior,
            fill: corSecundaria
        }
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dadosGrafico} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}/>
                <Tooltip contentStyle={{backgroundColor: darkMode ? "#242424" : "#fff", color: darkMode ? "#fff" : "#000", border: "none"}}/>
                <Legend wrapperStyle={{color: darkMode ? "#fff" : "#000"}}/>
            </PieChart>
        </ResponsiveContainer>
    );
}

export function GraficoCompetencias({ dados }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#FACC15" : "#35A7CF";

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={dados}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                    type="category"
                    dataKey="nome"
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



export function GraficoIdiomas({ dados }: Props) {
    const { darkMode } = useTheme();
    const corPrimaria = darkMode ? "#F97316" : "#193B82";
    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dados} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="nome" width={100} />
                <Tooltip />
                <Bar dataKey="quantidade" fill={corPrimaria} radius={[0, 10, 10, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}
