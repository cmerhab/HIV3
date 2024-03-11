const express = require('express')
const router = express.Router()
const RolesModel = require('../models/schemas')

router.get('/rolelist', async (req, res) => {
  try{
    const rolesData = await RolesModel.find(); //Fetches everything

    const list = rolesData.map(rl => ({
      Roles: rl.Roles.map(role => ({
        Role: role.Role,
        Emails: role.members.map(member => member.aemail)
      }))
    }));

    res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ message: 'An error occurred while fetching list'})
  }
});

router.post('/members', async (req, res) => {
  const { roleId, aemail, userid } = req.body;

  //Find role by its ID
  try { 
    const role = await RolesModel.findOne({ "Roles.id": roleId });

    if(!role) {
      return res.status(404).json({ message: 'Role id not found'});
    }

    const roleToUpdate = role.Roles.find(r=> r.id === roleId);

    const isMemberAlreadyHere = roleToUpdate.members.some(member=> member.aemail === aemail || member.userid === userid);
    if(isMemberAlreadyHere) {
      return res.status(409).json({message: 'Member Already exists in this role'});
    }

    roleToUpdate.members.push({ aemail, userid});
    await role.save();

    res.status(201).json({ message: 'Member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An Error Occurred'})
  }
});

router.get('/findmember', async (req, res) => {
  const { current_user, role } = req.query;

  try {
  //  console.log(`Role ${role}, Current User: ${current_user}`);
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