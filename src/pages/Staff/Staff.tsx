import './Staff.css'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/configureStore"
import { useNavigate } from "react-router-dom"
import { removeError, setStorage } from "../../redux/reducers/userReducer" 
import { AdminInterface, FilesForAdminInterface, UserInterface } from "../../types";
import { deleteUser, getUserList, updateUser } from '../../api/users_api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Staff() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { usersList, error } = useSelector((state: RootState) => state.reducers.users);

    const currUser = useSelector((state: RootState) => state.reducers.users.currUser)

    useEffect(() => {
        dispatch(getUserList());
        dispatch(setStorage(currUser))
    }, [dispatch])

    const getUserHandle = (user: UserInterface) => {
        dispatch(setStorage(user));
        navigate('/files');
    }

    const changeStaffHandle = (id: number, is_staff: boolean) => {
        const data = {
            id: id,
            is_staff: !is_staff
        }

        dispatch(updateUser(data))
            .unwrap()
            .then(() => {
                console.log('Статус изменен')
                dispatch(getUserList())
            })
    }

    const countFilesSizes = (files: FilesForAdminInterface[]) => {
        if (files.length === 0) {
            return 0
        }
        let result = files.reduce((res, file) => res + file.size, 0)
        for(let i=0; i < 2; i++) {
            result = result / 1024
        }

        return result.toFixed(3)
    }

    const deleteUserHandle = (id: number | undefined) => {
        if (confirm('Удалить пользоваеля ?')) {
            dispatch(deleteUser(id))
                .unwrap()
                .then(() => {
                    console.log('пользователь удалён')
                    dispatch(getUserList())
                })
                .catch((error) => {
                    toast.error(error)
                })
        }
    }

    const columns = [
        { title: 'Логин', ind: 'username' },
        { title: 'Имя', ind: 'first_name' },
        { title: 'Фамилия', ind: 'last_name' },
        { title: 'Email', ind: 'email' },
        {
            title: 'Количество файлов',
            ind: 'files',
            render: (files: FilesForAdminInterface[]) => files.length,
        },
        {
            title: 'Размер хранилища КБ',
            ind: 'files',
            key: 'files_size',
            render: (files: FilesForAdminInterface[]) => countFilesSizes(files),
        },
        {
            title: 'Роль администратора',
            ind: 'is_staff',
            render: (is_staff: boolean, user: AdminInterface) => (
                <input
                type="checkbox"
                checked={is_staff}
                onChange={() => changeStaffHandle(user.id, is_staff)}
                />
            ),
        },
        {
            title: 'Действия',
            ind: 'actions',
            render: (_: any, user: UserInterface) => (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <button 
                        className='user open_user'
                        onClick={() => getUserHandle(user)}>
                        Открыть
                    </button>
        
                    <button 
                        className='user delete_user'
                        onClick={() => deleteUserHandle(user.id)}>
                        Удалить
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="table-container">
            <h3>Список пользователей</h3>
            {error && (
                <div>
                {error}
                <button onClick={() => dispatch(removeError())}>Закрыть</button>
                </div>
            )}
            {!error && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                            <th key={col.title ? col.title : col.key} style={{ padding: '10px', border: '1px solid black', backgroundColor: 'white' }}>
                                {col.title}
                            </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user) => (
                            <tr key={user.id}>
                                {columns.map((col) => (
                                    <td key={col.title ? col.title : col.key} style={{ padding: '10px', border: '1px solid black', backgroundColor: 'white' }}>
                                        {col.render ? col.render(user[col.ind], user) : user[col.ind]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
