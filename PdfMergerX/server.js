const express = require('express')
const path = require('path')
const app = express()
app.use('/static', express.static('public'))

const multer = require('multer')
const {mergePdfs} = require('./merge')
const upload = multer({ dest: 'uploads/' })
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files)
    await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
})

app.listen(port, () => {
    console.log(`PdfMergerX app listening at http://localhost:${port}`)
})