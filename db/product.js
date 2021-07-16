const product = require('../api/Models/product')

product.insertMany([{
    name: "cluster",
    price: 1000,
    image:"/home/mohit/mohit/AjArt/AjArt-Frontend/src/images/product1.png"
    
}, {
    name: "cluster",
    price: 2000,
    image: "/home/mohit/mohit/AjArt/AjArt-Frontend/src/images/product1.png"
}]).then(() => {
    console.log("documents inserted successfully")
}).catch((err) => {
    console.log(err)
})