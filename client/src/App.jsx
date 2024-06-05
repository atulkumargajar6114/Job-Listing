import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import CreateJob from './pages/CreateJob'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/job/:id' element={<JobDetails/>}/>
        <Route path='/createjob' element={<CreateJob/>}/>
        <Route path='/edit/:id' element={<CreateJob/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
