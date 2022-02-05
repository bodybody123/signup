import mysql from 'mysql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todo'
});

export default class Auth {

    static async login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render('login', {
                message: 'Please provide username and password'
            })
        }
        conn.query('SELECT * FROM user_acc WHERE username = ?', [username], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'password or username is incorrect'
                })
            }
            else {
                const id = results[0].id;

                return res.render('login', {
                    message: 'Login Success'
                });
                // const token = jwt.sign({ user_id: id }, process.env.JWT_SECRET, {
                //     exipiresIn: process.env.JWT_EXPIRES_IN
                // });

                // const cookieOptions = {
                //     expires: new Date(
                //         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000;
                //     ),
                //     httpOnly: true
                // }
                
                // res.cookie('jwt', token, cookieOptions);
                // res.status(200).redirect('/');
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

    static async register(req, res) {

    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    //const { name, email, password, passwordConfirm } = req.body;
    // ^ Kemabarannya

    conn.query('SELECT email FROM user_acc WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length > 0) {
                return res.render('register', {
                    message: 'The email has been taken'
                }, {
                    message: 'username has been taken'
                });
            }
            else if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'password is incorrect'
                });
            }
    
            let hashedPassword = await bcrypt.hash(password, 8);

            conn.query('INSERT INTO user_acc SET ?', { username: name, email: email, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                    return res.render('register', {
                        message: 'User Registered'
                    });
                }
            })
        });

    };
}
