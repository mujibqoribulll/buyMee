import { shallowEqual } from "react-redux";
import { useGetProductDetail } from "../../hooks/detailProduct"
import { addToCartSuccess, addToCartRejected, addToCartStart } from "../../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Toast from "react-native-toast-message";
import { useNavigateToScreen } from "../../helper/hooks";

interface AddCartType {
    description: string;
    price: number;
    title: string;
    id: number;
}

export const useDetailProductFunctions = () => {
    const { getProductDetail, getServiceProductDetail, reset } = useGetProductDetail();
    const { data, message } = useAppSelector(state => state.cart, shallowEqual)
    const { navigateToScreen } = useNavigateToScreen()
    console.log('data4', JSON.stringify(data, null, 2))
    const dispatch = useAppDispatch()

    const handleAddCart = (data: AddCartType) => {
        dispatch(addToCartStart())
        setTimeout(() => {
            try {
                dispatch(addToCartSuccess(data))
                Toast.show({
                    type: 'successWithAction',
                    text1: message,
                    text2: 'You can review your cart now.',
                    onPress: () => {
                        navigateToScreen('cart');
                    },
                });
            } catch (error) {
                dispatch(addToCartRejected())
            }
        }, 5000)

    }



    return { getProductDetail, functions: { getServiceProductDetail, handleAddCart } }
}