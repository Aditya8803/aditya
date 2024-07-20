const connectToMongo = require("./db")
var cors = require('cors')
const express = require('express')
connectToMongo();

const app = express();
const port = 5000 //port number can be of your wish no link with mongo connection string 
app.use(express.json())
app.use(cors())
//Available Routes
//we call it as api end points
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})