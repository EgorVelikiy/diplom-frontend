import './App.css'
import Info from './pages/Info/Info'
import LogIn from './pages/LogIn/LogIn'
import HomePage from './components/HomePage/HomePage'
import SignUp from './pages/SignUp/SignUp'
import { ToastProvider } from './provider/ToastProvider'
import Staff from './pages/Staff/Staff'
import FilesStorage from './pages/FilesStorage/FilesStorage'
import Account from './pages/Account/Account'
import UploadFile from './pages/UploadFile/UploadFile'

import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements } from 'react-router-dom'
import UpdateFile from './pages/UpdateFile/UpdateFile'

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<HomePage />}>
        <Route index element={<Info />}/>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/staff' element={<Staff />}/>
        <Route path='/files' element={<FilesStorage />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/upload' element={<UploadFile />} />
        <Route path='/update/file' element={<UpdateFile />} />
      </Route>
    )
  )

  return (
    <>
      <ToastProvider />
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
