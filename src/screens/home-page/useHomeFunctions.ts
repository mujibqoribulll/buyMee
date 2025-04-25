import { useCallback, useEffect, useState } from "react";
import { InitialProductType } from "../../../components/product-list";
import { ImageFour, ImageOne, ImageThree, ImageTwo } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllCategory, getAllProduct } from "../../slices/homeThunk";
import { shallowEqual } from "react-redux";
import { PaginationStatus, setPaginationParams } from "../../helper";
import { useForm } from "../../helper/form";

interface ProductParams {
    q?: string;       // Optional query parameter
    limit?: number;   // Optional limit parameter
    skip?: number;
    select?: string[];
    sortBy?: string
    order?: string
}

export const useHomeFunctions = () => {
    const dispatch = useAppDispatch();
    const { product, category } = useAppSelector(state => state.home, shallowEqual);
    const { cart } = useAppSelector(state => state.cart, shallowEqual)
    const [modalSort, setModalSort] = useState(false);
    const [sort, setSort] = useState({
        price: '',
        order: ''
    })
    const [filterByCategory, setFilterByCategory] = useState('')

    const OBJECT_SORTBY = {
        price: [
            { label: 'Title', value: 'title' },
            { label: 'Price', value: 'price' }, { label: 'Rating 4 or Higher', value: 'rating' },
        ],
        sort: [
            { label: 'Low to High', value: 'asc' },
            { label: 'High to Low', value: 'desc' },
        ],
    }
    let IsDisableFilter = !sort?.order && !sort?.price
    const dummyBanners = [
        {
            name: 'banner-1',
            image: ImageOne,
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dicta deleniti velit vel architecto voluptates officia molestiae numquam id neque.',
        },
        {
            name: 'banner-2',
            image: ImageTwo,
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dicta deleniti velit vel architecto voluptates officia molestiae numquam id neque.',
        },
        {
            name: 'banner-3',
            image: ImageThree,
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dicta deleniti velit vel architecto voluptates officia molestiae numquam id neque.',
        },
        {
            name: 'banner-4',
            image: ImageFour,
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dicta deleniti velit vel architecto voluptates officia molestiae numquam id neque.',
        },
    ];

    const [refreshing, setRefreshing] = useState(false); // Pull-to-refresh status

    const [form, setForm] = useForm({
        search: {
            label: 'Search',
            value: '',
            error: false,
            required: true,
            message: '',
        },
    });

    const onRefresh = () => {
        setRefreshing(true);
        handleGetAllProduct('reset')
        dispatch(getAllCategory())
    }

    const handleGetAllCategory = () => {
        dispatch(getAllCategory())
    }

    const onSortFilter = (type: string, value: string) => {
        setSort((prevState) => ({ ...prevState, [type]: value }))
    }

    const onClickProduct = (item: InitialProductType) => {

    }
    const handleEndReach = () => {
        handleGetAllProduct('next')
    }

    const handleFilterByCategory = (type: string, value: string) => {
        setFilterByCategory((prev) => (prev === value ? '' : value));
    }

    useEffect(() => {
        handleGetAllProduct('reset')

    }, [form.search.value, filterByCategory])

    useEffect(() => {
        if (refreshing) {
            setRefreshing(false)
        }

    }, [refreshing])

    const handleGetAllProduct =
        (paginate: any) => {
            const { search } = form
            let params: ProductParams = {};
            if (search.value) {
                params.q = search.value ?? ''
            }
            params.limit = 20;
            params.sortBy = sort?.price
            params.order = sort?.order;
            params.select = ['title', 'price', 'rating', 'id', 'images'];
            dispatch(getAllProduct({ params, paginate, filterByCategory }));
        }


    const onSubmitFilter = () => {

        if (sort?.order || sort?.price) {
            handleGetAllProduct('reset')
            setModalSort(false)
        }

    }




    return {
        dummyBanners, refreshing, product, form, modalSort, IsDisableFilter, OBJECT_SORTBY, sort, category, filterByCategory, cart, function: {
            onClickProduct,
            handleGetAllProduct,
            setRefreshing,
            onRefresh,
            handleEndReach,
            setForm,
            setModalSort,
            onSortFilter,
            onSubmitFilter,
            handleGetAllCategory,
            handleFilterByCategory,
        }
    }
}