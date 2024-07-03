import { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const initial_input = {
  username: '',
  password: '',
};

export default function Login() {
  const { login } = useAuth();
  const [input, setInput] = useState(initial_input);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      setInput(initial_input);
      await login(input);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col gap-3 items-center p-4 bg-white rounded-md shadow-md"
        onSubmit={handleSubmitLogin}
      >
        <h1 className="text-3xl font-semibold">Log in</h1>
        <input
          className="border-2 w-[300px] rounded-md px-2 py-1.5"
          placeholder="Username"
          name="username"
          value={input.username}
          onChange={handleChangeInput}
        />
        <input
          className="border-2 w-[300px] rounded-md px-2 py-1.5"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
        />
        <button className="w-[300px] rounded-md px-2 py-1.5 text-white bg-secondary-color hover:bg-thirdly-color">
          Log in
        </button>
      </form>
    </div>
  );
}
