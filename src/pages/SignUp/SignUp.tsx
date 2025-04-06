import '../LogIn/LogIn.css'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../api/users_api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store/configureStore'
import { toast } from 'react-toastify'

export default function SignUp() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    
    const handleFormSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            email: e.target.elements.email.value,
            first_name: e.target.elements.first_name.value,
            last_name: e.target.elements.last_name.value,
        }

        dispatch(signUp(data)).unwrap()
            .then(() => {
                toast.success('Вы успешно зарегистрировались')
            })

        navigate('/')
    }

    return (
        <div className="form-container">
            <h2>Зарегистрироваться</h2>
            <form onSubmit={handleFormSubmit}>
                <fieldset className='signup-form'>
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
                </fieldset>
                <br></br>
                <fieldset className='signup-form'>
                    <input
                        id='email'
                        className='input imail'
                        type='email'
                        placeholder='Введите email'
                        required>
                    </input>
                    <input
                        id='first_name'
                        className='input first_name'
                        type='text'
                        placeholder='Введите своё имя'
                        required>
                    </input>
                    <input
                        id='last_name'
                        className='input last_name'
                        type='text'
                        placeholder='Введите свою фамилию'
                        required>
                    </input>
                    <button className='signup-btn' type='submit' >
                        Зарегистрироваться
                    </button>
                </fieldset>
            </form>
        </div>
    )
}