import {
  TnsOAuthClient,
  configureTnsOAuth,
  ITnsOAuthTokenResult
} from "nativescript-oauth2";
import {
  TnsOaProvider,
  TnsOaProviderOptionsFacebook,
  TnsOaProviderFacebook,
  TnsOaProviderOptionsGoogle,
  TnsOaProviderGoogle,
  TnsOaProviderOptionsMicrosoft,
  TnsOaProviderMicrosoft
} from "nativescript-oauth2/providers"; 

let client: TnsOAuthClient = null;

export function configureOAuthProviders() {
  const microsoftProvider = configureOAuthProviderMicrosoft();
  const googleProvider = configureOAuthProviderGoogle();
  const facebookProvider = configureOAuthProviderFacebook();

  configureTnsOAuth([microsoftProvider, googleProvider, facebookProvider]);
}

function configureOAuthProviderGoogle(): TnsOaProvider {
  const googleProviderOptions: TnsOaProviderOptionsGoogle = {
    openIdSupport: "oid-full",
    clientId:  
      "<paste your won>.apps.googleusercontent.com",
    redirectUri:
      "com.googleusercontent.apps.<paste your won>:/auth",
      urlScheme:
      "com.googleusercontent.apps.<paste your won>",
    scopes: ["email"] 
  };   
  const googleProvider = new TnsOaProviderGoogle(googleProviderOptions); 
  return googleProvider;
}

function configureOAuthProviderFacebook(): TnsOaProvider {
  const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
    openIdSupport: "oid-none",
    clientId: "<paste your won>",
    clientSecret: "<paste your won>",
    redirectUri: "https://webnexttechnology.com/f.php",
    scopes: ["email"]
  };
  const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
  return facebookProvider;
}

function configureOAuthProviderMicrosoft(): TnsOaProvider {
  const microsoftProviderOptions: TnsOaProviderOptionsMicrosoft = {
    openIdSupport: "oid-full",
    clientId: "f376fa87-64a9-49a1-8b56-e0d48fc0810b",
    // redirectUri: "urn:ietf:wg:oauth:2.0:oob",
    redirectUri: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b://auth",
    urlScheme: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b",
    scopes: ["https://outlook.office.com/mail.read"]
  };
  const microsoftProvider = new TnsOaProviderMicrosoft(
    microsoftProviderOptions
  );
  return microsoftProvider;
}

export function tnsOauthLogin(providerType) {
  client = new TnsOAuthClient(providerType);
     
  client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
 
    if (error) {
      console.error("back to main page with error: ");
      console.error(error);
    } else  {
       console.log("back to main page with access token: ");
//    console.log(tokenResult);
    if(providerType == "facebook"){ 
      var url = "https://graph.facebook.com/me?fields=email,id,name&access_token="+tokenResult["accessToken"];
     }else if (providerType == "google"){
      var url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+tokenResult["accessToken"];  
    }else if (providerType == "twitter"){
      var url = "https://api.twitter.com/oauth/authenticate?oauth_token="+tokenResult["accessToken"];  
    }

    fetch(url)
    .then((response) => response.text())
    .then((r) => {
    console.log(r);
    }).catch((e) => {
    });

    console.log("te------------->",tokenResult); 
}
    });
  }


export function tnsOauthLogout() {
  if (client) {
    client.logout();
  }
}
