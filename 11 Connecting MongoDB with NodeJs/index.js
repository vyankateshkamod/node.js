const express = require('express');
const mongoose = require('mongoose');
const app = express();

// connection
mongoose
    .connect('mongodb://127.0.0.1:27017/soham')           // local host
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Mongo Error', err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, { timestamps: true })

// Model
const User = mongoose.model('user', userSchema);

// parsing data
app.use(express.urlencoded({ extended: true }));

// insert data
app.post('/users', async (req, res) => {
    const body = req.body;

    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
    })

    console.log(result);
    return res.status(201).json({ msg: 'success' });
})

// get users from database
app.get('/users', async (req, res) => {
    const users = await User.find({});
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.firstName}-${user.email}</li>`)
            .join('')
        }
        </ul>
    `
    res.send(html);
})

// get users by id 
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
})

// update users
app.patch('/users/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id ;
    const user = await User.findByIdAndUpdate(
        id,
        {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        },
        {new : true}
    )
    return res.json(user);
})

// delete users
app.delete('/users/:id' , async(req,res)=>{
    const id = req.params.id ;
    await User.findByIdAndDelete(id) ;
    return res.json({status : 'success'}) ;
})


app.listen(8000, () => {
    console.log('Server started !');
})