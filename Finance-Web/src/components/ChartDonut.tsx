import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data=[
    {name:'exemplo', value: 400},
    {name:'exemplo_2', value: 400},
    {name:'exemplo_3', value: 150}
];

const COLORS = ['#3b82f6', '#2563eb', '#60a5fa', '#93c5fd'];

export function ChartDonut(){
    return(
        <div className="w-full h-[300px] bg-white p-4 rounded-lg">
        <h2 className="text-gray-700 font-semibold mb-4">Gastos por Categoria</h2>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            data={data}
            cx="50%" // Posição central X
            cy="50%" // Posição central Y
            innerRadius={60} // Raio interno (o que faz ser uma rosca)
            outerRadius={80} // Raio externo
            paddingAngle={5}
            dataKey="value"
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={50}/>
        </PieChart>
        </ResponsiveContainer>
    </div>
    );
}