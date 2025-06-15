const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.firstName}-${user.email}</li>`)
            .join('')
        }
        </ul>
    `
    res.send(html);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    const body = req.body;
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
        id,
        {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        },
        { new: true }
    )
    return res.json(user);
}

async function handleDeleteUserById(req, res) {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.json({ status: 'success' });
}

async function handleCreateNewUser(req, res) {
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
    return res.status(201).json({ msg: 'success', id: result._id });
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}