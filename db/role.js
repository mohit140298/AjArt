const role = require('../api/Models/role')

role.insertMany([{
    index_id: 1,
    name: "super admin"
}, {
    index_id: 2,
    name: "admin"
}, {
    index_id: 3,
    name: "customer"
}]).then(() => {
    console.log("documents inserted successfully")
}).catch((err) => {
    console.log(err)
})