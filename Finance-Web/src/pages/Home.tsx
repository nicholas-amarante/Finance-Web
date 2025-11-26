import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, TrendingUp, TrendingDown, LogOut, Bell } from 'lucide-react';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-finance-bg text-gray-100 overflow-hidden">
            
            {/* SIDEBAR (Menu Lateral) */}
            <aside className="w-64 bg-finance-card border-r border-gray-700 hidden md:flex flex-col">
                <div className="p-6 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-finance-primary rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white">$</span>
                    </div>
                    <span className="text-xl font-bold tracking-wide">FinanceSys</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem icon={<Wallet size={20} />} label="Carteira" />
                    <NavItem icon={<TrendingUp size={20} />} label="Receitas" />
                    <NavItem icon={<TrendingDown size={20} />} label="Despesas" />
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors w-full p-2 rounded-lg hover:bg-white/5"
                    >
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-finance-card/50 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-gray-200">Visão Geral</h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-finance-primary to-blue-500 border border-white/20"></div>
                    </div>
                </header>

                {/* Área de Scroll (Dashboard) */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Cards de Resumo */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <SummaryCard title="Saldo Total" value="R$ 12.450,00" color="text-white" />
                        <SummaryCard title="Receitas" value="R$ 5.200,00" color="text-finance-primary" icon={<TrendingUp size={16} />} />
                        <SummaryCard title="Despesas" value="- R$ 3.100,00" color="text-red-400" icon={<TrendingDown size={16} />} />
                    </div>

                    {/* Espaço para Gráficos e Listas */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-finance-card rounded-xl p-6 border border-gray-700 h-96">
                            <h3 className="text-gray-400 text-sm font-medium mb-4">Fluxo de Caixa (Em Breve)</h3>
                            <div className="w-full h-full flex items-center justify-center text-gray-600 border-2 border-dashed border-gray-700 rounded-lg">
                                Gráfico virá aqui
                            </div>
                        </div>
                        <div className="bg-finance-card rounded-xl p-6 border border-gray-700 h-96">
                            <h3 className="text-gray-400 text-sm font-medium mb-4">Últimas Transações</h3>
                            <div className="space-y-4">
                                <TransactionItem name="Mercado" date="Hoje" value="- R$ 450,00" type="expense" />
                                <TransactionItem name="Salário" date="Ontem" value="+ R$ 3.500,00" type="income" />
                                <TransactionItem name="Netflix" date="22 Nov" value="- R$ 55,90" type="expense" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Componentes auxiliares para deixar o código limpo
const NavItem = ({ icon, label, active }: { icon: any, label: string, active?: boolean }) => (
    <button className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${active ? 'bg-finance-primary/10 text-finance-primary border-r-2 border-finance-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

const SummaryCard = ({ title, value, color, icon }: any) => (
    <div className="bg-finance-card p-6 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            {icon && <span className={`${color} bg-white/5 p-1 rounded`}>{icon}</span>}
        </div>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const TransactionItem = ({ name, date, value, type }: any) => (
    <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
        <div>
            <p className="font-medium text-white">{name}</p>
            <p className="text-xs text-gray-500">{date}</p>
        </div>
        <span className={`font-semibold ${type === 'income' ? 'text-finance-primary' : 'text-red-400'}`}>
            {value}
        </span>
    </div>
);

export default Home;