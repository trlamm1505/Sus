import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/Navbar';
import AllLessons from './page/AllLessons';
import CompletedLessons from './page/CompletedLessons';
import LessonDetail from './page/LessonDetail';
import Home from './page/Home';
function App() {


  return (
    <>
    <BrowserRouter>
    <MyNavbar/>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/SE182003/all-lessons' element={<AllLessons/>} />
     <Route path='/SE182003/completed-lessons' element={<CompletedLessons/>} />
     <Route path='/SE182003/:id' element={<LessonDetail/>} />
      </Routes>
   </BrowserRouter> 
    </>
  )
}

export default App
