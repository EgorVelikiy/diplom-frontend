import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import './FileStorage.css'
import { AppDispatch, RootState } from '../../redux/store/configureStore'
import { deleteFile, downloadFile, getFile, getFiles } from '../../api/files_api';
import { useEffect } from 'react';
import { FileInterface } from '../../types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function FilesStorage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const { files, error } = useSelector((state: RootState) => state.reducers.files)
    const owner = useSelector((state: RootState) => state.reducers.users.myStorage)
    
    useEffect(() => {
        dispatch(getFiles(owner?.username))
            .unwrap()
            .then(() => {
                toast.success('Список файлов получен')
            });
        
    }, [dispatch, owner?.username])

    const getFileHandler = (id: number) => {
        dispatch(getFile(id))
            .unwrap()
            .then(() => {
                toast.success('Файл получен')
                navigate('/update/file')
            })
    }

    const downloadHandler = (id: number, file_name: string) => {
        const data = {id, file_name}
        dispatch(downloadFile(data))
            .unwrap()
            .then(() => {
                toast.success('Файл успешно скачан')
            })
    }

    const deleteUserHandle = (id: number) => {
        dispatch(deleteFile(id))
            .unwrap()
            .then(() => {
                dispatch(getFiles(owner?.username))
                    .unwrap()
                    .then(() => {
                        toast.success('Список файлов получен')
                    })
            })
    }

    const countFileSize = (size: string) => {
        let result = Number(size)
        for(let i=0; i < 2; i++) {
            result = result / 1024
        }

        return result.toFixed(2)
    }

    const columns = [
        { title: 'Файл', ind: 'file_name' },
        {
            title: 'Комментарий',
            ind: 'comment',
        },
        { 
            title: 'Размер КБ', 
            ind: 'size',
            render: (size: string) => countFileSize(size)
        },
        { 
            title: 'Дата загрузки', 
            ind: 'uploaded_at',
            render: (date: string) => moment(date).format('DD.MM.YYYY')
        },
        {
            title: 'Дата скачивания',
            ind: 'downloaded_at',
            render: (date: string) => {return date ? moment(date).format('DD.MM.YYYY') : ''}
        },
        { 
            title: 'Действия', 
            ind: 'actions',
            render: (_: any, file: FileInterface) => (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                    <button 
                        className='file open_file'
                            onClick={() => getFileHandler(file.id)}
                        >
                            Открыть
                    </button>

                    <button 
                        className='file download_file'
                            onClick={() => downloadHandler(file.id, file.file_name)}
                        >
                            Скачать
                    </button>
        
                    <button 
                        className='file delete_file'
                            onClick={() => deleteUserHandle(file.id)}
                        >
                            Удалить
                    </button>
                </div>
            ),
         },
    ]

    return (
        <div className="table-container">
            <h4>Список файлов пользователя<span> {owner?.username}</span></h4>
            {!error && (
                <table className='storage' style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                            <th key={col.title} style={{ padding: '10px', border: '1px solid black', backgroundColor: 'white' }}>
                                {col.title}
                            </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id}>
                                {columns.map((col) => (
                                    <td key={col.ind} style={{ padding: '10px', border: '1px solid black', backgroundColor: 'white' }}>
                                        {col.render ? col.render(file[col.ind], file) : file[col.ind]}
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