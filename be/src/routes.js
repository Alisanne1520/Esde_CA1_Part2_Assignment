// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validationFn = require('./middlewares/validationFn');
const verifyUserToken = require('./middlewares/verifyUserToken');


// Match URL's with controllers
exports.appRoute = router => {
    
    router.post('/api/user/login', authController.processLogin);
    router.post('/api/user/register',validationFn.validateRegister, authController.processRegister);
    router.post('/api/user/process-submission',validationFn.validateDesignSubmission, checkUserFn.getClientUserId, userController.processDesignSubmission);
    router.put('/api/user/', userController.processUpdateOneUser);
    router.put('/api/user/design/',verifyUserToken.verifyTokenUserID,validationFn.validateUpdateSubmission, userController.processUpdateOneDesign);
    router.post('/api/user/processInvitation/',checkUserFn.getClientUserId, userController.processSendInvitation);

    router.get('/api/user/process-search-design/:pagenumber/:search?', validationFn.validateSearchSubmission,checkUserFn.getClientUserId, userController.processGetSubmissionData);
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetUserData);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', userController.processGetSubmissionsbyEmail);
    router.get('/api/user/:recordId',verifyUserToken.verifyTokenUserID, userController.processGetOneUserData);
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData);

};