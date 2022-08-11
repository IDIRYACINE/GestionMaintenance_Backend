/// <reference path="../types/ApiInterface.ts" />


import express from 'express';
import path from 'node:path';
import cors from 'cors'
import { getAllFiles } from './Utilities/FileLoader';
import { AllowedHeaders, AllowedMethods, ApiMethods, testDatabaseConnection } from '../configs/Configs';
import { MariaDb } from './Databases/MariaDb/MariaDb';

const app = express();
const port = 3000;


app.use(cors({
  origin :"*",
  allowedHeaders :AllowedHeaders,
  methods : AllowedMethods
}))

const eventsPath = path.join(process.cwd(), 'apis');

const registerApis : RegisterApiCallback = (api)=>{
	if (api.type === ApiMethods.Get) {
    app.get(api.url, (req, res) => {
        api.execute(req, res);
    })
  }
	else {
		app.post(api.url, (req, res) => {
      api.execute(req, res);
  })
  } 
}

getAllFiles(eventsPath,registerApis)

MariaDb.connect(testDatabaseConnection);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
})
