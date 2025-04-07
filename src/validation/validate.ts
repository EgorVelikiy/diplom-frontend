export const validateUsername = (username: string ) => {
    const regex = /^[A-Za-z][A-Za-z0-9]{3,19}$/;
    if (username) {
        if (!regex.test(username)) {
        return "Логин должен состоять из латинских букв и цифр, начинаться с буквы и иметь длину от 4 до 20 символов.";
        }
    }
    return null;
};

export const validatePassword = (password: string) => {
    if (!password) return null
    if (password.length < 6) {
        return "Пароль должен содержать минимум 6 символов.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Пароль должен содержать хотя бы одну заглавную букву.";
    }
    if (!/[0-9]/.test(password)) {
        return "Пароль должен содержать хотя бы одну цифру.";
    }
    if (!/[\W_]/.test(password)) {
        return "Пароль должен содержать хотя бы один специальный символ.";
    }
    return null;
};