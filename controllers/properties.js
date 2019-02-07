const CrudController = require('./crud');

class PropertiesController extends CrudController{
    constructor(propertyService, cacheService){
        super(propertyService, cacheService);

        this.unBindFromAgent = this.unBindFromAgent.bind(this);
        this.bindToAgent = this.bindToAgent.bind(this);

        this.routes['/unbind'] = [{method: 'post', cb: this.unBindFromAgent}];
        this.routes['/bind'] = [{method: 'post', cb: this.bindToAgent}];

        this.registerRoutes();        
    }

    async unBindFromAgent(req, res){
        const result = await this.service.unBindFromAgent(req.body);
    
        res.json(result);
    }

    async bindToAgent(req, res){
        const result = await this.service.bindToAgent(req.body);

        res.json(result);
    }
}

module.exports = (propertiesService, cacheService) => {
    const controller = new PropertiesController(
        propertiesService,
        cacheService
    );

    return controller.router;
};