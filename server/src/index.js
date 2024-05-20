const app = require('./app')
const { conn } = require('./db')
require('dotenv').config();

conn.sync({ force: false}).then(()=>{
    
    app.listen(3000,()=>{
            console.log("listen in port 3000")
        })

})