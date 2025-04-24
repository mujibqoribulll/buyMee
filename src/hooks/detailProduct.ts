import { HOME } from "../service"
import { useGetService } from "./service"

export const useGetProductDetail = () => {
    const { state, service, reset } = useGetService(HOME.getProductDetail as any)

    return { getProductDetail: state, getServiceProductDetail: (id: number) => service(id), reset }
}