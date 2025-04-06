import { ToastContainer } from 'react-toastify'

export function ToastProvider() {
  return (
    <ToastContainer
      hideProgressBar
      stacked
      autoClose={800}
      icon={() => {
        return <div className="indicator bg-green-500" />
      }}
    />
  )
}