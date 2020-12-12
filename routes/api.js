const express = require('express')
const router = express.Router()
const axios = require('axios')
const search = require('youtube-search')

const opts = {
  maxResults: 1,
  key: process.env.KEY
}

router.get('/search', (req, res) => {
  const q = req.query.q
  search(q, opts, (err, list) => {
    if (err || !list[0]) {
      res.status(201).send({ error: true, message: 'Error Occured! Try again.' })
      throw err
    } else {
      console.log(list[0])
      res.status(200).json({ error: false, video: list[0] })
    }
  })
})

// router.get('/download', async (req, res) => {
//   try {
//   	const michaelapi = "http://michaelbelgium.me/ytconverter/convert.php?youtubelink=https://www.youtube.com/watch?v="
//     const {data:response} = await axios.get(michaelapi+req.query.id)
//     console.log(response)
//     if (response.error)
//     	throw new Error("Error occured")
//     res.redirect(response.file)
//   } catch (e) {
//   	console.log(e)
//     res.status(500).send({ error: true, message: 'Server side srror Occured!' })
//   }
// })

module.exports = router
