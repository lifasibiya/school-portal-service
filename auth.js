const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];

        const tokenData = await jwt.verify(token, 'ASFSGDGD.LKSKHDJ.AIUDIYDSU');
        const user = tokenData;
        request.user = user;
        next();
    } catch (error) {
        response.status(401).send({ message: 'Auth failed', error });
    }
}