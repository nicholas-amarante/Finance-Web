import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define o formato dos dados
interface RegisterState {
  formData: {
    name: string;
    cpf: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: (field: string, value: string) => void;
  resetForm: () => void;
}

// Cria a store com persistência (salva no localStorage)
export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      formData: {
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      // Função para atualizar um campo específico
      setFormData: (field, value) => 
        set((state) => ({
          formData: { ...state.formData, [field]: value }
        })),
      // Função para limpar o formulário (usar após sucesso)
      resetForm: () => 
        set({ 
          formData: { name: '', cpf: '', email: '', password: '', confirmPassword: '' } 
        }),
    }),
    {
      name: 'register-storage', // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);