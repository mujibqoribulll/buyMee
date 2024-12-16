import Login from "../screens/auth";
import Cart from "../screens/cart";
import DetailProduct from "../screens/detail-product";
import HomePage from "../screens/home-page";
import { NetLogScreen } from "../screens/netlog-screen";
import TabHome from "../screens/tab-home";



export const routes = [
    {
        key: 'login',
        name: 'login',
        component: Login,
    },
    {
        key: 'tab-home',
        name: 'tab-home',
        component: TabHome,
        options: { animation: 'fade' },
    },
    {
        key: 'detail-product',
        name: 'detail-product',
        component: DetailProduct,
    },
    {
        key: 'cart',
        name: 'cart',
        component: Cart,
    },
    {
        key: 'netlog-screen',
        name: 'netlog-screen',
        component: NetLogScreen,
    },

]