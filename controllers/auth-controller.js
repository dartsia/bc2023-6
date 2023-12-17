const conn = require('../utils/database');

module.exports.login = function(req,res) {
    let email = req.body.email;
    let password = req.body.password;
    if (email && password) {
            conn.query('SELECT * FROM users WHERE Email = ? AND Password = ?', [email, password], function(error, results, fields) {
            if (error) throw error;
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                req.session.userid = results[0].ID;
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(400).json({ error: 'Password incorrect' });
            }           
        });
    } else {
        return res.status(400).json({ error: 'Your email and password are required.' });
    }
}

module.exports.register = function(req,res) {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(user);
    let sql = "INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)";
    return conn.query(sql, [user.name, user.email, user.password], 
        (err, result) => {
        if (err) throw err;
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json({ message: 'Registration has been successful. You can now log in.' });
    });
}

