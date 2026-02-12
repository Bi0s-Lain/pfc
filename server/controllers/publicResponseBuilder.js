import StaticFileResponseBuilder from './staticFileResponseBuilder.js';

export default class PublicResponseBuilder extends StaticFileResponseBuilder {
    constructor(request, response) {
        const url = new URL(request.url, `http://${request.headers.host}`);
        super(request, response, url.pathname);
    }
}