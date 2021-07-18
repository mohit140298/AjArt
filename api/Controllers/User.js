const User = require('../Models/user')


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users
        })



    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message
        })
    }

}

exports.getUser = async (req, res) => {
    try {
        if (!req.user_id)
        {
            res.status(400).json({ "message": "user not permitted" })
            }
        const user = await User.findById(req.user_id).populate('role')
        //User.findOne({_id:req.params.id})
        if (!user)
        {
            res.status(400).json({"message":"user not found"})
        }
        res.status(200).json({
            status: 'success',
            role: user.role,
            data:user

        })
    }
    catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })
        //User.findOne({_id:req.params.id})

        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }

}
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success"
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }


}

exports.uploadImage = async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({ error: "no file uploaded" })
    }
    const file = req.files.file;
    const user = await User.findById(req.params.id)
    if (!user)
    {
        return res.status(400).send('user not found')
        }
    file.mv(`/home/mohit/mohit/AjArt/server/client/public/images/${file.name}`, err => {
        if (err) {
            return res.status(500).send(err)
        }

        user.profileImage = `/images/${file.name}`
        user.save()

        res.status(200).json({
            status: "success",
            data: {
                fileName: file.name, filePath: `/images/${file.name}`
            }

        })
    })
}