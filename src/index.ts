/// <reference path="../types/ApiInterface.d.ts" />


import express from 'express';
import path from 'node:path';
import cors from 'cors'
import bodyParser from 'body-parser';

import { getAllFiles } from './Utilities/FileLoader';
import { AllowedHeaders, AllowedMethods, ApiMethods, testDatabaseConnection } from '../configs/Configs';
import { MariaDb } from './Databases/MariaDb/MariaDb';
import { websocketManager } from './WebSocketManager/WebSocketManager';
import { ActiveSession } from './State/ActiveSession';
import { DnsState } from './State/DnsSession';


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
      console.log("get")
        api.execute(req, res);
    })
  }
	else {
		app.post(api.url, (req, res) => {
      console.log("get")

      api.execute(req, res);
  })
  } 
}

app.get('/test', (req, res) => {
  console.log("test")
  res.send("test")
})

DnsState.registerNewIpAddress();

getAllFiles(eventsPath,registerApis)

MariaDb.connect(testDatabaseConnection).then(_ => ActiveSession.notifySessionIdChange())

const httpServer = app.listen(3050,()=>{});

websocketManager.createSocket(httpServer);

