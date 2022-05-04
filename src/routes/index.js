import { authenticate, authenticateB } from '../midldleware/auth.mddleware';


export const routesG = (app,passport) => {
    app.get('/auth/google',
     passport.authenticate("google" , {scope : ["profile" , "email"]}
))

app.get('/auth/google/callback', passport.authenticate("google", {failureRedirect  : '/login', successRedirect: "/user" }), //, successRedirect : '/user'
    (req, res) => {
        console.log("user succceessfully authenticated 🛑🛑");
    }
)

app.get('/test',authenticateB,(req, res ) => {
    res.send("<h2>user authentication successfull ✔️✔️</h2>")
})
}