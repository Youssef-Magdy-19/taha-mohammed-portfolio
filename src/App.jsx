import About from "./Pages/About"
import Footer from "./Compontents/Footer"
import Navbar from "./Compontents/Navbar"
import Home from "./Pages/Home"
import Projects from "./Pages/Projects"
import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import ProjectDetails from "./Pages/ProjectDetails"
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./Compontents/GolbalLoader"
import PageNotFound from "./Pages/PageNotFound"




function App() {

  document.documentElement.dir = localStorage.getItem('i18nextLng') === 'ar' ? 'rtl' : 'ltr'
  const [currentMode, setCurrentMode] = useState(localStorage.getItem("currentMode") || "light")

  useEffect(() => {
    const savedMode = localStorage.getItem("currentMode") || "light"
    setCurrentMode(savedMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "dark")
    localStorage.setItem("currentMode", currentMode)
  }, [currentMode])
  return (
    <>
      <LoadingProvider>

        <Navbar currentMode={currentMode} setCurrentMode={setCurrentMode} />
        <Routes>
          <Route path="/" element={<Home currentMode={currentMode} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <GlobalLoader />
        <Footer currentMode={currentMode} />
      </LoadingProvider>
    </>
  )
}

export default App
