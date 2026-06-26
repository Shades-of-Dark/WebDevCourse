const { updateMemberStatus, updateAdminStatus } = require("../db/userQueries");

function joinMemberGet(req, res) {
    res.render("joinMember", { error: null });
}

async function joinMemberPost(req, res) {
    const { secretCode } = req.body;
    if (secretCode !== process.env.MEMBER_SECRET) {
        return res.status(400).render("joinMember", { error: "Incorrect secret code." });
    }
    try {
        await updateMemberStatus(req.user.username, true);
        req.user.is_member = true;
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).render("joinMember", { error: "Something went wrong. Please try again." });
    }
}

function joinAdminGet(req, res) {
    res.render("joinAdmin", { error: null });
}

async function joinAdminPost(req, res) {
    const { secretCode } = req.body;
    if (secretCode !== process.env.ADMIN_SECRET) {
        return res.status(400).render("joinAdmin", { error: "Incorrect secret code." });
    }
    try {
        await updateAdminStatus(req.user.username, true);
        req.user.is_admin = true;
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).render("joinAdmin", { error: "Something went wrong. Please try again." });
    }
}
function accessMemberGet(req, res) {
    res.render("memberHome", { error: null });
}
module.exports = { joinMemberGet, joinMemberPost, joinAdminGet, joinAdminPost, accessMemberGet };
