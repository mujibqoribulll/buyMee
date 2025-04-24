
export interface Validation {
    message: string;
    error: boolean;
}
export const validateMinMaxChar = (
    label: any,
    text: any,
    min?: number,
    max?: number,
    type?: 'no-special-character',
): Validation => {
    let message = '';
    let error = false;

    if (min && text?.length < min) {
        error = true;
        message = `${label} terlalu pendek`;
    }
    if (max && text?.length >= max) {
        error = true;
        message = `${label} maksimal ${max} karakter`;
    }
    if (type === 'no-special-character') {
        let regexSpecialCharacter = /[^a-zA-Z0-9., ]/;
        if (regexSpecialCharacter.test(text)) {
            error = true;
            message = `${label} tidak boleh menggunakan spesial karakter`;
        }
    }

    return { message, error };
};

export const validatePassword = (password: any, label?: string): Validation => {
    let message = '';
    let error = false;
    let nonAlphanumeric = password.match(
        /([^a-zA-Z\d])+([a-zA-Z\d])+|([a-zA-Z\d])+([^a-zA-Z\d])+/,
    );
    let noWhitespace = password?.includes(' ');
    let minLength = 8;

    if (noWhitespace) {
        error = true;
        message = `${label || 'Password'} tidak boleh mengandung spasi`;
    } else if (password.length > 0 && password.length < minLength) {
        error = true;
        message = `${label || 'Password'} terlalu pendek`;
    }

    return { message, error };
};
