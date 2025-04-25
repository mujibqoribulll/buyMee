import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useMemo, useState } from "react";
import { removeFromCartSuccess, removeFromCartStart, removeFromCartRejected, removeFromCartReset, increaseCart, decreaseCart, toggleCartItemSelection } from '../../slices/cartSlice';
import Toast from "react-native-toast-message";


export const useCartFunctions = () => {
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

    const handleIncrease = (data: any) => {
        dispatch(increaseCart(data))
    }

    const handleDecrease = (data: any) => {
        if (data?.qty > 1) {
            dispatch(decreaseCart(data))
        } else {
            setIsDeletedProduct(true)
            setDeletedProduct(data)
        }
    }

    useEffect(() => {
        return () => {
            dispatch(removeFromCartReset())
        }
    }, [])

    const handleCheckBox = (data: any) => {
        dispatch(toggleCartItemSelection(data))

    }

    const totalPrice = useMemo(() => {
        return cart?.reduce((sum: any, item: any) => {
            if (item?.checked) {
                return sum + item?.price * item?.qty
            }
            return sum;
        }, 0)
    }, [cart])

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


    return {
        cart,
        totalPrice,
        isDeletedProduct,
        function: {
            handleDelete,
            handleCloseDeleteModal,
            onPressDelete,
            handleIncrease,
            handleDecrease,
            handleCheckBox,
        }
    }
}