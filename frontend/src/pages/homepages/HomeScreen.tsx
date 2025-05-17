import { useAuthStore } from "../../store/authUser"

function HomeScreen() {
  const { logout } = useAuthStore()
  return (
    <div>
      <p>
        HomeScreen
      </p>

      <button className="cursor-pointer" onClick={logout}>
        logout
      </button>
    </div>
  )
}
export default HomeScreen