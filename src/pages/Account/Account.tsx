import { useDispatch, useSelector } from 'react-redux'
import './Account.css'
import { AppDispatch, RootState } from '../../redux/store/configureStore';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { updateUser } from '../../api/users_api';
import { UserInterface } from '../../types';

export default function Account() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.reducers.users.currUser || {} as UserInterface)
    
    const [formData, setFormData] = useState<UserInterface>(user)

    let [passwordChange, setPasswordChange] = useState(false)

    let isFormModified = JSON.stringify(formData) == JSON.stringify(user)

    if (passwordChange) {
        isFormModified = false
    }

    const togglePasswordChange = () => {
        passwordChange = !passwordChange
        setPasswordChange(passwordChange)
        console.log(passwordChange)
    }

    const onChangeHandle = (e: any) => {
        const { id, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        
        let data = {
            first_name: e.target.elements.first_name.value as string,
            last_name: e.target.elements.last_name.value as string,
            password: e.target.elements.password.value,
            id: user?.id
        }

        dispatch(updateUser(data))
            .unwrap()
            .then((res) => {
                if (res.is_staff) {
                    navigate('/staff')
                } else {
                    navigate('/files')
                }
            })
    }

    return (
        <div className='form-container'>
            Изменить пользователя: <h3 className='username-title'>{user?.username}</h3>
            <form onSubmit={onSubmitHandler}>
                <fieldset className='change-form'>
                    <label htmlFor='first_name'>Имя пользователя</label>
                    <input
                        id='first_name'
                        className='input first_name'
                        type='text'
                        value={formData?.first_name}
                        onChange={onChangeHandle}>
                    </input>
                    <label htmlFor='last_name'>Фамилия пользователя</label>
                    <input
                        id='last_name'
                        className='input last_name'
                        type='text'
                        value={formData?.last_name}
                        onChange={onChangeHandle}>
                    </input>
                    <div className={`password-container ${passwordChange ? 'active' : ''}`}> 
                        <label htmlFor='password'>Введите новый пароль</label>
                        <input
                            id='password'
                            className='input password-input'
                            type='password'
                            >
                        </input>
                    </div>
                    <button className='password-btn' type='button' onClick={togglePasswordChange}>
                        Изменить пароль
                    </button>
                    <button className='signup-btn' type='submit' disabled={isFormModified}>
                        Подтввердить изменения
                    </button>
                </fieldset>
               
            </form>
        </div>
    )
}