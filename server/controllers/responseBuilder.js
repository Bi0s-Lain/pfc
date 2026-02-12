export default class ResponseBuilder{
    // classe abstraite et apres les sous classes build bien comme il gaut en fonction de ce qu'on veut,
    // genre on aura un response builder json etc...

    #request;
    #response;
    #status;
    #contentType;

    constructor(request, response, status = 200, contentType = 'text/plain') {
        this.#request = request;
        this.#response = response;
        this.#status = status;
        this.#contentType = contentType;
    }

    get request() { 
        return this.#request; 
    }
    get response() { 
        return this.#response; 
    }
    get status() { 
        return this.#status; 
    }
    get contentType() { 
        return this.#contentType; 
    }

    build() {
        this.prepareHeader();
        this.buildHeader();
        this.buildBody();
        this.buildFooter();
        this.response.end();
    }

    prepareHeader() {
        this.response.statusCode = this.#status;
        this.response.setHeader('Content-Type', this.#contentType);
    }

    buildHeader() { }
    buildBody() { }
    buildFooter() { }
}