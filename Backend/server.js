const express = require('express')
const userRouter = require('./routes/userRoutes')
const doubtsRouter = require('./routes/doubtsRouter')
const connectDB = require('./db/db')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000/',
    credentials: true,
  })
)
dotenv.config()
connectDB()

app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 7000

app.get('/', (req, res) => res.send('app initiallize'))
app.use('/api/users/', userRouter)
app.use('/api/doubts', doubtsRouter)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
