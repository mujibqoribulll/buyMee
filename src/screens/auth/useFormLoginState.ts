import { useState } from "react"
import { useForm } from "../../helper/form";


export const UseFormLoginState = () => {

    const [form, setForm] = useForm({
        username: {
            label: 'Username',
            value: '',
            error: false,
            required: true,
            message: '',
        },
        password: {
            label: 'Password',
            value: '',
            error: false,
            required: true,
            message: '',
            type: 'password',
        },
    });


    return {
        form, function: {
            setForm,
        }
    }

}