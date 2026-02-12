import { HtmlResponseBuilder } from "./HtmlResponseBuilder.js";

export class NotFoundResponseBuilder extends HtmlResponseBuilder {
    constructor(request, response) {
        super(request, response, 404);
    }
    buildBody() {
        const path = new URL(this.request.url, `http://${this.request.headers.host}`).pathname;
        this.response.write(`
            <h1>404 Not Found</h1>
            <p>Désolé, la page <strong>${path}</strong> n'existe pas.</p>
            <p>(je suis pas désolé c'est faux)
            `);
    }
}