import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/userModel.js'; // ⚠️ IMPORTANT: Ensure this path has .js at the end

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user exists by Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // 2. If not, check if user exists by Email (to merge accounts)
        const existingEmail = await User.findOne({ email: profile.emails[0].value });
        
        if (existingEmail) {
            // Link Google ID to existing account
            existingEmail.googleId = profile.id;
            await existingEmail.save();
            return done(null, existingEmail);
        } else {
            // 3. Create new user
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