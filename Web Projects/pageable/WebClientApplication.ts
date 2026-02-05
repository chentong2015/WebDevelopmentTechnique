// @ts-ignore
import {HttpClient, HttpResponse} from '@angular/common/http';
import {PageRequest} from './PageRequest';
import {createRequestOption} from './PageRequestUtil';
import {EntityModel} from "./EntityModel";

export class WebClientApplication {

    constructor(private http: HttpClient) {
    }

    // TODO. Web前端自定义Page分页请求param参数, 获取返回的分页内容
    findEntitiesPageable(req?: PageRequest): HttpResponse<EntityModel[]> {
        let options = createRequestOption(req);
        return this.http.get<EntityModel[]>(`http:://localhost/test`, {params: options, observe: 'response'},
        );
    }
}