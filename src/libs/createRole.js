const Role = require('../Models/roleModel');

const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count) return;

    const values = await Promise.all([
      new Role({ name: 'client' }).save(),
      new Role({ name: 'moderator' }).save(),
      new Role({ name: 'admin' }).save()
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createRole;
