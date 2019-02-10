const Sequelize = require('sequelize');

const db = require('./db/db')(Sequelize);
const server = require('./server')(db);

(async function () {
	await db.sequelize.sync();

	server.listen(3000, () => console.log('Running'));
})();