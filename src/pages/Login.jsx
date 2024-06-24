import { useState } from "react"
import { useAuth } from "../contexts/auth-context"
import { useNavigate } from "react-router-dom"

const initial_input = {
    username: '',
    password: ''
}

export default function Login() {
    const { admin, login } = useAuth()
    const [input, setInput] = useState(initial_input)
    const navigate = useNavigate()
    
    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmitLogin = async (e) => {
        try {
            e.preventDefault()
            setInput(initial_input)
            await login(input)
            navigate('/')
        } catch (error) {
            console.log(error)
            alert('invalid username or password')
        }
    }

    return (
        <>
            <form className="flex flex-col gap-2 items-center p-4" onSubmit={handleSubmitLogin}>
                <input className="border-2 w-[200px]" placeholder="Username" name="username" value={input.username} onChange={handleChangeInput} />
                <input className="border-2 w-[200px]" placeholder="Password" name="password" value={input.password} onChange={handleChangeInput} />
                <button className="border-2 w-[200px] hover:bg-gray-400">LOGIN</button>
            </form>
        </>
    )
}
