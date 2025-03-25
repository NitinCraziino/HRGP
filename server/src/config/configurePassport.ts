
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Request } from 'express';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CLIENT_URL } from '.';

const configurePassport = () => {
    // passport.use(new GoogleStrategy(
    //     {
    //         clientID: GOOGLE_CLIENT_ID,
    //         clientSecret: GOOGLE_CLIENT_SECRET,
    //         callbackURL: `${CLIENT_URL}/api/auth/callback`,
    //         passReqToCallback: true
    //     },
    //     async (req: Request, accessToken, refreshToken, profile, done) => {
    //         try {
    //             const googleUser = {
    //                 id: profile.id,
    //                 email: profile.emails?.[0].value || '',
    //                 name: profile.displayName
    //             };

    //             console.log(profile);

    //             return done(null, googleUser);

    //         } catch (error) {
    //             return done(error as Error);
    //         }
    //     }
    // ));


    // passport.serializeUser((user: any, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser((id: string, done) => {
    //     done(null, { id });
    // });
};



export default configurePassport;