const controller = require('./routes/animals');
require('dotenv').config();

const port = process.env.PORT || 8080;

controller.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
