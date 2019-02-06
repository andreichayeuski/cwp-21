const Sequelize = require('sequelize');

const db = require('./db/db')(Sequelize);

(async function () {
	await db.sequelize.sync();

	/*await db.roles.findOrCreate({
		where: { name: 'adminstrator' }
	});

	await db.roles.findOrCreate({
		where: { name: 'user' }
	});

	server.listen(3000, () => console.log('Running'));*/
})();
