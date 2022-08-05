require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.static('public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/:date?', (req, res) => {
  let date = new Date()

  if (req.params.date) {
    date = null
    const param = req.params.date

    if (new Date(param).getTime() > 0) {
      date = new Date(param)
    }
    if (new Date(+param).getTime() > 0) {
      date = new Date(+param)
    }
  }

  if (date instanceof Date) {
    return res.json({ unix: date.getTime(), utc: date.toUTCString() })
  }
  return res.json({ error: 'Invalid Date' })
})

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
