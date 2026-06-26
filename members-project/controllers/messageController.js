const { createMessage, deleteMessage } = require("../db/messageQueries");


function createMessageGet(req, res) {
    res.render("messageForm", {});
}

async function createMessagePost(req, res) {
    try {
        const { title, message } = req.body;
        await createMessage(title, message, req.user.username);
        res.redirect("/");
    }
    catch (err) {
        console.error(err);
        res.status(500).render("signUp", {
            errors: [{ msg: "Something went wrong on our end. Please try again." }],
            data: req.body
        });
    }

}

async function deleteMessagePost(req, res) {
    if (req.user.is_admin) {
        try {
            await deleteMessage(req.params.id);
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.status(500).redirect("/");
        }
    }

}


module.exports = { createMessageGet, createMessagePost, deleteMessagePost };