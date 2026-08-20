import { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

interface CreateBankModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (bank: { name: string }) => void;
    bankList: string[];
}

export function CreateBankModal({ isOpen, onClose, onSave, bankList }: CreateBankModalProps) {
    const [bankName, setBankName] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = bankName.trim();

        if (!trimmedName) {
            setError('Nome do banco é obrigatório');
            return;
        }

        if (bankList.includes(trimmedName)) {
            setError('Este banco já está cadastrado!');
            return;
        }
        onSave({ name: trimmedName });
        setBankName('');
        setError('');
        onClose();
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 relative animate-in fade-in zoom-in duration-200">
                <h2 className="text-2xl font-bold text-white mb-6">Adicionar Banco</h2>
                <form onSubmit={handleSave}>
                    <Input
                        placeholder="Ex: Nubank, Itaú..."
                        value={bankName}
                        autoFocus
                        onChange={(e) => { setBankName(e.target.value); if (error) setError('') }}
                    />
                    {error && <span className="text-red-500">{error}</span>}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type='button'
                            className=''
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}