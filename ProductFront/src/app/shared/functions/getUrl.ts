import { IProductParams } from "../../core/interfaces/params-interfaces";


export function getUrl(pathBase: string, params: IProductParams | undefined): string {
    let url = `${pathBase}?`;
    for (let key in params) {
        if (params[key as keyof IProductParams]) {
            url = `${url}${key}=${params[key as keyof IProductParams]}&`;
        }
    }
    return url;
}