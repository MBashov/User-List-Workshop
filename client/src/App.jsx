import './app.css';
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import UserSection from "./components/user-section/UserSection"

function App() {

  return (
    <>
      <Header />

      <main className="main">
        <UserSection />
      </main>

      <Footer />
    </>
  )
}

export default App
