const url = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(typeof data);

        const products = {};

        data.forEach(product => {
            products[product.id] = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category,
                rating: {
                    rate: product.rating.rate,
                    count: product.rating.count
                }
            };
        });

        localStorage.setItem('allProducts', JSON.stringify(products));
        return products
        
        
    } catch (error) {
        console.error('Error message!', error);
    }
}   
