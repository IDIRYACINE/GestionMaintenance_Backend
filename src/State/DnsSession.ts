/// <reference path= "../../types/DnsState.d.ts" />

import {dns_update_api,domain_name}  from '../../configs/Configs';
import dns from 'dns';

async function registerNewIpAddress() : Promise<void> {
    const newIpAddres = await currentIpAddress();

    if(checkIfIpAddressChanged(newIpAddres)){
        const url = `${dns_update_api}/${newIpAddres}`;
        fetch(url);
    }
   
}

async function  currentIpAddress() : Promise<string> {
    const ipCheckerService =  'https://api.myip.com';
    const ipResponse  =  await (await fetch(ipCheckerService,{
        method: 'GET',
    })).json() ;

    return ipResponse.ip;
}

async function checkIfIpAddressChanged(currentIpAddress:string) : Promise<boolean>{

    return new Promise<boolean>((resolve, reject) => {
        dns.lookup(domain_name, (err, address, family) => {
            if(err){
                console.log(err);
                resolve(false);
            }
            console.log(`Current Ip Address: ${currentIpAddress} , Domain Ip Address: ${address}`);
            resolve(currentIpAddress === address);
        });
    });
    
}


export const DnsState : DnsState = {
    registerNewIpAddress: registerNewIpAddress
}