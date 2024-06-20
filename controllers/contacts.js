const path = require('path');

const rootDir = require('../util/path');

exports.contactUsEmail = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
};
