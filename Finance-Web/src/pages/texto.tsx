import { useState, useEffect } from 'react';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react'; // Ícones modernos para o card
import '../index.css';
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';

// 1. Tipagem dos dados da transação baseado no seu print
interface Transaction {
    id: string;
    title: string;
    date: string;
    description: string;
    bank: string;
    reserve: string;
    category: string;
    balanceBefore: number;
    amount: number;
    balanceAfter: number;
    type: 'INCOME' | 'EXPENSE'; // INCOME = Verde/Seta para cima, EXPENSE = Vermelho/Seta para baixo
}

export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Simulação de carregamento de dados (Substitua pelo seu fetch da API futuramente)
    useEffect(() => {
        const mockData: Transaction[] = [
            {
                id: '1',
                title: 'Título 01...',
                date: '01/01/2026',
                description: 'Pagamento ref...',
                bank: 'Bradesco',
                reserve: 'Emergência',
                category: 'Transporte',
                balanceBefore: 1234.00,
                amount: 1233.00,
                balanceAfter: 1234.00,
                type: 'INCOME'
            },
            {
                id: '2',
                title: 'Título 02...',
                date: '01/01/2026',
                description: 'Pagamento ref...',
                bank: 'Nubank',
                reserve: 'Carro',
                category: 'Transporte',
                balanceBefore: 1234.00,
                amount: 1233.00,
                balanceAfter: 1234.00,
                type: 'EXPENSE'
            },
            // Itens vazios/skeleton para simular o restante da lista do seu print
            { id: '3', title: '', date: '', description: '', bank: '', reserve: '', category: '', balanceBefore: 0, amount: 0, balanceAfter: 0, type: 'INCOME' },
            { id: '4', title: '', date: '', description: '', bank: '', reserve: '', category: '', balanceBefore: 0, amount: 0, balanceAfter: 0, type: 'INCOME' },
            { id: '5', title: '', date: '', description: '', bank: '', reserve: '', category: '', balanceBefore: 0, amount: 0, balanceAfter: 0, type: 'EXPENSE' },
        ];
        setTransactions(mockData);
    }, []);

    const formatarMoeda = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    return (
        <div className='noise gradt min-h-screen w-full font-p flex flex-col justify-end items-center overflow-x-hidden'>
            {/* Header / Topo Unificado */}
            <div className='absolute z-20 left-4 top-4 flex items-center gap-4'>
                <ExpandableMenu />
                <Logo />
            </div>
            
            {/* Ícone de perfil fictício no canto superior direito */}
            <div className='absolute z-20 right-6 top-5 h-11 w-11 rounded-full bg-gray-300 shadow-md' />

            <main className='relative z-10 w-full max-w-[1400px] flex flex-col items-start justify-end mt-24 px-4 sm:px-6'>
                {/* Título da Página fora da caixa branca */}
                <h1 className='text-3xl font-medium text-white mb-6 ml-4 tracking-wide'>Transações</h1>

                {/* Caixa Centralizada que encosta na base */}
                <section className='bg-white w-full min-h-[75vh] p-6 md:p-10 rounded-tl-3xl rounded-tr-3xl z-10 flex flex-col shadow-box-custom gap-4 overflow-y-auto'>
                    
                    {/* Cabeçalho Oculto da Tabela (Labels de Alinhamento) */}
                    <div className='hidden lg:grid grid-cols-[80px_1.2fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr_1.2fr_50px] px-6 text-xs font-semibold text-gray-400 text-center items-center mb-2'>
                        <div></div> {/* Espaço do ícone */}
                        <div className="text-left">Nome</div>
                        <div className="text-left">Descrição</div>
                        <div>Banco</div>
                        <div>Reserva</div>
                        <div>Categoria</div>
                        <div>Saldo Antes</div>
                        <div>Valor</div>
                        <div>Saldo Depois</div>
                        <div></div> {/* Espaço das opções */}
                    </div>

                    {/* Lista Dinâmica de Transações */}
                    {transactions.map((item) => {
                        const isIncome = item.type === 'INCOME';
                        const isEmpty = !item.title; // Verifica se é um card vazio da lista

                        return (
                            <div 
                                key={item.id}
                                className='w-full min-h-[76px] rounded-2xl bg-gray-50/60 border border-gray-100 shadow-sm p-4 lg:px-6 flex flex-col lg:grid lg:grid-cols-[80px_1.2fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr_1.2fr_50px] items-center gap-3 lg:gap-2 text-center text-sm transition-all duration-200 hover:bg-gray-50'
                            >
                                {/* 1. Ícone Dinâmico (Verde para entrada, Vermelho para saída) */}
                                <div className={`h-12 w-14 rounded-xl flex items-center justify-center border ${
                                    isIncome 
                                        ? 'bg-green-50 border-green-100 text-green-600' 
                                        : 'bg-red-50 border-red-100 text-red-500'
                                }`}>
                                    {isIncome ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                </div>

                                {/* Renderização condicional para linhas que possuem dados reais */}
                                {!isEmpty ? (
                                    <>
                                        {/* 2. Nome e Data */}
                                        <div className='flex flex-col text-center lg:text-left w-full'>
                                            <span className='font-bold text-gray-800 text-base lg:text-sm'>{item.title}</span>
                                            <span className='text-[10px] text-gray-400 mt-0.5'>{item.date}</span>
                                        </div>

                                        {/* 3. Descrição */}
                                        <div className='text-gray-500 text-center lg:text-left w-full truncate px-2'>
                                            {item.description}
                                        </div>

                                        {/* 4. Banco */}
                                        <div className='text-gray-600 font-medium bg-white lg:bg-transparent px-3 py-1 rounded-full lg:p-0 border border-gray-200 lg:border-none'>
                                            {item.bank}
                                        </div>

                                        {/* 5. Reserva */}
                                        <div className='text-gray-600 font-medium'>
                                            {item.reserve}
                                        </div>

                                        {/* 6. Categoria */}
                                        <div className='text-gray-500 bg-gray-200/50 px-3 py-1 rounded-md text-xs font-semibold'>
                                            {item.category}
                                        </div>

                                        {/* 7. Saldo Antes */}
                                        <div className={`font-semibold px-4 py-1.5 rounded-lg border w-full max-w-[120px] lg:max-w-none ${
                                            isIncome ? 'text-red-500 bg-red-50/30 border-red-100' : 'text-green-600 bg-green-50/30 border-green-100'
                                        }`}>
                                            {formatarMoeda(item.balanceBefore)}
                                        </div>

                                        {/* 8. Valor Cadastrado (Caixa Branca de Destaque) */}
                                        <div className='font-bold text-gray-700 bg-white px-4 py-1.5 rounded-lg border border-gray-200/80 shadow-sm w-full max-w-[120px] lg:max-w-none'>
                                            {formatarMoeda(item.amount)}
                                        </div>

                                        {/* 9. Saldo Depois */}
                                        <div className={`font-semibold px-4 py-1.5 rounded-lg border w-full max-w-[120px] lg:max-w-none ${
                                            isIncome ? 'text-green-600 bg-green-50/30 border-green-100' : 'text-red-500 bg-red-50/30 border-red-100'
                                        }`}>
                                            {formatarMoeda(item.balanceAfter)}
                                        </div>

                                        {/* 10. Botão de Opções (Três Pontinhos) */}
                                        <button className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/50 transition-colors lg:ml-auto'>
                                            <MoreVertical size={20} />
                                        </button>
                                    </>
                                ) : (
                                    // Layout vazio para as linhas de marcação (Skeleton lines)
                                    <div className="col-span-9 w-full h-4 hidden lg:block" />
                                )}
                            </div>
                        );
                    })}
                </section>
            </main>
        </div>
    );
}