

export const useCartFunctions = () => {
    const cartProducts = [
        {
            id: 1,
            name: "Xbox Series X",
            description: "1 TB",
            price: 570.0,
            quantity: 1,
            image: "https://example.com/images/xbox-series-x.jpg", // Ganti dengan URL gambar nyata
        },
        {
            id: 2,
            name: "Wireless Controller",
            description: "Blue",
            price: 77.0,
            quantity: 1,
            image: "https://example.com/images/wireless-controller.jpg",
        },
        {
            id: 3,
            name: "Razer Kaira Pro",
            description: "Green",
            price: 153.0,
            quantity: 1,
            image: "https://example.com/images/razer-kaira-pro.jpg",
        },
        {
            id: 4,
            name: "PlayStation 5",
            description: "825 GB",
            price: 499.99,
            quantity: 1,
            image: "https://example.com/images/ps5.jpg",
        },
        {
            id: 5,
            name: "Nintendo Switch OLED",
            description: "White",
            price: 349.99,
            quantity: 1,
            image: "https://example.com/images/switch-oled.jpg",
        },
        {
            id: 6,
            name: "SteelSeries Arctis 7",
            description: "Wireless Headset",
            price: 169.99,
            quantity: 1,
            image: "https://example.com/images/arctis-7.jpg",
        },
        {
            id: 7,
            name: "Logitech G Pro X",
            description: "Mechanical Keyboard",
            price: 129.99,
            quantity: 1,
            image: "https://example.com/images/logitech-pro-x.jpg",
        },
        {
            id: 8,
            name: "Samsung Odyssey G7",
            description: "27-inch Monitor",
            price: 699.99,
            quantity: 1,
            image: "https://example.com/images/odyssey-g7.jpg",
        },
        {
            id: 9,
            name: "HyperX QuadCast",
            description: "Microphone",
            price: 139.99,
            quantity: 1,
            image: "https://example.com/images/hyperx-quadcast.jpg",
        },
        {
            id: 10,
            name: "Corsair K95 RGB Platinum",
            description: "Gaming Keyboard",
            price: 199.99,
            quantity: 1,
            image: "https://example.com/images/corsair-k95.jpg",
        },
    ];

    return {
        cartProducts,
        function: {

        }
    }
}