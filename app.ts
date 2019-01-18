/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import * as application from "tns-core-modules/application";


// import * as tnsOAuthModule from "nativescript-oauth";
 
// //const client = new TnsOAuthClient(providerType);
 
// var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
//  clientId: "228943498016078",
// clientSecret: "62a779bebd2c16ad743450ed57daa97d",
//   scope: ["email"] //whatever other scopes you need
// };
 
// tnsOAuthModule.initFacebook(facebookInitOptions);
import { configureOAuthProviders } from "./auth-service";
configureOAuthProviders();

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
