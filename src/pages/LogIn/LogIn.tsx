import './LogIn.css'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../api/users_api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/configureStore'

export default function LogIn() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const isLoading = useSelector((state: RootState) => state.reducers.users.isLoading)

    const handleFormSubmit = async (e: any) => {
        e.preventDefault()

        const data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
        }

        dispatch(logIn(data)).unwrap()
            .then((res) => {
                localStorage.setItem('token', res.token)
                if (res.user.is_staff) {
                    navigate('/staff')
                } else {
                    navigate('/files')
                }
            })
    }

    return (
        <div className="form-container">
            <h2>Войти</h2>
            <form onSubmit={handleFormSubmit}>
                <fieldset className='login-form'>
                    <input
                        id='username'
                        className='input username'
                        type='text'
                        placeholder='Введите имя пользователя'
                        required>
                    </input>
                    <input
                        id='password'
                        className='input password'
                        type='password'
                        placeholder='Введите пароль'
                        required>
                    </input>
                    <button className='login-btn' type='submit'>
                        Войти
                    </button>
                </fieldset>
                {isLoading && <div className="loading-spinner">Loading...</div>}
            </form>
        </div>
    )
}