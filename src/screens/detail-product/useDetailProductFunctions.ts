import { useGetProductDetail } from "../../hooks/detailProduct"

export const useDetailProductFunctions = () => {
    const { getProductDetail, getServiceProductDetail, reset } = useGetProductDetail();



    return { getProductDetail, functions: { getServiceProductDetail } }
}