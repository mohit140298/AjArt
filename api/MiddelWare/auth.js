const jwt = require('jsonwebtoken')


exports.checkLogin = async (req, res, next) => {
    try {
        let token = req.cookies.auth;

        // decode token
        if (token) {

            jwt.verify(token, process.env.SECRET_KEY, function (err, token_data) {
                if (err) {
                    return res.status(403).json({ 'Error': err });
                } else {
                    req.user_id = token_data._id;
                    next();
                }
            });
        }
        else {
            return res.status(403).send('No token Provided');
        }
    

    } catch (err) {
        console.log(err)
        return res.status(403).send('No token Provided');
    }
    
}