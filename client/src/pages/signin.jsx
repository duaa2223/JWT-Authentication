import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');  // إضافة حالة لرسائل النجاح
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // إعادة تعيين الخطأ عند كل محاولة تسجيل دخول
    setSuccess(''); 

    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', {
        username,
        password
      });

      // حفظ التوكن في السيشن
      sessionStorage.setItem('token', response.data.token);

  
      setSuccess('Login successful! Redirecting...');

      // إعادة التوجيه بعد النجاح
      setTimeout(() => {
        // navigate('/profile');
        navigate(`/profile/${response.data.userId}`);
      }); 

    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
