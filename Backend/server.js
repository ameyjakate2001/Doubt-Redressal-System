import express from 'express'

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('app initiallize'))

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
