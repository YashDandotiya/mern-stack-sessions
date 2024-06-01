import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sign = () => {
    const navigate = useNavigate()
    const [loginMode, setLoginMode] = useState(false)
    const [err, setError] = useState(null)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const login = async (e) => {
        e.preventDefault()
        try {
            setError(null)
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                credentials: 'include'
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Could not login, please try again')
            }
            navigate('/auth')
        } catch (error) {
            setError(error.message || 'Something went wrong, please try again')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(null)
            const response = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
                credentials: 'include'
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Sign up failed, try again later')
            }
            navigate('/auth')
        } catch (error) {
            setError(error.message || 'Something unexpected occurred')
        }
    }

    return (
        <div>
            <h1>Please Sign Up/Log In</h1>
            <form onSubmit={loginMode ? login : handleSubmit}>
                {!loginMode && <input type="text" name='username' placeholder="Username" value={formData.username} onChange={handleChange} />}
                <input type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} />
                <input type="text" name='email' placeholder="Email" value={formData.email} onChange={handleChange} />
                <button type="submit">{loginMode ? 'Log In' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setLoginMode(!loginMode)}>
                Click here to {loginMode ? 'Sign Up' : 'Log In'}
            </button>
            {err && <div>{err}</div>}
        </div>
    )
}

export default Sign
