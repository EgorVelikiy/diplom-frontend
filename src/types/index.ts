export interface logInInterface {
    username: string,
    password: string
}

export interface signUpInterface {
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string
}

export interface UserInterface {
    id: number,
    username?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    is_staff?: boolean
}

export interface FilesForAdminInterface {
    file_name: string, 
    size: number,
    user: string
}

export interface AdminInterface {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    is_staff: boolean,
    email: string,
    user_id: string,
    files: FilesForAdminInterface[]
}

export interface updateUserInterface {
    id: number | undefined,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    isAdmin?: boolean;
}

export interface FileInterface {
    id: number,
    user_id?: string,
    file_name: string, 
    comment?: string,
    size?: number,
    uploaded_at?: string, 
    downloaded_at?: string,
}

export interface downloadFileInterface {
    id: number,
    file_name: string,
}

export interface updateFileInteface { 
    id: number,
    file_name?: string,
    comment?: string | null,
}

export interface uploadFileInterface {
    user: number | undefined;
    file: never;
    comment: string;
}