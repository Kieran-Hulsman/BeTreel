const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true,
        trim: true
    },
    caption: {
        type: String
    },
    image: {
        type: Buffer
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

// const post1 = new Post({
//     name: 'Steve',
//     task: 'Pick up garbage',
//     caption: 'Yessir'
// })

// post1.save().then(() => {
//     console.log(post1)
// }).catch((error) => {
//     console.log('Error: ', error)
// })