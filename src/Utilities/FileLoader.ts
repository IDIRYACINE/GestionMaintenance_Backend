/// <reference path="../../types/FileLoader.ts" />

import {readdirSync} from 'node:fs';

const isDirectoryExecluded :IsDirectoryExecluded = (subdirectoryName)=>{
    const isExcluded = excludedSubDirectories[subdirectoryName] != undefined
    return isExcluded
}

const excludedSubDirectories = {}

export const getAllFilesRecusrsive : GetAllFilesRecusrsive = async (dirPath, callback) => {
	const subdirectories = readdirSync(dirPath)
    let files = []

    subdirectories.forEach(
        (dir)=> {
            if(!isDirectoryExecluded(dir)){
                const filePath = `${dirPath}/${dir}`
                const subFiles = readdirSync(filePath).map((file)=>  {return `${filePath}/${file}`})
                files = files.concat(subFiles)
            }
        }
    )
    
    for (let file of files) {
        let content = (await import(file)).default;
        callback(content)
    }
    
}

export const  getAllFiles : GetAllFiles = async (dirPath, callback) =>{
	const files = readdirSync(dirPath).filter(file => file.endsWith(".ts"));
    for (let file of files) {
        const content = (await import(`${dirPath}/${file}`)).default;
        callback(content) 
    }
    
}