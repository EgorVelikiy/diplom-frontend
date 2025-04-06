import { createAsyncThunk } from '@reduxjs/toolkit';
import { logInInterface, signUpInterface, updateUserInterface } from '../types/index.ts'
import { api } from "../utils/axios";
import { toast } from 'react-toastify'

export const logIn = createAsyncThunk(
    '/user/login',
    async (data: logInInterface) => {
        try {
            const response = await api.post('/root/users/login/', data)
            toast.success('Вы успешно вошли')
            localStorage.setItem('token', response.data.token)
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось войти')
            throw err
        }
    }
)

export const logOut = createAsyncThunk(
    '/user/logout',
    async () => {
        try {
            const response = await api.post('/root/users/logout/', null, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            localStorage.removeItem('token')
            return response
        } catch (err) {
            console.log(err)
            toast.error('Не удалось выйти')
            throw err
        }
    }
)

export const updateUser = createAsyncThunk(
    '/user/update',
    async (data: updateUserInterface) => {
        try {
            if (data.password == '') {
                delete data.password
            }
            const response = await api.patch(`/root/user/${data.id}/`, data, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            toast.success('Данные успешно обновлены')
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось изменить данные')
            throw err
        }
    }
)


export const signUp = createAsyncThunk(
    '/user/signup',
    async (data: signUpInterface) => {
        try {
            const response = await api.post('/root/user/', data)
            return await response
        } catch (err) {
            console.log(err)
            toast.error('Не удалось зарегистрироваться')
            throw err
        }
    } 
)

export const getUserList = createAsyncThunk(
    '/user/usersList',
    async () => {
        try {
            const response = await api.get('/root/user/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            toast.success('Список пользователей получен')
            return await response.data
        } catch (err) {
            console.log(err)
            toast.error('Не удалось получить список пользователей')
            throw err
        }
    } 
)

export const deleteUser = createAsyncThunk(
    '/user/deleteUser',
    async (id: number | undefined) => {
        try {
            const response = await api.delete(`/root/user/${id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            toast.success('Пользователь удалён')
            return await response
        } catch (err) {
            console.log(err)
            toast.error('Не удалось удалить пользователя')
            throw err
        }
    } 
)