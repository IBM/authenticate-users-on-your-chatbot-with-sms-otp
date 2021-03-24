#! /usr/bin/env node

// Requires and declarations
require('dotenv').config({ silent: true });

const server = require('./nodeserver.js');

const port = process.env.PORT || process.env.VCAP_APP_PORT || 8080;

server.listen(port, () => {
  console.log('Server running on port: %d', port);
});
