import { Injectable } from '@angular/core';
import { stock } from './stock'

@Injectable()
export class StockService {

  public stocks = [];
  public price = [];
  public past = [];
  constructor() { }

  getStocks(name)
  {
    for(let s of stock)
    {
      if(name==s.fname)
      return s.price; 
    }
    return null;
  }
  getImage(name)
  {
    for(let s of stock)
    {
      if(name==s.fname)
       return s.image; 
    }
    return null;
  }
  getName(name)
  {
    for(let s of stock)
    {
      if(name==s.fname)
       return s.name; 
    }
    return null;
  }
  getTime(name)
  {
    for(let s of stock)
    {
      if(name==s.fname)
       return s.time; 
    }
    return null;
  }
  getSymbol(name)
  {
    for(let s of stock)
    {
      if(name==s.fname)
       return s.symbol; 
    }
    return null;
  }

  addPast(name)
  {
    for(let s of stock)
    {
      if(name==s.fname)
       {
         let count = 0;
         for(let p of this.past)
         {
           if(name==p.fname)
           {
            this.past.splice(count,1);
           }
           count++;
         }
         this.past.splice(0,0,s);
       }
    }
    console.log(this.past);
  }
  getPast()
  {
    return this.past;
  }
  getWeekReport(name)
  {
 
    for(let s of stock)
    {
      if(name==s.fname)
       return s.weekReport; 
    }
    return null;
  }
  getStockId(id)
  {

    for(let s of stock)
    {
      if(id==s.id)
       return s; 
    }
    return null;
  }

  getPrice(id)
  {
    for(let s of stock)
    {
      if(id==s.id)
       return s.price; 
    }
    return null;
  }

}
