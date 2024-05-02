import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async create(key:string, value:any){
    await Preferences.set({key,value})
  }
  async read(key:string){
    let data = await Preferences.get({key:key});
    return data;
  }
  async clearLocalData(){
    await Preferences.clear();
  }
  async checkIfKeyExist(key:string){
    let existing = await Preferences.keys();
    return existing.keys.includes(key);
  }

  async addNew(key:string, element:any){
    this.checkIfKeyExist(key).then(isKey =>{
      if(!isKey){
        if(!Array.isArray(element)){
          this.create(key, JSON.stringify([element]));
        }else{
          this.create(key, JSON.stringify(element));
        }
      }else{
        this.read(key).then(data =>{
          let elts = data.value ? [... JSON.parse(data.value)] : [];
          if(!Array.isArray(element)){
            elts.push(element);
          }else{
            elts.concat(element);
          }
          this.create(key, JSON.stringify(elts));
        });
      }
    })
  }

}
