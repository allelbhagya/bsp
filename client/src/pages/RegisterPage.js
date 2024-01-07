import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function register(ev) {
    ev.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      const data = await response.json();
      setMessage('User registered successfully');
      console.log('Registration successful:', data);
    } catch (error) {
      setMessage(error.message);
      alert(error.message); 
      console.error('Error during registration:', error.message);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>register</button>

      {message && (
        <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </form>
  );
}
