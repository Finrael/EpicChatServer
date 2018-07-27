
import express, { json } from 'express';
import bodyParser from 'body-parser';
const app = express();
import User from '../db/models/registerSchema';
const router = express.Router();
router.post('/register', (req, res) => {

    let post = new User({
        username: req.body.username,
        email: req.body.email,
        contacts: [],
        language:req.body.language,
    });
    post.setPassword(req.body.password, function (err, user) {
        if (err) {
            return res.status(500).end("Could not set password");
        }
        user.save(function (err: any) {
            if (err) {
                res.status(500).end("server error while saving");
                console.error(err);
                throw err;
            } else {
                console.log('save name successfull')
                res.end();
            }
        })
    });
    // console.log('postRegister is in: ', req.body);
// res.end();
});
 

export default router;
