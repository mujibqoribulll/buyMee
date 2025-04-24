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

    const dummyCategory = [
        {
            id: 1,
            name: 'All',
        },
        {
            id: 2,
            name: 'Smartphones',
        },
        {
            id: 3,
            name: 'Headphones',
        },
        {
            id: 4,
            name: 'Laptops',
        },
        {
            id: 5,
            name: 'Tablets',
        },
        {
            id: 6,
            name: 'Cameras',
        },
        {
            id: 7,
            name: 'Smartwatches',
        },
        {
            id: 8,
            name: 'TVs',
        },
        {
            id: 9,
            name: 'Gaming Consoles',
        },
    ];

    const dummyProduct = [
        {
            id: 1,
            name: 'AirPods',
            price: 132.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1574199271085-d6b2a5fda6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 2,
            name: 'MacBook Air 13',
            price: 1100.0,
            rating: 5.0,
            image:
                'https://images.unsplash.com/photo-1587202372775-4befd570487c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 3,
            name: 'Gaming PC',
            price: 850.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1608301798730-3c24963006b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 4,
            name: 'iPhone 13',
            price: 999.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1633524594493-ec7beccc25de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 5,
            name: 'Samsung Galaxy S21',
            price: 799.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1612444530673-0dc781627c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 6,
            name: 'Dell XPS 15',
            price: 1200.0,
            rating: 4.7,
            image:
                'https://images.unsplash.com/photo-1593642632559-0c02158c979a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 7,
            name: 'Sony WH-1000XM4',
            price: 349.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1601944170975-5ec2f5a0d826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 8,
            name: 'iPad Pro 12.9',
            price: 1099.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1557683304-673a23048d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 9,
            name: 'Apple Watch Series 8',
            price: 399.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1573164574572-cb89e39749d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 10,
            name: 'Google Pixel 7',
            price: 599.0,
            rating: 4.7,
            image:
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 11,
            name: 'Bose QC45',
            price: 329.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1627551083360-4f8a75145c03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 12,
            name: 'Asus ROG Zephyrus',
            price: 1450.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1599744060037-a0e4f0634b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 13,
            name: 'Samsung Galaxy Tab S8',
            price: 699.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1629216994212-1c6265675424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 14,
            name: 'Microsoft Surface Laptop 4',
            price: 999.0,
            rating: 4.7,
            image:
                'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 15,
            name: 'NVIDIA RTX 4090',
            price: 1599.0,
            rating: 5.0,
            image:
                'https://images.unsplash.com/photo-1587203574470-8b60cb4fcd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 16,
            name: 'PlayStation 5',
            price: 499.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1606813901261-0d52b39e0d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 17,
            name: 'Xbox Series X',
            price: 499.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1603096700421-cda8c8b3c7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 18,
            name: 'DJI Mavic Air 2',
            price: 799.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1605433672907-7ed6e6f1134d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 19,
            name: 'Logitech MX Master 3',
            price: 99.0,
            rating: 4.9,
            image:
                'https://images.unsplash.com/photo-1519332978332-21b7f6e2d5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
        },
        {
            id: 20,
            name: 'Kindle Paperwhite',
            price: 139.0,
            rating: 4.8,
            image:
                'https://images.unsplash.com/photo-1504439468489-c8920d796a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
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
        dummyBanners, dummyCategory, dummyProduct, refreshing, product, form, modalSort, IsDisableFilter, OBJECT_SORTBY, sort, category, filterByCategory, function: {
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