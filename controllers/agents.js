const CrudController = require('./crud');

class AgentsController extends CrudController {
    constructor(officeService, cacheService) {
        super(officeService, cacheService);

        this.unBindFromOffice = this.unBindFromOffice.bind(this);
        this.bindToOffice = this.bindToOffice.bind(this);
        this.readProperties = this.readProperties.bind(this);


        this.routes['/unbind'] = [{method: 'post', cb: this.unBindFromOffice}];
        this.routes['/bind'] = [{method: 'post', cb: this.bindToOffice}];
        this.routes['/properties/:id'] = [{method: 'get', cb: this.readProperties}];

        this.registerRoutes();
    }

    async unBindFromOffice(req, res){
        const result = await this.service.unBindFromOffice(req.body);

        res.json(result);
    }

    async bindToOffice(req, res){
        const result = await this.service.bindToOffice(req.body);

        res.json(result);
    }

    async readProperties(req, res){
        const properties = await this.service.readProperties(req.params.id);

        res.json(properties);
    }
}

module.exports = (agentsService, cacheService) => {
    const controller = new AgentsController(
        agentsService,
        cacheService
    );

    return controller.router;
};