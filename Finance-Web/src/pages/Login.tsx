import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
        setErro("Preencha todos os campos.");
        return;
    }
    setErro('');
    setLoading(true);
    
    try {
      await AuthService.login({ email, password });
      navigate('/home'); 
    } catch (error: any) {
      setErro(error.message || 'Erro desconhecido ao tentar logar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      
      <div className="login-form">
        <div className="login-header">
            <h1>Bem-vindo</h1>
            <p>Gerencie suas finanças com inteligência.</p>
        </div>

        <div className="form-group">
            {/* Input Email */}
            <div className="input-group">
                <input 
                    type="email" 
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />
            </div>

            {/* Input Senha */}
            <div className="input-group">
                <input 
                    type="password" 
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="form-input"
                />
            </div>

            {/* Mensagem de Erro */}
            {erro && (
                <div className="error-message">
                    {erro}
                </div>
            )}

            {/* Botão de Login */}
            <button 
                onClick={handleLogin}
                disabled={loading}
                className="login-button"
            >
                {loading ? (
                    <span>Carregando...</span>
                ) : (
                    "Entrar na Conta"
                )}
            </button>
        </div>

        <div className="login-footer">
          <p>Não tem conta? <span onClick={() => navigate('/register')} className="link">Cadastre-se</span></p>
        </div>
      </div>
      
      <div className="footer">
        © 2025 Finance System. Secure Environment.
      </div>
    </div>
  )
}

export default Login