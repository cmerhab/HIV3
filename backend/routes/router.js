const express = require('express')
const router = express.Router()

router.get('/users', (req, res) =>{ //this will be edited with a databse.
                                    //ATM: localhost:4000/users = this data here
    const userData = [{
        "Roles": [
          {
            "Role": "Owner",
            "members": [
              {
                "aemail": "identitypvp@gmail.com",
                "userid": "RsywSpGOqDhZpIHwK4jb0GlmsMU2"
              }
            ],
            "id": "150b"
          },
          {
            "Role": "Admin",
            "members": [
              {
                "aemail": "connormerhab@gmail.com",
                "userid": "e6PJbozveZQVbgoWP3bcnoJZWEx1"
              }
            ],
            "id": "34d3"
          },
          {
            "Role": "Guest",
            "members": [
              {}
            ],
            "id": "e024"
          },
          {
            "Role": "Banned",
            "members": [],
            "id": "9388"
          }
        ]
      }]
      res.send(userData)
})

module.exports = router