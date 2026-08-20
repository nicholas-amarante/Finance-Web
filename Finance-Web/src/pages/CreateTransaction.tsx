import { Button } from '../components/Button';
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SucessModal } from '../components/SuccessModal';
import { Navbar } from '../components/Navbar';
import { formatCurrency } from '../utils/formatters';
import { CreateBankModal } from '../components/CreateBankModal';
import { Plus } from 'lucide-react';

function CreateTransaction() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [categorySelected, setCategorySelected] = useState("");

    const [bankSelected, setBankSelected] = useState("")
    const [accountSelected, setAccountSelected] = useState("");

    const [erro, setErro] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [accountsRaw, setAccountsRaw] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<{ value: string; label: string }[]>([]);
    const [banks, setBanks] = useState<{ value: string; label: string }[]>([]);
    const [bankModalOpen, setBankModalOpen] = useState(false);
    const [categorys, setCategorys] = useState<{ value: string; label: string }[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const SHARED_CATEGORIES = ['Outros'];
    const INCOME_CATEGORIES = ['Salário', 'Rendimentos', 'Freelance'];

    interface AccountFromBack {
        id: number;
        description: String;
        bank_name: String;
    }
    interface CategoryFromBack {
        name: String;
    }

    const filteredCategories = categorys.filter(cat => {
        if (SHARED_CATEGORIES.includes(cat.label)) return true;
        if (transactionType === 'INCOME') return INCOME_CATEGORIES.includes(cat.label);
        if (transactionType === 'EXPENSE') return !INCOME_CATEGORIES.includes(cat.label);
        return true;
    })
    .sort((a, b) => {
        if (a.label === 'Outros') return 1;
        if (b.label === 'Outros') return -1;
        return a.label.localeCompare(b.label);
    });

    const handleBankCreated=(newBank:{name:string})=>{
        setBanks([...banks,{value:newBank.name,label:newBank.name}]);
        setBankSelected(newBank.name);
        setBankModalOpen(false);
    }
    
    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = "* Campo nome obrigatório";
        if (!value || Number(value) <= 0) newErrors.value = "* Campo valor deve ser maior que zero";
        if (!transactionType) newErrors.transactionType = "* Campo tipo obrigatório";
        if (!accountSelected) newErrors.accounts = "* Campo conta obrigatório";
        if (!categorySelected) newErrors.categorys = "* Campo categoria obrigatório";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const bankOptions = Array.from(new Set(accountsRaw.map(a => a.bank_name)))
        .map(name => ({ value: name, label: name }));
    const accountOptions = accountsRaw.filter(a => a.bank_name === bankSelected)
        .map(a => ({ value: String(a.id), label: a.description }));

    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem('tokenJwt');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
                const [responseAccounts, responseCategorys] = await Promise.all([
                    fetch('http://localhost:8080/api/accounts/my-accounts', { method: 'GET', headers }),
                    fetch('http://localhost:8080/api/category', { method: 'GET', headers })
                ]);
                if (responseAccounts.ok && responseCategorys.ok) {
                    const dataAccount: AccountFromBack[] = await responseAccounts.json();
                    const dataCategory: CategoryFromBack[] = await responseCategorys.json();
                    setAccountsRaw(dataAccount);

                    const Contas = dataAccount.map(conta => ({ value: String(conta.id), label: `${conta.description}` }));
                    const Bancos = dataAccount.map(banco => ({ value: String(banco.bank_name), label: `${banco.bank_name}` }));
                    setAccounts(Contas);
                    setBanks(Bancos);

                    const categorys = dataCategory.map(category => ({ value: String(category.name), label: `${category.name}` }));
                    setCategorys(categorys);
                }
            } catch (error) {
                console.error("Erro ao enviar", error);
            }
        };
        loadData();
    }, []);

    const handleCreateTransaction = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) return;

        const formatDateTimePayload = (selectedDate: string) => {
            if (!selectedDate) return null;
            const now = new Date();
            const currentTime = now.toTimeString().split(' ')[0];
            return `${selectedDate}T${currentTime}`;
        };

        const payload = {
            name: name.trim(),
            description: description?.trim() || null,
            value: typeof value === 'string' ? Number(value.replace(/\D/g, '')) / 100 : Number(value),
            account_id: Number(accountSelected),
            transactionType: transactionType,
            category: categorySelected,
            dateTime: formatDateTimePayload(dateTime)
        };

        try {
            const token = localStorage.getItem('tokenJwt');
            const response = await fetch('http://localhost:8080/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                setIsModalOpen(true);
            } else {
                setErro('Erro ao salvar a transação!')
            }
        } catch (error) {
            console.error(erro);
            setErro('The connection to the server failed')
        }
    }

    return (
        <>
            <div className='noise gradt w-screen min-h-screen flex flex-col justify-between overflow-x-hidden'>
                <div className='absolute z-20'>
                    <ExpandableMenu />
                </div>
                <div>
                    <Logo />
                </div>
                <div>
                    <Navbar />
                </div>

                <div className='w-screen flex-1 flex items-center justify-center py-12'>
                    <div className='w-screen xl:w-10/12 flex flex-col items-center'>
                        <div className='flex flex-col'>
                            <h1 className='leading-relaxed font-p text-white mb-6 ml-2 sm:ml-4 text-3xl sm:text-4xl'>Criar Transação</h1>
                        </div>

                        <div className='bg-white w-9/12 min-h-[65vh] h-auto p-5 sm:p-10 rounded-3xl z-10 flex flex-col justify-between shadow-2xl'>

                            <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 font-p w-full'>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Nome</label>
                                    <Input type="text" name="name" className='w-full' value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome*" />
                                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Valor</label>
                                    <Input type="text" name="value" className='w-full' value={value} onChange={(e) => setValue(formatCurrency(e.target.value))} placeholder="R$ 0,00" />
                                    {errors.value && <span className="text-red-500 text-xs">{errors.value}</span>}
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Tipo</label>
                                    <Select name="transactionType" id="" className='w-full' value={transactionType} onChange={(e) => { setTransactionType(e.target.value); setCategorySelected(""); }}>
                                        <option value="" disabled selected>Selecione o tipo</option>
                                        <option value="INCOME">Receita</option>
                                        <option value="EXPENSE">Despesa</option>
                                    </Select>
                                    {errors.transactionType && <span className="text-red-500 text-xs">{errors.transactionType}</span>}
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Banco</label>
                                    <div className='flex gap-2'>
                                        <Select name="BankId" id="" className='flex flex-row' options={bankOptions} value={bankSelected} onChange={(e) => { setBankSelected(e.target.value); setAccountSelected(""); }}>
                                        <option value="" disabled selected>Selecione o banco</option>
                                    </Select>
                                    <button
                                        type='button'
                                        onClick={() => setBankModalOpen(true)}
                                        className='h-8 w-8 flex items-center justify-center m-auto bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition shrink-0 cursor-pointer'
                                    >
                                        <Plus size={20} />
                                    </button>
                                    </div>
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className='font-medium text-gray-700 text-sm'>Conta</label>
                                    <Select name="accounts" id="" options={accountOptions} value={accountSelected} onChange={(e) => setAccountSelected(e.target.value)} disabled={!bankSelected}>
                                        <option value="" disabled selected>{bankSelected ? "Selecione a conta" : "Selecione o banco primeiro"}</option>
                                    </Select>
                                    {errors.accounts && <span className="text-red-500 text-xs">{errors.accounts}</span>}
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Categoria</label>
                                    <Select name='categorys' id="" className='' options={filteredCategories} value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)} disabled={!transactionType}>
                                        <option value="" disabled selected>{transactionType ? "Selecione uma categoria" : "Selecione o tipo primeiro"}</option>
                                    </Select>
                                    {errors.categorys && <span className="text-red-500 text-xs">{errors.categorys}</span>}
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-1.5'>
                                    <label className='font-medium text-gray-700 text-sm'>Fonte</label>
                                    <Select name="" id="" className=''>
                                        <option value="" disabled selected>Selecione a fonte</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-1 flex flex-col gap-2'>
                                    <label className='font-medium text-gray-700 text-sm'>Destino</label>
                                    <Input type="text" className='' placeholder="Digite um destino(opcional)" />
                                </div>

                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label className='font-medium text-gray-700 text-sm'>Descrição</label>
                                    <Input type="text" className='' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Digite uma descrição(opcional)" />
                                </div>
                                <div>
                                    <label className='font-medium text-gray-700 text-sm'>
                                        Data da Transação <span className="text-gray-400 font-normal">(Opcional)</span>
                                    </label>
                                    <Input type='date' name='datetime' className='w-full' value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
                                    {errors.dateTime && (<span className='text-red-500 text-xs'></span>)}
                                </div>
                            </form>

                            <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 w-full'>
                                <div className='w-full sm:w-auto'>
                                    <Button className='w-full sm:w-40 py-2.5' onClick={handleCreateTransaction}>Enviar</Button>
                                </div>
                                <div className='w-full sm:w-auto'>
                                    <Button className='w-full sm:w-44 py-2.5' to='/menu'>Voltar ao menu</Button>
                                </div>
                            </div>

                            <SucessModal
                                isOpen={isModalOpen}
                                onClose={() => {
                                    setIsModalOpen(false);
                                    setName('');
                                    setDescription('');
                                    setValue('');
                                    setDateTime('');
                                    setTransactionType('');
                                    setBankSelected('');
                                    setAccountSelected('');
                                    setCategorySelected('');
                                    setErrors({});
                                }}
                                title="Tudo certo!"
                                message="Sua transação foi registrada e o saldo da conta já foi atualizado."
                            />
                            <CreateBankModal
                                isOpen={bankModalOpen}
                                onClose={() => setBankModalOpen(false)}
                                onSave={handleBankCreated}
                                bankList={banks.map(b=>b.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTransaction