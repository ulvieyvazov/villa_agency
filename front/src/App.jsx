import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import TopHeader from './components/TopHeader'
import Home from './components/Pages/Client/Home'

function App() {

  return (
    <>
      <TopHeader />
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
