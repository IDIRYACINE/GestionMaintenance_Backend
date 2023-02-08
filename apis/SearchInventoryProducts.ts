/// <reference path="../types/ApiInterface.d.ts" />
/// <reference path="../types/ApiRequestModels.d.ts" />

import { Request, Response } from "express"
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { database } from "../src/Databases/Database";
import {AuthWrapperAction} from "../src/Utilities/AuthWrapper";

const name = ApisEnum.searchInventoryProduct;
const version = 0;
const description = "Search inventory product";

function Search(req: Request, res: Response): void {

    AuthWrapperAction(req, res, (req: Request, res: Response) => {
        const request = req.body as SearchInventoryProductRequest;
        database.searchInventoryProduct(request.attributes,request.permissions,request.isAdmin).then(() => {
            res.json({ products: true });
        });
    });
    
}

const SearchInventoryProduct : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type:ApiMethods.Post,
    url:  apisRootPath+version+"/"+name,

    execute: Search,
    onError: function (error: any): void {
        console.log(error);
    }
}

export default  SearchInventoryProduct 