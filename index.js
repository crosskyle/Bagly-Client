const express = require('express')
const app = express()


// Express will serve up production assets
app.use(express.static('build'))

// Express will serve up the index.html file if it doesn't
// recognize the route
const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


const PORT = process.env.PORT || 5000
app.listen(PORT)
