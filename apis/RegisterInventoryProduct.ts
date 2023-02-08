/// <reference path="../types/ApiInterface.d.ts" />
/// <reference path="../types/ApiRequestModels.d.ts" />

import { Request, Response } from "express"
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { database } from "../src/Databases/Database";
import {AuthWrapperAction} from "../src/Utilities/AuthWrapper";

const name = ApisEnum.registerInventoryProduct;
const version = 0;
const description = "register inventory product";

function registerInventoryProduct(req: Request, res: Response): void {

    AuthWrapperAction(req, res, (req: Request, res: Response) => {
        const inventoryProduct = req.body as RegisterInventoryProductRequest;
        database.registerInventoryProduct(inventoryProduct.product).then(() => {
            res.json({ success: true });
        });
    });
    
}

const RegisterInventoryProduct : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type:ApiMethods.Post,
    url:  apisRootPath+version+"/"+name,

    execute: registerInventoryProduct,
    onError: function (error: any): void {
        console.log(error);
    }
}

export default  RegisterInventoryProduct 