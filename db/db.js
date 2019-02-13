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

	const offices = Office(Sequelize, sequelize);
	const agents = Agent(Sequelize, sequelize);
	const properties = Propertie(Sequelize, sequelize);

	properties.belongsTo(agents, { foreignKey: 'agentId' });
    agents.belongsTo(offices, { foreignKey: 'officeId' });
    offices.hasMany(agents);
    agents.hasMany(properties);

	return {
		offices,
		agents,
		properties,

		sequelize: sequelize,
		Sequelize: Sequelize
	};
};