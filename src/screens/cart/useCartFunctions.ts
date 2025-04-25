import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { removeFromCartSuccess, removeFromCartStart, removeFromCartRejected, removeFromCartReset } from '../../slices/cartSlice';
import Toast from "react-native-toast-message";


export const useCartFunctions = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [isDeletedProduct, setIsDeletedProduct] = useState(false)
    const [deletedProduct, setDeletedProduct] = useState({})

    const { cart, removeFromCart } = useAppSelector(state => state.cart, shallowEqual)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (removeFromCart?.message) {
            Toast.show({
                type: 'success',
                text1: removeFromCart?.message,
                text2: 'The product was deleted successfully.',
            });
        }
    }, [removeFromCart?.message])

    useEffect(() => {
        return () => {
            dispatch(removeFromCartReset())
        }
    }, [])

    const calculatePrice = () => {
        let result = cart?.reduce((sum: any, item: any) => sum + item?.price * item?.qty, 0)
        setTotalPrice(result)
    }

    const handleDelete = (data: any) => {

        if (data) {
            setDeletedProduct(data)
            setIsDeletedProduct(true)
        }

    }

    const onPressDelete = () => {
        if (deletedProduct) {
            dispatch(removeFromCartStart())
            setTimeout(() => {
                try {
                    dispatch(removeFromCartSuccess(deletedProduct))
                } catch (error) {
                    dispatch(removeFromCartRejected())
                }
            }, 2000)
            setIsDeletedProduct(false)
        }
    }

    const handleCloseDeleteModal = () => {
        setIsDeletedProduct(false)
        setDeletedProduct({})
    }

    useEffect(() => {
        calculatePrice()
    }, [cart])

    return {
        cart,
        totalPrice,
        isDeletedProduct,
        function: {
            handleDelete,
            handleCloseDeleteModal,
            onPressDelete,
        }
    }
}