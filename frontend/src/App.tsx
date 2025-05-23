import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"
import { useEffect } from "react"



import SearchHistoryPage from "./pages/SearchHistoryPage"
import HomePage from "./pages/homepages/HomePage"
import NotfoundPage from "./pages/NotfoundPage"
import SearchPage from "./pages/SearchPage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import WatchPage from "./pages/WatchPage"
import Footer from "./components/Footer"




import { useAuthStore } from "./store/authUser"




function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()
  
  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={user ? <Navigate to={'/'} /> : <LoginPage />} />
        <Route path='/signup' element={user ? <Navigate to={'/'} /> : <SignUpPage />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={'/login'} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={'/login'} />} />
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={'/login'} />} />
        <Route path='/*' element={<NotfoundPage />} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  )
}

export default App
