import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request } from "express";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_URL } from ".";
import IUser from "../types/IUser";

const configurePassport = () => {
  // Passport Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${SERVER_URL}/api/auth/google/callback`,
        passReqToCallback: true,
      },
      async (req: Request, accessToken, refreshToken, profile, done) => {
        try {
          const googleUser = {
            id: profile.id,
            email: profile.emails?.[0].value || "",
            name: profile.displayName,
          };

          // Validate and get user from DB
          const user = await validateGoogleUser(googleUser.id);

          // Securely passing the user ID for serialization
          return done(null, user.user?.userId);
        } catch (error) {
          console.error("Google OAuth error:", error);
          return done(error as Error);
        }
      },
    ),
  );

  passport.serializeUser((userId: any, done) => {
    try {
      if (!userId) {
        return done(new Error("User ID is missing in serializeUser"));
      }
      done(null, userId);
    } catch (error) {
      console.error("Serialize user error:", error);
      return done(error);
    }
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      if (!user) {
        return done(new Error("User not found"));
      }
      done(null, user);
    } catch (error) {
      console.error("Deserialize user error:", error);
      done(error);
    }
  });
};

// Dummy function to simulate checking if Google user exists in DB
const validateGoogleUser = async (googleId: string) => {
  const userData = {
    lastName: "Doe",
    primaryEmail: "john.doe@example.com",
    googleId: googleId,
    userId: "1234567890",
  };

  const user = await new Promise<{
    isExistingUser: boolean;
    user?: IUser;
  }>((resolve) => {
    setTimeout(() => {
      // Simulate DB check - 30% chance user exists, 70% chance new user
      const userExists = Math.random() < 0.3;

      if (userExists) {
        resolve({
          isExistingUser: true,
          user: userData,
        });
      } else {
        resolve({
          isExistingUser: false,
          user: userData,
        });
      }
    }, 500); // Simulating DB delay
  });

  return user;
};

// Dummy function to fetch user by ID (you should replace it with actual DB logic)
const getUserById = async (id: string) => {
  return {
    userId: id,
    lastName: "Doe",
    primaryEmail: "john.doe@example.com",
    googleId: "sample-google-id",
  };
};

export default configurePassport;
