export interface Product {
    descriptions:string;
    price:number;
}

// const phone: Product = {
//     descriptions: 'Nokia A1',
//     price: 150.0
// }

// const tablet: Product = {
//     descriptions: 'Apple Air',
//     price: 250.0
// }

export interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

export function taxCalculation(options: TaxCalculationOptions): [total:number, taxTotal:number] {
    const {tax, products} = options
    let total = 0;
    products.forEach(({price}) => {
        total += price;
    });

    return [total, total * tax ]
}

// const shoppingCart = [phone, tablet];
// const tax = 0.15;

// const [total, taxTotal] = taxCalculation({
//     products: shoppingCart,
//     tax: tax
// })

// console.log('Total', total);
// console.log('Tax', taxTotal);