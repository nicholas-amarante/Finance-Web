import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { useRegisterStore } from '../store/useRegisterStore';

function Register() {
  const navigate = useNavigate();
  
  const { formData, setFormData, resetForm } = useRegisterStore();
  
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(field, e.target.value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setFormData('cpf', value);
    }
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.cpf) {
        setErro("Preencha todos os campos obrigatórios.");
        return;
    }
    if (formData.password !== formData.confirmPassword) {
        setErro("As senhas não coincidem.");
        return;
    }

    setErro('');
    setLoading(true);
    
    try {
      await AuthService.register({
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
        role: 'ROLE_CUSTOM'
      });
      
      alert("Conta criada com sucesso! Faça login.");
      resetForm();
      navigate('/'); 
    } catch (error: any) {
      setErro(error.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      
      <div className="register-form">
        <button onClick={() => navigate('/')} className="back-button">
            ← Voltar
        </button>

        <div className="register-header">
            <h1>Crie sua Conta</h1>
            <p>Comece a controlar seu futuro financeiro.</p>
        </div>

        <div className="form-group">
            {/* Nome */}
            <input 
                type="text" 
                placeholder="Nome Completo" 
                value={formData.name} 
                onChange={handleChange('name')}
                className="form-input"
            />

            {/* CPF */}
            <input 
                type="text" 
                placeholder="CPF (000.000.000-00)" 
                value={formData.cpf} 
                onChange={handleCpfChange}
                className="form-input"
            />

            {/* Email */}
            <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                value={formData.email} 
                onChange={handleChange('email')}
                className="form-input"
            />

            {/* Senha e Confirmar */}
            <div className="password-grid">
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={formData.password} 
                    onChange={handleChange('password')}
                    className="form-input"
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Senha" 
                    value={formData.confirmPassword} 
                    onChange={handleChange('confirmPassword')}
                    className="form-input"
                />
            </div>

            {erro && (
                <div className="error-message">
                    {erro}
                </div>
            )}

            <button 
                onClick={handleRegister}
                disabled={loading}
                className="register-button"
            >
                {loading ? "Carregando..." : "Cadastrar Agora"}
            </button>
        </div>

        <div className="register-footer">
            <p>Já tem uma conta? <span onClick={() => navigate('/')} className="link">Fazer Login</span></p>
        </div>
      </div>
    </div>
  )
}

export default Register;