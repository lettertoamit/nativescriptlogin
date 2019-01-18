import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { HelloWorldModel } from "./main-view-model";
import { tnsOauthLogin, tnsOauthLogout } from "./auth-service";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get

let page: Page;

export function navigatingTo(args: EventData) {
  page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function onLoginTap() {
  tnsOauthLogin("facebook");
}
export function onLoginTapg() {
  tnsOauthLogin("google");
}
export function onLoginTapTwit() {
	console.log(geolocation.enableLocationRequest());
	var a = geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
;
a.then( return_a => {
console.log(return_a);
//distance(return_a,);
var degree = angleFromCoordinate(return_a.latitude,return_a.longitude , 21.4225,39.8262);
page.bindingContext.myText = degree;
console.log(degree);

//var myLabel = page.getViewById("myLabel");
   // myLabel.text = "Hello World";
});


  //tnsOauthLogin("twitter");  
}


export function onLogoutTap() {
  tnsOauthLogout();
}

function angleFromCoordinate( lat1,  long1,  lat2, long2) {

    var dLon = (long2 - long1);

    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
            * Math.cos(lat2) * Math.cos(dLon);

    var brng = Math.atan2(y, x);

    brng = brng * 180 / Math.PI;
    brng = (brng + 360) % 360;
    brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

    return brng;
}

