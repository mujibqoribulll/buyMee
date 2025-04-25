import { shallowEqual } from "react-redux";
import { useGetProductDetail } from "../../hooks/detailProduct"
import { addToCartSuccess, addToCartRejected, addToCartStart, addToCartReset } from "../../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Toast from "react-native-toast-message";
import { useNavigateToScreen } from "../../helper/hooks";
import { useEffect } from "react";

interface AddCartType {
    description: string;
    price: number;
    title: string;
    id: number;
}

export const useDetailProductFunctions = () => {
    const { getProductDetail, getServiceProductDetail, reset } = useGetProductDetail();
    const { addToCart } = useAppSelector(state => state.cart, shallowEqual)
    console.log('addToCart', addToCart.message)
    const { navigateToScreen } = useNavigateToScreen()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (addToCart.message) {
            Toast.show({
                type: 'successWithAction',
                text1: addToCart.message,
                text2: 'You can review your cart now.',
                onPress: () => {
                    navigateToScreen('cart');
                },
            });
        }
    }, [addToCart.message])

    useEffect(() => {
        return () => {
            dispatch(addToCartReset())
        }
    }, [])


    const handleAddCart = (data: AddCartType) => {
        dispatch(addToCartStart())
        setTimeout(() => {
            try {
                dispatch(addToCartSuccess(data))

            } catch (error) {
                dispatch(addToCartRejected())
            }
        }, 2000)

    }



    return { getProductDetail, addToCart, functions: { getServiceProductDetail, handleAddCart } }
}