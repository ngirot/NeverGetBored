import HttpResponseToken from "./HttpResponseToken";

const needle = require('needle');

export function postTokenUrl(url: string): Promise<HttpResponseToken> {
    return needle('post', url).then((response: any) => {
        return response.body;
    });
}