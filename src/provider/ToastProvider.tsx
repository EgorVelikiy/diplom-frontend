import { ToastContainer } from 'react-toastify'
import './Toast.css'
export function ToastProvider() {
  return (
    <ToastContainer
      stacked
      autoClose={1500}
      icon={() => {
        return <div />
      }}
      className="custom-toast-container"
    />
  )
}