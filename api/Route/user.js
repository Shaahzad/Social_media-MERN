const router = require("express").Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')



// update user
router.put("/:id", async (req, res) => {
if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).json("Account has been updated");
    } catch (error) {
        return res.status(500).json(error);
    }
} else {
    return res.status(403).json("You can update only your account!");
}


})
// delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
    
    
    })
    
// get user

router.get("/", async (req, res) => {
    const username = req.query.username
    const userId = req.query.userId
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({ username: username })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// get friends

router.get("/friends/:userId", async (req, res) => {
try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
        user.followings.map((friendId) => {
            return User.findById(friendId);
        })

    )
    let friendList = [];
    friends.map((friend) => {
        const { _id, username, profilePicture } = friend
        friendList.push({ _id, username, profilePicture })
    })
    res.status(200).json(friendList)
} catch (error) {
    res.status(500).json(error)
}
})








// follow user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you already follow this user");
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can't follow yourself");
    }
})

// unfollow user



router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can't unfollow yourself");
    }
})

 

module.exports = router