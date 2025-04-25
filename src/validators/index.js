import { body } from "express-validator";

export const userRegistrationValidator = () => {
    // console.log(body("username"));
    const validations = [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid Email"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLength({ min: 3 })
            .withMessage("User name at least have 3 character")
            .isLength({ max: 14 })
            .withMessage("User name cannot exceeds 14 character"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password at least have 8 character")
            .isLength({ max: 14 })
            .withMessage("Password cannot exceeds 14 character"),
    ];

    return validations;
};

export const userLoginValidator = () => {
    return [
        body("email").isEmail().withMessage("Invalid Email").trim(),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password at least have 8 character")
            .isLength({ max: 14 })
            .withMessage("Password cannot exceeds 14 character"),
    ];
};
// export { userRegistrationValidator, userLoginValidator };
