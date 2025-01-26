import { Product, taxCalculation } from "./06-function-destructuring";

const shoppingCart: Product[] = [
    {
        descriptions: 'Nokia',
        price: 100
    },
    {
        descriptions: 'Ipad',
        price: 150
    }
];

const [total, tax] = taxCalculation({
    products: shoppingCart,
    tax: 0.12
});

console.log('Total', total);
console.log('Tax', tax);