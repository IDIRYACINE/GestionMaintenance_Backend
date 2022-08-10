import express from 'express';
import path from 'node:path';
import { getAllFiles } from './Utilities/FileLoader';
import { ApiTypes } from '../types/ApiInterface';
import { RegisterApiCallback } from '../types/FileLoader';

const app = express();
const port = 3000;


const eventsPath = path.join(process.cwd(), 'apis');

const registerApis : RegisterApiCallback = (api)=>{
	if (api.type === ApiTypes.Get) {
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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
})
