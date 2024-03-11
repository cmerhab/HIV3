const express = require('express')
const router = express.Router()
const RolesModel = require('../models/schemas')


router.post('/members', async (req, res) => {
  const { roleId, aemail, userid } = req.body;

  //Find role by its ID
  try { 
    const role = await RolesModel.findOne({ "Roles.id": roleId });

    if(!role) {
      return res.statis(404).send('Role not found');
    }

    const roleToUpdate = role.Roles.find(r=> r.id === roleId);
    roleToUpdate.members.push({ aemail, userid});

    await role.save();

    res.status(201).send('Member addedd successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An Error Occurred')
  }
});

router.get('/findmember', async (req, res) => {
  const { current_user, role } = req.query;

  try {
    console.log(`Role ${role}, Current User: ${current_user}`);
    const roleWithMember = await RolesModel.findOne({
      "Roles": {
        "$elemMatch": {
          "Role": role,
            "members": {
              "$elemMatch": {
                "aemail": current_user
              }
            }
        } 
      }
    });

    if(roleWithMember) {
      res.json({ message: `Member exists in role`});
    } else {
      res.json({ message: `Member does not exist in role`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An Error occurred while checking the member role');
  }
});


module.exports = router