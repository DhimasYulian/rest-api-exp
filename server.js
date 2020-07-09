const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const {
    MONGO_URI
} = require('./config')



// Routes
const postsRoutes = require('./routes/api/posts')

const app = express();

// CORS
app.use(cors())

// BodyParser
app.use(express.json());

//Connect To DB
mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))

// User Routes
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server running in port ${PORT}`))