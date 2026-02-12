import * as fs from 'fs/promises';
import path from 'path';
import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';
import PublicResponseBuilder from './publicResponseBuilder.js';
import { NotFoundResponseBuilder } from './notFoundResponseBuilder.js';
import HomeResponseBuilder from './homeResponseBuilder.js'
import AboutResponseBuilder from './aboutResponseBuilder.js';
import PfcResponseBuilder from './pfcResponseBuilder.js';

const BASE = 'http://localhost/';
const BASE_PUBLIC = './public';
/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    //this.#url = new URL(request.url, `http://${request.headers.host}`).pathname;
    this.#url = new URL(this.request.url,BASE).pathname;   // on ne considère que le "pathname" de l'URL de la requête
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {
        let builder;
        const pathname = this.#url;

        if (pathname.startsWith('/scripts') || pathname.startsWith('/style') || pathname.startsWith('/assets') || pathname.startsWith('/images')) {
            builder = new PublicResponseBuilder(this.#request, this.#response);
        } else {
            switch (pathname) {
                case '/':
                    builder = new HomeResponseBuilder(this.#request, this.#response);
                    break;
                case '/about':
                    builder = new AboutResponseBuilder(this.#request, this.#response);
                    break;
                case '/pfc':
                    builder = new PfcResponseBuilder(this.#request, this.#response);
                    break;
                default:
                    builder = new NotFoundResponseBuilder(this.#request, this.#response);
                    break;
            }
        }
        await builder.build();
    }
}
