import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../utils/axios"
import { toast } from "react-toastify"
import { downloadFileInterface, updateFileInteface, uploadFileInterface } from "../types"


export const getFiles = createAsyncThunk(
    '/files/list',
    async (name: string | undefined) => {
        try {
            const response = await api.get(`/root/files/list/${name}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось получить список файлов')
            throw err
        }
    } 
)

export const getFile = createAsyncThunk(
    '/files/file',
    async (id: number | undefined) => {
        try {
            const response = await api.get(`/root/files/file/${id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось получить доступ к файлу')
            throw err
        }
    } 
)

export const uploadFile = createAsyncThunk(
    '/files/upload',
    async (data: uploadFileInterface) => {
        try {
            const response = await api.post('/root/files/upload/', data, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Файл успешно загружен')
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось загрузить файл')
            throw err
        }
    } 
)

export const downloadFile = createAsyncThunk(
    '/files/download',
    async (data: downloadFileInterface) => {
        try {
            const response = await api.get(`/root/files/download/${data.id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                responseType: 'blob'
            })
            const blob = response.data;
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data.file_name)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.log(err)
            toast.error('Не удалось скачать файл')
            throw err
        }
    } 
)

export const updateFile = createAsyncThunk(
    '/files/update',
    async (data: updateFileInteface) => {
        try {
            const response = await api.patch(`/root/files/${data.id}/`, data, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            })
            console.log(response.data)
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось обновить файл')
            throw err
        }
    } 
)

export const deleteFile = createAsyncThunk(
    '/files/delete',
    async (id: number | undefined) => {
        try {
            const response = await api.delete(`/root/files/${id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            toast.success('Файл успешно удалён')
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось удалить файл')
            throw err
        }
    } 
)

