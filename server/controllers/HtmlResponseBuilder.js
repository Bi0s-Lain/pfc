import ResponseBuilder from './responseBuilder.js';

export class HtmlResponseBuilder extends ResponseBuilder {
    constructor(request, response, status = 200) {
        super(request, response, status, 'text/html; charset=utf-8');
    }

    buildHeader() {
        this.response.write(`
            <html>
                <head>
                    <meta charset="utf-8">
                    <link href="./public/style/style.css" rel="stylesheet" type="text/css">
                </head>
                <body class="ok">
        `);
    }

    buildFooter() {
        const dateStr = new Date().toLocaleString();
        this.response.write(`<footer><hr><p>Généré le : ${dateStr}</p></footer>`);
        this.response.write('</body></html>');
    }   
}