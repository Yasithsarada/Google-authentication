import config from '../config'
import GoogleStrategy from 'passport-google-oauth20'
import User from '../api/model/User'
import findOrCreate from 'mongoose-findorcreate'

export const gAuth = (passport) => {

    GoogleStrategy.Strategy;
    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL
    },
    
   async (accessToken,refreshToken,profile,callback) => {
    await User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });}
    ))

    passport.serializeUser(function(user, done) {
      console.log("serilize");
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        console.log("deserilize");
        User.findById(id, function (err, user) {
          done(err, user);
        })
      });
}