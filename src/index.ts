/// <reference path="../types/ApiInterface.ts" />


import express from 'express';
import path from 'node:path';
import cors from 'cors'
import bodyParser from 'body-parser';

import { getAllFiles } from './Utilities/FileLoader';
import { AllowedHeaders, AllowedMethods, ApiMethods, testDatabaseConnection } from '../configs/Configs';
import { MariaDb } from './Databases/MariaDb/MariaDb';
import { websocketManager } from './WebSocketManager/WebSocketManager';


const app = express();

app.use(bodyParser.json());

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

app.post('/api/testPost', (req, res) => {
  console.log(req.body)
  console.log(req.headers)
  res.send(req.body)
})

getAllFiles(eventsPath,registerApis)

MariaDb.connect(testDatabaseConnection);

const httpServer = app.listen(process.env.PORT || 3050)

websocketManager.createSocket(httpServer);

