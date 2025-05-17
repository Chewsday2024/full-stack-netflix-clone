import { create } from 'zustand'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'


type signupValueType = {
  email: string
  username?: string
  password: string
}


type authStoreType = {
  user: {
    username: string
    email: string
    image: string
  } | null
  isSigningUp: boolean
  isCheckingAuth: boolean
  isLoggingOut: boolean
  isLoggingIn: boolean
  signup: ( credentials: signupValueType ) => Promise<void>
  login: ( credentials: signupValueType ) => Promise<void>
  logout: () => Promise<void>
  authCheck: () => Promise<void>
}


export const useAuthStore = create<authStoreType>( set => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async ( credentials ) => {
    try {
      const res = await axios.post('/api/v1/auth/signup', credentials)

      set({ user: res.data.user, isSigningUp: false })

      toast.success('Account created successfully')
    } catch (error) {
      set({ isSigningUp: false, user: null })
      
      if (error instanceof AxiosError) toast.error(error.response?.data.message || 'Signup failed')
    }
  },
  login: async ( credentials ) => {
    set({ isLoggingIn: true })
    try {
      const res = await axios.post('/api/v1/auth/login', credentials)

      set({ user: res.data.user, isLoggingIn: false })
    } catch (error) {
      set({ isLoggingIn: false, user: null })
      
      if (error instanceof AxiosError) toast.error(error.response?.data.message || 'Login failed')
    }
  },
  logout: async () => {
    set({ isLoggingOut: true })
    try {
      await axios.post('/api/v1/auth/logout')
      set({ user: null, isLoggingOut: false })

      toast.success('Logged out successfully')
    } catch (error) {
      set({ isLoggingOut: false })

      if (error instanceof AxiosError) toast.error(error.response?.data.message || 'Logout failed')
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true })
    try {
      const res = await axios.get('/api/v1/auth/authcheck')
      set({ user: res.data.user, isCheckingAuth: false })
    } catch (error) {
      if (error) set({ isCheckingAuth: false, user: null })
    }
  }
}))