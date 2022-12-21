/// <reference path="../types/ApiInterface.ts" />

import { database } from "../src/Databases/Database";
import { Request, Response } from "express";
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { HttpStatus } from "../configs/SpecialEnums";

const name = ApisEnum.fetchActiveSessionRecords;
const version = 0;
const description = "fetch active session records";

const fetchSessionRecords = (req: Request, res: Response) : void => {

    database.fetchActiveSessionRecords().then(records =>{
        
        if(records != undefined || records.length > 0){
            res.status(HttpStatus.success)

            const json : ActiveSessionRecordsRespone = {
                records: records
            }

            res.json(json)
            return;
        }
        
    })

}

const FetchActiveSessionRecords : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type: ApiMethods.Get,
    url: apisRootPath + version + "/" + name,
    onError: function (error: any): void {
        console.log(error);
    },
    execute: fetchSessionRecords
}

export default FetchActiveSessionRecords;