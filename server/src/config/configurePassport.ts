import passport from 'passport';

const configurePassport = () => {

    // we need to use oauth20 strategy for google, linkedin here
    // passport.use(new GoogleStrategy());
    // passport.use(new LinkedInStrategy());

    // passport.serializeUser((user: any, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser((id: string, done) => {
    //     done(null, { id });
    // });
};



export default configurePassport;