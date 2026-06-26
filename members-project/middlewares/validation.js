const { body, validationResult } = require("express-validator");

const signUpValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("Name can not be empty.")
        .isAlpha()
        .withMessage("Name must only contain alphabet letters."),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Name can not be empty.")
        .isAlpha()
        .withMessage("Name must only contain alphabet letters."),
    body("username")
        .notEmpty()
        .withMessage("Username can not be empty.")
        .isEmail()
        .withMessage("Username must be a valid email string."),
    body("password")
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be at least 8 characters long')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('confirm_pw')
        .notEmpty()
        .withMessage('Please confirm your password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("signUp", {
                errors: errors.array(),
                data: req.body
            });
        }


        next();
    }
];

const messageValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required").isLength({ min: 3, max: 30 })
        .withMessage("Title must be at least 3 characters long")
        .trim(),
    body("message")
        .notEmpty()
        .withMessage("Message is required").isLength({ min: 3, max: 10000 })
        .withMessage("Message must be at least 3 characters long")
        .trim()];



module.exports = { signUpValidation, messageValidation };
