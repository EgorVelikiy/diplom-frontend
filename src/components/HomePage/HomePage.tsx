import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import './HomePage.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import AccountWidget from '../AccountWidget/AccountWidget';
import UserActions from '../AdminUserPage/UserActions';
import Loading from '../Loading/Loading';

export default function HomePage() {
    const navigate = useNavigate();
    const currUrl = useLocation();

    const fileLoading = useSelector((state: RootState) => state.reducers.files.isLoading)
    const userLoading = useSelector((state: RootState) => state.reducers.users.isLoading)
    return (
        <div className='head-foot-container'>
            <header>
                <nav className='header-container'>
                    {["/", "/login", "/signup"].includes(currUrl.pathname) && (
                        <div className='home' onClick={() => navigate('/')}>
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 22.8787C4.34315 22.8787 3 21.5355 3 19.8787V9.87866C3 9.84477 3.00169 9.81126 3.00498 9.77823H3C3 9.20227 3.2288 8.64989 3.63607 8.24262L9.87868 2.00002C11.0502 0.828445 12.9497 0.828445 14.1213 2.00002L20.3639 8.24264C20.7712 8.6499 21 9.20227 21 9.77823H20.995C20.9983 9.81126 21 9.84477 21 9.87866V19.8787C21 21.5355 19.6569 22.8787 18 22.8787H6ZM12.7071 3.41423L19 9.70713V19.8787C19 20.4309 18.5523 20.8787 18 20.8787H15V15.8787C15 14.2218 13.6569 12.8787 12 12.8787C10.3431 12.8787 9 14.2218 9 15.8787V20.8787H6C5.44772 20.8787 5 20.4309 5 19.8787V9.7072L11.2929 3.41423C11.6834 3.02371 12.3166 3.02371 12.7071 3.41423Z"
                                />
                            </svg>
                            <span> HOME </span>
                        </div>
                    )}
                    {["/staff", "/files", "/account", "/upload", "/update/file"].includes(currUrl.pathname) && (
                        <UserActions />
                    )}
                    {userLoading || fileLoading && (
                        <Loading />
                    )}
                    <div className='log-widget'>
                        {["/", "/signup"].includes(currUrl.pathname) && (
                            <Link to="/login">
                                <button className='log login'>Sign-in</button>
                            </Link>
                        )}
                        {["/", "/login"].includes(currUrl.pathname) && (
                            <Link to='/signup'>
                                <button className='log logUp'>Sign-up</button>
                            </Link>
                        )}
                        {["/staff", "/files", "/account", "/upload", "/update/file"].includes(currUrl.pathname) && (
                            <AccountWidget />
                        )}
                    </div> 
                </nav>
                
            </header>
                <Outlet />
            <footer>
                <div className='footer-container'>
                    2025
                </div>
            </footer>
        </div>
        
    )
}