// import passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
// import { Strategy as LocalStrategy } from 'passport-local';
// import prisma from './db';


// const options: StrategyOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWT_SECRET! // Get JWT secret from environment variables
// };

// passport.use(
//     new JwtStrategy(options, async (jwtPayload, done) => {
//         try {
//             const user = await prisma.user.findUnique({ where: { email: jwtPayload.email } });
            
//             if (user) {
//                 return done(null, user);
//             }
            
//             return done(null, false);
//         } catch (error) {
//             return done(error, false);
//         }
//     })
// );

