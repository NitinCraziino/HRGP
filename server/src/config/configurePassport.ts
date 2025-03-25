
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request } from 'express';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CLIENT_URL } from '.';
import IUser from '../types/IUser';

const configurePassport = () => {
    passport.use(new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${CLIENT_URL}/api/auth/callback`,
            passReqToCallback: true
        },
        async (req: Request, accessToken, refreshToken, profile, done) => {
            try {
                const googleUser = {
                    id: profile.id,
                    email: profile.emails?.[0].value || '',
                    name: profile.displayName
                };

                const user = await validateGoogleUser(googleUser.id);

                if (user.isExistingUser) {
                    return done(null, user.user);
                } else {
                    return done(null, user.user);
                }

            } catch (error) {
                return done(error as Error);
            }
        }
    ));


    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        done(null, { id });
    });
};

// Dummy function to simulate checking if Google user exists in database
const validateGoogleUser = async (googleId: string) => {
    const userData = {
        lastName: "Doe",
        primaryEmail: "john.doe@example.com",
        googleId: googleId,
        userId: "1234567890"
    };
    const user = await new Promise<{
        isExistingUser: boolean;
        user?: IUser;
    }>((resolve) => {
        setTimeout(() => {
            // Simulate DB check - 30% chance user exists, 70% chance new user
            const userExists = Math.random() < 0.3;

            if (userExists) {
                // Return existing user data
                resolve({
                    isExistingUser: true,
                    user: userData
                });
            } else {
                // Simulate creating new user
                resolve({
                    isExistingUser: false,
                    user: userData
                });
            }
        }, 500); // Reduced timeout for better UX
    });

    return user;
};



export default configurePassport;