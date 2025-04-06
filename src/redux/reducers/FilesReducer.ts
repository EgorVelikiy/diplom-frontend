import { createSlice } from "@reduxjs/toolkit";
import { FileInterface } from '../../types/index'
import { deleteFile, downloadFile, getFile, getFiles, updateFile, uploadFile } from "../../api/files_api";

interface initialState {
    currFile: FileInterface | null,
    files: FileInterface[],
    isLoading: boolean,
    error: string | null
}

export const initialState: initialState = {
    currFile: null,
    files: [],
    isLoading: false,
    error: null
};

const FileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        removeFiles: (state) => {
            state.files = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFiles.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFiles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.files = action.payload;
            state.files.forEach((file) => {
                file.user_id = file.id.toString()
            })
        })
        .addCase(getFiles.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string;
        })

        .addCase(getFile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.currFile = action.payload
            
        })
        .addCase(getFile.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string;
        })

        .addCase(uploadFile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(uploadFile.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        })
        .addCase(uploadFile.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string;
        })

        .addCase(downloadFile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(downloadFile.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        })
        .addCase(downloadFile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        .addCase(updateFile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateFile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        .addCase(deleteFile.pending, (state) => {
            state.error = null;
        })
        .addCase(deleteFile.rejected, (state, action) => {
            state.error = action.payload as string;
        })

    }
})

export const { removeFiles } = FileSlice.actions;
export default FileSlice.reducer