import jwt from 'jsonwebtoken';

const key = process.env.SALT_KEY;

class AuthService {
    static generateToken = async (data) => {
        return jwt.sign(data, key, { expiresIn: '1h' });
    };

    static decodeToken = async (token) => {
        var data = await jwt.verify(token, key);
        return data;
    };

    static authorize = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        if (!token) {
            res.status(401).json({
                message: 'Acesso Restrito'
            });
        } else {
            jwt.verify(token, key, function (error) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    });
                } else {
                    next();
                }
            });
        }
    };
}

export default AuthService;