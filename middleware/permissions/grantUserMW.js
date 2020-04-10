/**
 * Grants or revokes admin authorities
 * - uses :id to identify the user
 * If grant true: the admin will be set to true, and false otherwise
 */

module.exports = (objects, grant) => (req, res, next) => {
    console.log(`User admin status: ${grant}`);
    next();
};