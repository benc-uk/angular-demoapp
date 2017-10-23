#!/bin/sh

# Can't start SSH as a service (blah Docker blah), so run directly as background job
/usr/sbin/sshd -D &

# Now run our Node app
npm start
