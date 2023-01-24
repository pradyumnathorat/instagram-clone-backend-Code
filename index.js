const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3004 || process.env.PORT;
const fileupload = require('express-fileupload');
const postModel = require('./post');
const path = require('path');
app.use(express.json());
app.use(cors());
app.use(fileupload());

const url = 'mongodb+srv://Pradyumna:Pradyumna@cluster0.qxvv1hh.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(url, (err) => {
    if (err) {
        console.log("Connection to mongodb failed")
    }
    else console.log("Connected to mongoDB successfully")
})

app.get('/', (req, res) => {
    res.send(`<h1>You are in</h1>`)
})

app.post("/post", (req, res) => {
    const { Author, Location, Description } = req.body;
    const { image } = req.files;
    image.mv("./uploads/" + image.name, async (err) => {
        if (err) {
            res.status(500).json({ message: err.message });
        }
        else {
            const post = new postModel({
                ...{ Author, Location, Description },
                image: image.name
            })
            try {
                const response = await post.save();
                res.status(200).json({ message: "success", response })
            } catch (err) {
                res.json({ message: 'Something went wrong', response: err })
            }
        }
    })
})


app.get('/all', async (req, res) => {
    try {
        const all = await postModel.find();
        res.status(200).json(all);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get("/images/:fileName" , async (req , res) => {
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})