import bcrypt from 'bcryptjs'
const data = {
  users:[
    {
      name:'Mahmoud',
      email:'Admin@test.com',
      password:bcrypt.hashSync('1234',8),
      isAdmin:true,
    },
    {
      name:'Reza',
      email:'Reza@test.com',
      password:bcrypt.hashSync('1234',8),
      isAdmin:false,
    }

  ],
    products: [
      {
        _id: '1',
        name: 'Nike Slim Shirt',
        category: 'Shirts',
        image: '/images/d1.jpg',
        price: 120,
        countInStock:10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        _id: '2',
        name: 'Adidas Fit Shirt',
        category: 'Shirts',
        image: '/images/d1.jpg',
        price: 100,
        countInStock:10,
        brand: 'Adidas',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
      },
      {
        _id: '3',
        name: 'Lacoste Free Shirt',
        category: 'Shirts',
        image: '/images/d1.jpg',
        price: 220,
        countInStock:10,
        brand: 'Lacoste',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
      },
      {
        _id: '4',
        name: 'Nike Slim Pant',
        category: 'Pants',
        image: '/images/d1.jpg',
        price: 78,
        countInStock:10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality product',
      }
    ],
  };
  export default data;