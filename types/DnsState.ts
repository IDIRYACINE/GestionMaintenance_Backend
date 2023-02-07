

interface DnsState {
    registerNewIpAddress: () => Promise<void>;
}

interface IpCheckerResponse{
    ip: string;
}