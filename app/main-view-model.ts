import { Observable } from "tns-core-modules/data/observable";

export class HelloWorldModel extends Observable {
  myText:string; 
  constructor() {
     super();
    this.myText = "helloword";
  }
}