import { useState } from "react";
import { resetStatusHook, setErrorMessage } from "../helper";
import { InitialState } from "../slices/homeSlice";
import { ResetStatusHook } from "../store/types";

const initialState: InitialState = {
    loading: 'idle',
    message: '',
    data: {},
};


export const useGetService = (repository: (...args: any[]) => Promise<any>) => {
    const [state, setState] = useState<InitialState>(initialState);

    const reset = (key: ResetStatusHook) => {
        let stateNew = resetStatusHook(initialState, state, key);
        setState(stateNew);
    };

    const service = async (...args: any[]) => {
        try {
            setState(prev => ({ ...prev, loading: 'pending' }));
            const result = await repository(...args);
            if (result?.data) {
                setState(prev => ({
                    ...prev,
                    loading: 'succeeded',
                    data: result?.data,
                }));
                return Promise.resolve(result?.data);
            } else {
                const message = 'Data tidak ditemukan';
                setState(prev => ({ ...prev, loading: 'failed', message: message }));
                return Promise.reject(message);
            }
        } catch (error) {
            const message = setErrorMessage(error);
            setState(prev => ({ ...prev, loading: 'failed', message: message }));
            return Promise.reject(message);
        }
    };

    return { state, service, reset };
};