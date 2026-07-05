import { useEffect, useState } from "react";
import ExpandableMenu from "../components/ExpandableMenu";
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";

interface Transaction{
    id:string;
    name:string;
    dateTime:string;
    description:string;
    bank:string;
    reserve:string;
    category:string;
    amount:number;
    type:'INCOME'|'EXPENSE';
}

function Transactions(){
    const[transactions, setTransactions]=useState<Transaction[]>([]);
    useEffect(()=>{
        const mockData:Transaction[]=[
            {
                id: '1',
                name: 'Título 01...',
                dateTime: '01/01/2026',
                description: 'Pagamento ref...',
                bank: 'Bradesco',
                reserve: 'Emergência',
                category: 'Transporte',
                amount: 1233.00,
                type: 'INCOME'
            },
            {
                id: '2',
                name: 'Título 02...',
                dateTime: '01/01/2026',
                description: 'Pagamento ref...',
                bank: 'Nubank',
                reserve: 'Carro',
                category: 'Transporte',
                amount: 1233.00,
                type: 'EXPENSE'
            },
            // Itens vazios/skeleton para simular o restante da lista do seu print
            { id: '3', name: '', dateTime: '', description: '', bank: '', reserve: '', category: '', amount: 0, type: 'INCOME' },
            { id: '4', name: '', dateTime: '', description: '', bank: '', reserve: '', category: '', amount: 0, type: 'INCOME' },
            { id: '5', name: '', dateTime: '', description: '', bank: '', reserve: '', category: '', amount: 0, type: 'EXPENSE' },
            { id: '5', name: '', dateTime: '', description: '', bank: '', reserve: '', category: '', amount: 0, type: 'INCOME' },
            { id: '5', name: '', dateTime: '', description: '', bank: '', reserve: '', category: '', amount: 0, type: 'EXPENSE' },
            { id: '5', name: '', dateTime: '', description: '', bank: '', reserve: '', category: '', amount: 0, type: 'EXPENSE' },
        ];
        setTransactions(mockData);
    }, []);

    const formatarMoeda=(valor:number)=>{
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    return(
        <>
            <div className='noise gradt font-p h-screen w-screen'>
                <div className='absolute z-20'>
                    <ExpandableMenu/>
                    <Logo/>
                </div>
                <div className="z-20">
                    <Navbar/>
                </div>
                <main className="w-screen h-screen flex items-end justify-center">
                    <div className="w-10/12 lg:w-9/11 flex flex-col">
                        <h1 className="text-3xl font-medium text-white mb-6 ml-4 tracking-wide">Transações</h1>
                        <section className="bg-white w-full h-[80vh] z-10 flex flex-col p-10 rounded-tl-3xl rounded-tr-3xl justify-between overflow-y-auto">
                            <div className="hidden lg:grid grid-cols-[80px_1.2fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr_1.2fr_50px] px-6 text-xs font-semibold text-gray-400 text-center items-center mb-2">
                                <div></div>
                                <div className="text-left">Nome</div>
                                <div className="text-left">Descrição</div>
                                <div>Banco</div>
                                <div>Reserva</div>
                                <div>Categoria</div>
                                <div>Valor</div>
                                <div></div>
                            </div>

                            <div className="lg:h-[620px] gap-7 flex flex-col justify-between overflow-y-auto scrollbar-thin">
                                {transactions.map((item) => {
                                    const isIncome = item.type === 'INCOME';
                                    const isEmpty = !item.name;
        
                                return (
                                    <div key={item.id} className='w-full min-h-[76px] rounded-2xl bg-gray-50/60 border border-gray-100 shadow-sm p-4 lg:px-6 flex flex-col lg:grid lg:grid-cols-[70px_1.2fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr_1.2fr_50px] items-center gap-3 lg:gap-2 text-center text-sm transition-all duration-200 hover:bg-gray-50'>
                                        
                                        <div className={`h-12 w-13 rounded-xl flex items-center justify-center border ${
                                            isIncome 
                                                ? 'bg-green-50 border-green-100 text-green-600'
                                                : 'bg-red-50 border-red-100 text-red-500'
                                        }`}>
                                            {isIncome ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                        </div>
        
                                        {!isEmpty ? (
                                            <>
                                                {/* 2. Nome e Data */}
                                                <div className='flex flex-col text-center lg:text-left w-full'>
                                                    <span className='font-bold text-gray-800 text-base lg:text-sm'>{item.name}</span>
                                                    <span className='text-[10px] text-gray-400 mt-2'>{item.dateTime}</span>
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
                                                {/* <div className={`font-semibold px-4 py-1.5 rounded-lg border w-full max-w-[120px] lg:max-w-none ${
                                                    isIncome ? 'text-red-500 bg-red-50/30 border-red-100' : 'text-green-600 bg-green-50/30 border-green-100'
                                                }`}>
                                                    {formatarMoeda(item.balanceBefore)}
                                                </div> */}
        
                                                {/* 8. Valor Cadastrado (Caixa Branca de Destaque) */}
                                                <div className='font-bold text-gray-700 bg-white px-4 py-1.5 rounded-lg border border-gray-200/80 shadow-sm w-full max-w-[120px] lg:max-w-none'>
                                                    {formatarMoeda(item.amount)}
                                                </div>
        
                                                {/* 9. Saldo Depois */}
                                                {/* <div className={`font-semibold px-4 py-1.5 rounded-lg border w-full max-w-[120px] lg:max-w-none ${
                                                    isIncome ? 'text-green-600 bg-green-50/30 border-green-100' : 'text-red-500 bg-red-50/30 border-red-100'
                                                }`}>
                                                    {formatarMoeda(item.balanceAfter)}
                                                </div> */}
        
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
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Transactions;