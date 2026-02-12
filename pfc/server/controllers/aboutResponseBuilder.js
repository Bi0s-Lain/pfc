import StaticFileResponseBuilder from './staticFileResponseBuilder.js';

export default class AboutResponseBuilder extends StaticFileResponseBuilder {
    constructor(request, response) {
        super(request, response, 'about.html');
    }
}