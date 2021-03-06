const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// START SERVER
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
