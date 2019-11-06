import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as offline from '../Offline.js';
declare var offline:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Registrations';
eventRecords : Observable<any[]>;
 
 constructor(private http: Http) {
 let classObj=this;
 
offline.init(function(){
if(offline.checkOfflineStatus()){
  offline.getAll(offline.constants.registerbook,function(result){

classObj.eventRecords = result;
  });
}else{
   http.get('http://localhost:8000/api/events')
        // Call map on the response observable to get the parsed people object
        .subscribe(res=>{
        if(res){     
          classObj.eventRecords = res.json();
          classObj.saveOffline(classObj.eventRecords);
         }
        });
        }

 });
}

   
  
  saveOffline(eventRecords:Observable<any[]>){
  	eventRecords.forEach(eventRecord =>{
  		offline.addData(offline.constants.registerbook,eventRecord,function(){
  			console.log("inserted"+eventRecord);
  		});
  	});
  }

}
