import './UpdateFile.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/configureStore'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileInterface } from '../../types'
import { updateFile } from '../../api/files_api'
import { toast } from 'react-toastify'

export default function UpdateFile() {
    const file = useSelector((state: RootState) => state.reducers.files.currFile) || {} as FileInterface;
    const [updatedFile, setFile] = useState<FileInterface>(file)
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    let isFormModified = JSON.stringify(file) == JSON.stringify(updatedFile)

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            id: file.id,
            file_name: updatedFile.file_name,
            comment: updatedFile.comment,
        }

        dispatch(updateFile(data))
            .unwrap()
            .then(() => {
                toast.success('Данные успешно обновлены')
                navigate('/files')
            })
    }

    const onChangeFileHandler = (e: any) => {
        const { id, value } = e.target
        setFile((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }

    return (
        <div className='file_update_container'>
            <form 
                className='file_update_form'
                onSubmit={onSubmitHandler}>
        
                <input 
                    id='file_name'
                    type="text"
                    value={updatedFile?.file_name}
                    onChange={onChangeFileHandler}>
                </input>

                <textarea 
                    name="textarea" 
                    id="comment"
                    value={updatedFile?.comment}
                    onChange={onChangeFileHandler}>

                </textarea>

                <button
                    className='change_file'
                    type='submit'
                    disabled={isFormModified}>
                        Подтввердить
                </button>
            </form>
        </div>
    )
}