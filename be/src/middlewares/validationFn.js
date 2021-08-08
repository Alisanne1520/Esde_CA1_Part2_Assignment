const validator = require('validator');
 
const validationFn = {
 
    validateUpdateSubmission: function (req, res, next) {
 
        console.log("validateUpdateSubmission function called");
        const fileId = req.body.fileId;
        const designTitleInput = req.body.designTitle;
        const designDescriptionInput = req.body.designDescription;
 
        reDesignTitleInput = new RegExp(`^[\\w\\s]+$`);
        reDesignDescriptionInput = new RegExp(`^[\\w\\s\\.]+$`);
        reFileId = new RegExp(`^\\d+$`);
 
        if (reDesignTitleInput.test(designTitleInput) && reDesignDescriptionInput.test(designDescriptionInput) && reFileId.test(fileId)) {
            next();
        } else {
            console.log("Error while submitting, most likely validation error");
            res.status(500);
            res.send(`{"message":"Error!"}`);
        }
    },
    validateDesignSubmission: function (req, res, next) {
 
        console.log("validateUpdateSubmission function called");
        const designTitleInput = req.body.designTitle;
        const designDescriptionInput = req.body.designDescription;
 
        reDesignTitleInput = new RegExp(`^[\\w\\s]+$`);
        reDesignDescriptionInput = new RegExp(`^[\\w\\s\\.]+$`);
 
        if (reDesignTitleInput.test(designTitleInput) && reDesignDescriptionInput.test(designDescriptionInput)) {
            next();
        } else {
            console.log("Error while submitting, most likely validation error");
            res.status(500);
            res.send(`{"message":"Error!"}`);
        }
    },
    validateSearchSubmission: function (req, res, next) {
 
        console.log("validateSearchSubmission function called");
        const searchInput = req.params.search;
 
        researchInput = new RegExp(`^[\\w\\s]+$`);
 
        if (researchInput.test(searchInput)) {
            next();
        } else {
            console.log("Error while submitting, most likely validation error");
            res.status(500);
            res.send(`{"message":"Error!"}`);
        }
    },
    validateRegister: function (req, res, next) {
 
        console.log("validateRegister function called");
        const fullNameInput = req.body.fullName;
        const emailInput = req.body.email;
        const passwordInput = req.body.password;
 
        registerPassInput = new RegExp(`(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,32})`);

        if(validator.isAlphanumeric(fullNameInput) &&  validator.isEmail(emailInput) && registerPassInput.test(passwordInput) && fullNameInput.length < 32 ){
            next();
        } else {
            console.log("Error while submitting, most likely validation error");
            res.status(500);
            res.send(`{"message":"Error!"}`);
        }
    },
 
} //end validationFn
 
 
module.exports = validationFn;
