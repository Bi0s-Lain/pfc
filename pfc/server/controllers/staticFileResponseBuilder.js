import ResponseBuilder from './responseBuilder.js';
import * as fs from 'fs/promises';
import path from 'path';
import { getContentTypeFrom } from '../scripts/contentTypeUtil.js';

export default class StaticFileResponseBuilder extends ResponseBuilder {
    #filePath;

    constructor(request, response, relativePath) {
        const contentType = getContentTypeFrom(relativePath);
        super(request, response, 200, contentType);
        
        this.#filePath = path.join(process.cwd(), 'public', relativePath);
    }

    buildHeader() {}
    buildFooter() {}

    async build() {
        try {
            const data = await fs.readFile(this.#filePath);
            this.response.writeHead(this.status, { 'Content-Type': this.contentType });
            this.response.write(data);
        } catch (err) {
            this.response.writeHead(404);
            this.response.write("404: Fichier introuvable ou erreur serveur");
        }
        this.response.end();
    }
}