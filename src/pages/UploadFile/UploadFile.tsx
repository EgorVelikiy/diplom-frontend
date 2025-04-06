import './UploadFile.css'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../../api/files_api'
import { FormEvent, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store/configureStore'
import { useNavigate } from 'react-router-dom'

export default function UploadFile() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const user = useSelector((state: RootState) => state.reducers.users.currUser)

    const owner = useSelector((state: RootState) => state.reducers.users.myStorage)
    const [file, setFile] = useState(null)

    let isFormModified = true

    if (file) {
        isFormModified = false
    }
    
    const onChangeFileHandle = (e: any) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (file) {
            const form = e.target as HTMLFormElement;
            const comment = form.elements.namedItem('textarea') as HTMLTextAreaElement;
            const data = {
                user: owner?.id,
                file: file,
                comment: comment.value
            }

            dispatch(uploadFile(data))
                .unwrap()
                .then(() => {
                    setFile(null)
                })
        }
        const form = e.target as HTMLFormElement;
        form.reset()
    }

    return (
        <div className='upload_container'>
            <h4>Пользователь <span>{user?.username}</span></h4>
            <form className='file_upload_form' onSubmit={onSubmitHandle}>
                <input
                    id='file'
                    type='file'
                    onChange={onChangeFileHandle}>
                </input>
                Введите комментарий
                <textarea 
                    id='textarea'
                    name='textarea'
                    className='file_comment'>

                </textarea>
                <button 
                    className='upload-btn'
                    type='submit'
                    disabled={isFormModified}>
                        Загрузить
                </button>
                <button
                    className='cancel-btn'
                    type='button'
                    onClick={() => navigate(-1)}>
                        Назад
                </button>
            </form>
        </div>
    )
}