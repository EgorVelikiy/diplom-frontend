import { createSlice } from "@reduxjs/toolkit";
import { UserInterface, AdminInterface } from '../../types/index'
import { getUserList, logIn, logOut, signUp, updateUser } from "../../api/users_api";

interface userInitialState {
    currUser: UserInterface | null,
    myStorage: UserInterface | null,
    usersList: AdminInterface[],
    isLoading: boolean,
    error: string | null,
}

const initialState: userInitialState = {
    currUser: null,
    myStorage: null,
    usersList: [],
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setStorage: (state, action) => {
            state.myStorage = action.payload
        },
        removeStorage: (state) => {
            state.myStorage = null;
        },
        removeError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currUser = action.payload.user
                state.myStorage = action.payload.user
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currUser = action.payload.data.user
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoading = false;
                state.currUser = null;
                state.usersList = [];
                state.myStorage = null;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currUser = null;
                state.currUser = action.payload
                state.myStorage = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            .addCase(getUserList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.isLoading = false;

                state.usersList = action.payload;
                state.usersList.forEach((user) => user.user_id = user.id.toString())
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export const { setStorage, removeStorage, removeError } = userSlice.actions;
export default userSlice.reducer