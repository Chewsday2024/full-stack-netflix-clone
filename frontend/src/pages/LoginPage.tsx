import { useState } from "react"
import { Link } from "react-router-dom"

function LoginPage() {
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: ''
  })

  const handleLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLoginValue({
      ...loginValue,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(loginValue)
  }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={'/'}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">Login</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>

              <input 
                type="email"
                placeholder="you@example.com"
                id="email"
                name="email"
                onChange={(e) => handleLoginValue(e)}
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white caret-white focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>

              <input 
                type="password"
                placeholder="·········"
                id="password"
                name="password"
                onChange={(e) => handleLoginValue(e)}
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              />
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 hover:cursor-pointer">
              Login
            </button>
          </form>

          <div className="text-center text-gray-400">
            Don't have an account?&nbsp;&nbsp;

            <Link to={'/login'} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage