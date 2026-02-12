import StaticFileResponseBuilder from './staticFileResponseBuilder.js';

export default class PfcResponseBuilder extends StaticFileResponseBuilder {
    constructor(request, response, status = 200) {
        super(request, response, 'game.html');
    }
}