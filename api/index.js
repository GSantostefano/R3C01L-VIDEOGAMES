/*
 __   _   _  _  ___   _   __  ___  ___  ___   _   _  _   _       __   _   ___  ___  _  ___  _
/ _| / \ | \| ||_ _| / \ / _||_ _|| __|| __| / \ | \| | / \     / _| / \ | o )| o \| || __|| |
\_ \| o || \\ | | | ( o )\_ \ | | | _| | _| | o || \\ |( o )   ( |_n| o || o \|   /| || _| | |_
|__/|_n_||_|\_| |_|  \_/ |__/ |_| |___||_|  |_n_||_|\_| \_/     \__/|_n_||___/|_|\\|_||___||___|

 ___  _ _  _    _      __  ___   _    __  _  _   __   ___  _ _  ___  _     _   ___  ___  ___
| __|| | || |  | |    / _||_ _| / \  / _|| |//  |  \ | __|| | || __|| |   / \ | o \| __|| o \
| _| | U || |_ | |_   \_ \ | | | o |( (_ |  (   | o )| _| | V || _| | |_ ( o )|  _/| _| |   /
|_|  |___||___||___|  |__/ |_| |_n_| \__||_|\\  |__/ |___| \_/ |___||___| \_/ |_|  |___||_|\\

 */
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~holis
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.BACKEND_PORT, () => {
    console.log(`% listening at holisss andara?`); // eslint-disable-line no-console
  });
});