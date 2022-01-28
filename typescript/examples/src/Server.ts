
interface IServer{
  startServer():void,
  stopServer():void
}

class BaseServer implements IServer{
  private port:number;
  private address:string;
  constructor(port:number, address:string){
    this.port = port;
    this.address = address;
  }
  startServer(){
    console.log(`Starting server at ${this.address}: ${this.port}`)
  }
  stopServer(){
    console.log('this is stop server base method');
  }
}

class DbServer extends BaseServer{
  
  constructor(port: number, address:string){
    super(port, address);
    console.log('calling db server constructor', port, address);
  }
}

const someServer:IServer = new DbServer(80, 'localhost');
// someServer.startServer();

const somePort = (someServer as any).port;
// console.log('somePort', someServer.port);
console.log('somePort', somePort);