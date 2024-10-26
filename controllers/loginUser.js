const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                return res.redirect('/');
            } else {
                return res.redirect('/auth/login');
            }
        } else {
            return res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).send('Internal server error');
    }
};
