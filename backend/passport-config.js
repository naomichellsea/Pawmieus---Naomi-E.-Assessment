import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/userModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      //Check if user exists by Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        const existingEmail = await User.findOne({ email: profile.emails[0].value });
        
        if (existingEmail) {
            //Google ID to existing account
            existingEmail.googleId = profile.id;
            await existingEmail.save();
            return done(null, existingEmail);
        } else {
            //Create new user
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
            await user.save();
        }
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});