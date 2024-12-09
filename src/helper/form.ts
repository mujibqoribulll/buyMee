import { useState } from "react";
import { validateMinMaxChar, validatePassword, Validation } from "./validation";

export interface InitialFormType {
    [key: string]: {
        name?: string;
        label?: string;
        placeholder?: string;
        value?: any;
        required?: boolean;
        error?: boolean;
        message?: string;
        type?: 'default' | 'password' | string;
        [key: string]: any;
    };
}

export const useForm = (_initialForm: InitialFormType) => {
    const [form, setForm] = useState<any>(_initialForm);
    const validateFormValue = (key: string, text: any, formNew?: any) => {
        const { required, label } = form[key];
        let value = text;
        let error = false;
        let message = '';
        let validate: Validation;

        if (required) {
            if (text) {
                switch (key) {
                    case 'username':
                        validate = validateMinMaxChar(label, value, 3, 10);
                        error = validate.error;
                        message = validate.message;
                        break;
                    case 'password':
                        validate = validatePassword(value, label);
                        error = validate.error;
                        message = validate.message;
                        break;
                    default:
                        break;
                }
            } else {
                error = true;
                message = `${label} tidak boleh kosong`;
            }
        }

        return { error, message, value };
    };

    const revalidateAllForm = () => {
        let formNew = { ...form };
        Object.keys(form).forEach(key => {
            let payload = {};
            let validate = validateFormValue(key, form[key].value);
            payload = {
                value: validate.value,
                message: validate.message,
                error: validate.error,
            };
            formNew = {
                ...formNew,
                [key]: {
                    ...formNew[key],
                    ...payload,
                },
            };
        });
        setForm(formNew);
    };

    const setFormValue = (key: any, value: any) => {
        if (key === '@reset') {
            /* ex: setForm('@reset') */
            return setForm(_initialForm);
        } else if (key === '@override') {
            /* ex: setForm('@override', {...form, ...formNew}) */
            return setForm(value);
        } else if (key === '@revalidate') {
            /* ex: setForm('@revalidate') */
            revalidateAllForm();
        } else if (value === '@reset') {
            /* ex: setForm('key', '@reset') */
            setForm({
                ...form,
                [key]: _initialForm[key],
            });
        } else if (value === '@required') {
            /* ex: setForm('key', '@required') */
            setForm({
                ...form,
                [key]: {
                    ...form[key],
                    required: true,
                },
            });
        } else {
            /* ex: setForm('email', value) */
            let payload = {};

            let validate = validateFormValue(key, value);
            payload = {
                value: validate.value,
                message: validate.message,
                error: validate.error,
            };

            let formNew = {
                ...form,
                [key]: {
                    ...form[key],
                    ...payload,
                },
            };
            setForm(formNew);
        }
    };

    return [
        form,
        setFormValue,
        // setRequired(key, value);
        (key: any, required: any, value: any) => {
            return setForm({
                ...form,
                [key]: {
                    ...form[key],
                    error: false,
                    message: '',
                    value: value ?? form[key].value,
                    required: Boolean(required),
                },
            });
        },
    ];
};

export const isSubmitDisabled = (form: any, type?: 'either') => {
    if (type === 'either') {
      let validate = Object.keys(form).map((key, index) => {
        if (
          typeof form[key]?.value === 'object' &&
          form[key]?.value !== undefined &&
          form[key]?.value !== null
        ) {
          if (
            !form[key]?.error &&
            (form[key]?.value?.length > 0 ||
              Object.keys(form[key]?.value)?.length > 0)
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          if (!form[key]?.error) {
            return false;
          } else {
            return true;
          }
        }
      });
      return !validate.includes(false);
    } else {
      let validate = Object.keys(form).map((key, index) => {
        if (
          typeof form[key]?.value === 'object' &&
          form[key]?.value !== undefined &&
          form[key]?.value !== null &&
          !['date', 'time'].includes(form[key]?.mode)
        ) {
          if (
            !form[key]?.error &&
            (form[key]?.value?.length > 0 ||
              Object.keys(form[key]?.value)?.length > 0)
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          if (!form[key]?.error) {
            if (form[key]?.required && !form[key]?.value) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      });
  
      return validate.includes(true);
    }
  };