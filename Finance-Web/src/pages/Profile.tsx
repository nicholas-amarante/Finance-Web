import { useState } from 'react';
import { FiEdit2, FiLock } from 'react-icons/fi';
import '../index.css';
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';

type ProfileData = {
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
};

type EditableField = keyof ProfileData;

function Profile(){
    const [profile, setProfile] = useState<ProfileData>({
        name: 'Sasak Chan',
        email: 'sasak@email.com',
        cpf: '123.456.789-00',
        birthDate: '2000-01-01',
    });
    const [editingField, setEditingField] = useState<EditableField | null>(null);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [filters, setFilters] = useState({
        account: '',
        bank: '',
        category: '',
        source: '',
        destination: '',
    });

    const handleProfileChange = (field: EditableField, value: string) => {
        setProfile((currentProfile) => ({
            ...currentProfile,
            [field]: value,
        }));
    };

    const handleFilterChange = (field: keyof typeof filters, value: string) => {
        setFilters((currentFilters) => ({
            ...currentFilters,
            [field]: value,
        }));
    };

    const handlePasswordClick = () => {
        setPasswordMessage('Solicitacao de alteracao de senha iniciada.');
    };

    const selectOptions = {
        account: ['Conta corrente', 'Carteira', 'Poupanca'],
        bank: ['Nubank', 'Inter', 'Itau'],
        category: ['Alimentacao', 'Transporte', 'Lazer'],
        source: ['Salario', 'Freelance', 'Investimentos'],
        destination: ['Reserva', 'Cartao', 'Viagem'],
    };

    const fieldConfig: { id: EditableField; label: string; type: string }[] = [
        { id: 'name', label: 'Nome', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'cpf', label: 'CPF', type: 'text' },
        { id: 'birthDate', label: 'Nascimento', type: 'date' },
    ];

    return(
        <div className='noise gradt h-screen w-screen flex flex-row'>
            <div className='absolute z-20'>
                <ExpandableMenu/>
            </div>
            <div>
                <Logo/>
            </div>
            <main className='relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1180px] justify-center items-end'>
                <section className='bg-white w-full min-h-[85vh] p-4 md:p-10 rounded-tl-3xl rounded-tr-3xl z-10 flex flex-col shadow-box-custom'>
                    <h1 className='text-center text-3xl font-medium text-black'>Perfil</h1>

                    <div className='mt-4 grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12'>
                        <div className='flex justify-center lg:justify-start'>
                            <button
                                type='button'
                                aria-label='Alterar foto de perfil'
                                className='h-44 w-44 rounded-full bg-gray-300 transition-all duration-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 md:h-52 md:w-52'
                            />
                        </div>

                        <div>
                            <div className='flex items-center gap-5 text-sm text-gray-500'>
                                <span className='whitespace-nowrap'>Informacoes Pessoais</span>
                                <div className='h-px flex-1 bg-black/60' />
                            </div>

                            <form className='mt-5 grid gap-x-16 gap-y-8 md:grid-cols-2'>
                                {fieldConfig.map((field) => {
                                    const isEditing = editingField === field.id;

                                    return (
                                        <label key={field.id} className='flex flex-col gap-1 text-sm text-gray-700'>
                                            {field.label}
                                            <div className='relative'>
                                                <input
                                                    type={field.type}
                                                    value={profile[field.id]}
                                                    readOnly={!isEditing}
                                                    onChange={(event) => handleProfileChange(field.id, event.target.value)}
                                                    onBlur={() => setEditingField(null)}
                                                    className='h-10 w-full rounded-md bg-gray-300 px-3 pr-10 text-base text-black transition-all duration-300 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black/30'
                                                />
                                                <button
                                                    type='button'
                                                    aria-label={`Editar ${field.label}`}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                    onClick={() => setEditingField(field.id)}
                                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-black transition-colors hover:text-gray-600'
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                            </div>
                                        </label>
                                    );
                                })}

                                <div className='flex flex-col gap-1 text-sm text-gray-700 md:col-span-2'>
                                    <span>Alterar senha</span>
                                    <button
                                        type='button'
                                        aria-label='Alterar senha'
                                        onClick={handlePasswordClick}
                                        className='flex h-7 w-7 items-center justify-center rounded-md bg-gray-300 text-black transition-all duration-300 hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30'
                                    >
                                        <FiLock size={16} />
                                    </button>
                                    {passwordMessage && (
                                        <span className='text-xs text-gray-500'>{passwordMessage}</span>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='mx-auto my-16 h-px w-full max-w-[930px] bg-black/60' />

                    <section className='mx-auto grid w-full max-w-[650px] gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3'>
                        <label className='flex flex-col gap-1 text-sm text-gray-700'>
                            Contas
                            <select
                                value={filters.account}
                                onChange={(event) => handleFilterChange('account', event.target.value)}
                                className='h-10 rounded-md bg-gray-300 px-3 text-base text-black focus:outline-none focus:ring-1 focus:ring-black/30'
                            >
                                <option value=''>Selecione</option>
                                {selectOptions.account.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>

                        <label className='flex flex-col gap-1 text-sm text-gray-700'>
                            Bancos
                            <select
                                value={filters.bank}
                                onChange={(event) => handleFilterChange('bank', event.target.value)}
                                className='h-10 rounded-md bg-gray-300 px-3 text-base text-black focus:outline-none focus:ring-1 focus:ring-black/30'
                            >
                                <option value=''>Selecione</option>
                                {selectOptions.bank.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>

                        <label className='flex flex-col gap-1 text-sm text-gray-700'>
                            Categorias
                            <select
                                value={filters.category}
                                onChange={(event) => handleFilterChange('category', event.target.value)}
                                className='h-10 rounded-md bg-gray-300 px-3 text-base text-black focus:outline-none focus:ring-1 focus:ring-black/30'
                            >
                                <option value=''>Selecione</option>
                                {selectOptions.category.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>

                        <label className='flex flex-col gap-1 text-sm text-gray-700'>
                            Fontes
                            <select
                                value={filters.source}
                                onChange={(event) => handleFilterChange('source', event.target.value)}
                                className='h-10 rounded-md bg-gray-300 px-3 text-base text-black focus:outline-none focus:ring-1 focus:ring-black/30'
                            >
                                <option value=''>Selecione</option>
                                {selectOptions.source.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>

                        <label className='flex flex-col gap-1 text-sm text-gray-700'>
                            Destinos
                            <select
                                value={filters.destination}
                                onChange={(event) => handleFilterChange('destination', event.target.value)}
                                className='h-10 rounded-md bg-gray-300 px-3 text-base text-black focus:outline-none focus:ring-1 focus:ring-black/30'
                            >
                                <option value=''>Selecione</option>
                                {selectOptions.destination.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                    </section>
                </section>
            </main>
        </div>
    )
}

export default Profile;
