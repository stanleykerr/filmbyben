import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { User } from "@/lib/db";

// TODO: keep track of https://github.com/jaredhanson/passport/issues/904

passport.serializeUser((user, done) => {
  // serialize the username into session
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  // deserialize the username back into user object
  User.findOne({ where: { id } }).then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password

      User.findOne({ where: { email } }).then((user) => {
        // Security-wise, if you hashed the password earlier, you must verify it
        // if (!user || await argon2.verify(user.password, password))
        if (!user) {
          done(null, null);
        } else {
          done(null, user.validatePassword(password) ? user : null);
        }
      });
    }
  )
);

export default passport;
