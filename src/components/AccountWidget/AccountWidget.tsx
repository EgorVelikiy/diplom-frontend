import { Link, useNavigate } from 'react-router-dom'
import './AccountWidget.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/configureStore';
import { logOut } from '../../api/users_api';
import { toast } from 'react-toastify';

export default function AccountWidget() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const logOutHandler = async() => {
        dispatch(logOut()).unwrap()
            .then(() => {
                toast.success('Вы успешно вышли')
                navigate("/");
            })
            .catch((error) => {
            console.log(error)
            })
    }

    return (
        <div className='account-widget'>
            <Link to='/'>
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={logOutHandler}>
                    <path
                        d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
                    />
                    <path
                        d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
                    />
                </svg>
            </Link>
            <Link to='/account'>
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
                    />
                    <path
                        d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z"
                    />
                    <path d="M22 11H16V13H22V11Z" />
                    <path d="M16 15H22V17H16V15Z" />
                    <path d="M22 7H16V9H22V7Z" />
                </svg>
            </Link>
        </div>
    )
}