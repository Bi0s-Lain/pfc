import StaticFileResponseBuilder from './staticFileResponseBuilder.js';

export default class HtmlResponseBuilder extends StaticFileResponseBuilder {
    constructor(request, response, status = 200) {
        super(request, response, 'index.html');
    }


}