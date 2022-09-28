//const bcrypt = require("bcrypt");
const argon2 = require("argon2");

const passwordHashing = {
    /** Hashes provided password
     * @param {string} password
     * @returns {string} hashed password
     */
    hash: async (password) => {
        //return bcrypt.hash(password);
        return argon2.hash(password);
    },

    /** Verifies plain password against hashed password
     * @param {string} password
     * @param {string} hashedPassword
     * @returns {boolean}
     */
    verify: async (password, hashedPassword) => {
        //return bcrypt.compare(password, hashedPassword);
        return argon2.verify(hashedPassword, password);
    },
}

module.exports = passwordHashing;