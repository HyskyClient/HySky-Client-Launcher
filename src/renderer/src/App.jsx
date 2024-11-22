import Navbar from './components/Navbar'
import Versions from './components/Versions'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const loginRedirect = () => window.location.href = "/login"

  return (
    <>
      <Navbar />
      <br />
      <br />
      <button onClick={loginRedirect}>login</button>
      <Versions></Versions>
    </>
  )
}

export default App

