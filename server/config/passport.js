import passportJwt from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const secret = process.env.JWT_SECRET || 'secretKey';
const users = []; // In-memory storage for users

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

console.log('JWT_SECRET:', opts.secretOrKey); // This should print your JWT secret

const passportConfig = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        const user = users.find(user => user.id === jwt_payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }));
};

export default passportConfig;
