const Office = require('./models/offices');
const Agent = require('./models/agents');
const Propertie = require('./models/properties');

const config = require('./config.json');

module.exports = (Sequelize, login = config.login, password = config.password, db = config.db) =>
{
	const sequelize = new Sequelize(db, login, password, {
		host: config.host,
		dialect: config.dialect,
		logging: false,
		port: config.port,
	});

	const office = Office(Sequelize, sequelize);
	const agent = Agent(Sequelize, sequelize);
	const propertie = Propertie(Sequelize, sequelize);

	propertie.belongsTo(agent, { foreignKey: 'agentId' });
	agent.belongsTo(office, {foreignKey: 'officeId' });

	return {
		office,
		agent,
		propertie,

		sequelize: sequelize,
		Sequelize: Sequelize
	};
};