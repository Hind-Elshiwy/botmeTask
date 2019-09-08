import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private socket2 = io2('http://localhost:3000');
  private url = 'http://localhost:3000';
  private socket2;
  
  constructor() {
    this.socket2 = io(this.url);
  }
  sendMessage(data){
      // this.socket2.emit('message',data);
    this.socket2.emit('message', {senderid:data.senderid, message: data.message});

  }

  newMessageReceived(){
  //   return Observable.create((observer) => {
  //     this.socket2.on('new message',function(data){
  //       console.log(data.message+"##########################");
  //       //io.emit('new message', {user:data.user, message:data.message});
  //     })
  //   });
  // }
      let observable = new Observable<{senderid:Number,message:String}>(observer=>{

       
          this.socket2.on('new message', (data)=>{
              observer.next(data);
          });
          return () => {this.socket2.disconnect();}
      });

      return observable;
    }
  }

