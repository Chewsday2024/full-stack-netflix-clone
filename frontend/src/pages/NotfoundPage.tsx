import { Link } from "react-router-dom"

function NotfoundPage() {
  return (
    <>
      <header className="px-4 py-8 bg-black w-full">
        <Link to={'/'}>
          <img src="/netflix-logo.png" alt="Netflix" className="h-8" />
        </Link>
      </header>

      <div className="min-h-screen bg-[url(/404.png)] bg-cover bg-center flex flex-col justify-center items-center text-white">

        <main className="text-center error-page--content z-10">
          <h1 className="text-7xl font-semibold mb-4">
            Lost your way?
          </h1>

          <p className="mb-6 text-xl">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>

          <Link to={'/'} className="bg-white text-black font-bold py-2 px-4 rounded">
            Netflix Home
          </Link>
        </main>
      </div>
    </>
  )
}
export default NotfoundPage