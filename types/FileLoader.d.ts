
    type SingleValueCallback = (value:any) => void
    
    /**
     * subdirectory names to execlude looking inside
     * @param {string} subdirectoryName 
     * @returns {boolean}
     */
     type IsDirectoryExecluded = (subdirectoryName:string) => boolean

    /**
     * @param {string} dirPath root directory to start looking for js files under it and it's subdirectories 
     * @param {(fileDefaultImport : object)=>void} callback function to be executed on the default import of the js file ,
     * the default import is passed as a param to the callback
     *  @returns {void}
    */
    type GetAllFilesRecusrsive = (dirPath : string, callback : SingleValueCallback) => void

    /**
     * @param {string} dirPath root directory to start looking for js files
     * @param {(fileDefaultImport : object)=>void} callback to be executed on the default import of the js file ,
     *  the default import is passed as a param to the callback
     * @returns {void}
     */
    type GetAllFiles = (dirPath : string, callback : SingleValueCallback) => void
