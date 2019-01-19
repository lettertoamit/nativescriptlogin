"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_oauth2_1 = require("nativescript-oauth2");
var providers_1 = require("nativescript-oauth2/providers");
var client = null;
function configureOAuthProviders() {
    var microsoftProvider = configureOAuthProviderMicrosoft();
    var googleProvider = configureOAuthProviderGoogle();
    var facebookProvider = configureOAuthProviderFacebook();
    nativescript_oauth2_1.configureTnsOAuth([microsoftProvider, googleProvider, facebookProvider]);
}
exports.configureOAuthProviders = configureOAuthProviders;
function configureOAuthProviderGoogle() {
    var googleProviderOptions = {
        openIdSupport: "oid-full",
        clientId: "<paste your won>.apps.googleusercontent.com",
        redirectUri: "com.googleusercontent.apps.<paste your won>:/auth",
        urlScheme: "com.googleusercontent.apps.<paste your won>",
        scopes: ["email"]
    };
    var googleProvider = new providers_1.TnsOaProviderGoogle(googleProviderOptions);
    return googleProvider;
}
function configureOAuthProviderFacebook() {
    var facebookProviderOptions = {
        openIdSupport: "oid-none",
        clientId: "228943498016078",
        clientSecret: "<paste your won>",
        redirectUri: "https://webnexttechnology.com/f.php",
        scopes: ["email"]
    };
    var facebookProvider = new providers_1.TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
}
function configureOAuthProviderMicrosoft() {
    var microsoftProviderOptions = {
        openIdSupport: "oid-full",
        clientId: "f376fa87-64a9-49a1-8b56-e0d48fc0810b",
        // redirectUri: "urn:ietf:wg:oauth:2.0:oob",
        redirectUri: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b://auth",
        urlScheme: "msalf376fa87-64a9-49a1-8b56-e0d48fc0810b",
        scopes: ["https://outlook.office.com/mail.read"]
    };
    var microsoftProvider = new providers_1.TnsOaProviderMicrosoft(microsoftProviderOptions);
    return microsoftProvider;
}
function tnsOauthLogin(providerType) {
    client = new nativescript_oauth2_1.TnsOAuthClient(providerType);
    client.loginWithCompletion(function (tokenResult, error) {
        if (error) {
            console.error("back to main page with error: ");
            console.error(error);
        }
        else {
            console.log("back to main page with access token: ");
            //    console.log(tokenResult);
            if (providerType == "facebook") {
                var url = "https://graph.facebook.com/me?fields=email,id,name&access_token=" + tokenResult["accessToken"];
            }
            else if (providerType == "google") {
                var url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + tokenResult["accessToken"];
            }
            else if (providerType == "twitter") {
                var url = "https://api.twitter.com/oauth/authenticate?oauth_token=" + tokenResult["accessToken"];
            }
            fetch(url)
                .then(function (response) { return response.text(); })
                .then(function (r) {
                console.log(r);
            }).catch(function (e) {
            });
            console.log("te------------->", tokenResult);
        }
    });
}
exports.tnsOauthLogin = tnsOauthLogin;
function tnsOauthLogout() {
    if (client) {
        client.logout();
    }
}
exports.tnsOauthLogout = tnsOauthLogout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBSTZCO0FBQzdCLDJEQVF1QztBQUV2QyxJQUFJLE1BQU0sR0FBbUIsSUFBSSxDQUFDO0FBRWxDLFNBQWdCLHVCQUF1QjtJQUNyQyxJQUFNLGlCQUFpQixHQUFHLCtCQUErQixFQUFFLENBQUM7SUFDNUQsSUFBTSxjQUFjLEdBQUcsNEJBQTRCLEVBQUUsQ0FBQztJQUN0RCxJQUFNLGdCQUFnQixHQUFHLDhCQUE4QixFQUFFLENBQUM7SUFFMUQsdUNBQWlCLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFORCwwREFNQztBQUVELFNBQVMsNEJBQTRCO0lBQ25DLElBQU0scUJBQXFCLEdBQStCO1FBQ3hELGFBQWEsRUFBRSxVQUFVO1FBQ3pCLFFBQVEsRUFDTiwwRUFBMEU7UUFDNUUsV0FBVyxFQUNULGdGQUFnRjtRQUNoRixTQUFTLEVBQ1QsMEVBQTBFO1FBQzVFLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNsQixDQUFDO0lBQ0YsSUFBTSxjQUFjLEdBQUcsSUFBSSwrQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3RFLE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxTQUFTLDhCQUE4QjtJQUNyQyxJQUFNLHVCQUF1QixHQUFpQztRQUM1RCxhQUFhLEVBQUUsVUFBVTtRQUN6QixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFlBQVksRUFBRSxrQ0FBa0M7UUFDaEQsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDbEIsQ0FBQztJQUNGLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxpQ0FBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVFLE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsK0JBQStCO0lBQ3RDLElBQU0sd0JBQXdCLEdBQWtDO1FBQzlELGFBQWEsRUFBRSxVQUFVO1FBQ3pCLFFBQVEsRUFBRSxzQ0FBc0M7UUFDaEQsNENBQTRDO1FBQzVDLFdBQVcsRUFBRSxpREFBaUQ7UUFDOUQsU0FBUyxFQUFFLDBDQUEwQztRQUNyRCxNQUFNLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztLQUNqRCxDQUFDO0lBQ0YsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLGtDQUFzQixDQUNsRCx3QkFBd0IsQ0FDekIsQ0FBQztJQUNGLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxZQUFZO0lBQ3hDLE1BQU0sR0FBRyxJQUFJLG9DQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFMUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFVBQUMsV0FBaUMsRUFBRSxLQUFLO1FBRWxFLElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7YUFBTztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUM1RCwrQkFBK0I7WUFDM0IsSUFBRyxZQUFZLElBQUksVUFBVSxFQUFDO2dCQUM1QixJQUFJLEdBQUcsR0FBRyxrRUFBa0UsR0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDeEc7aUJBQUssSUFBSSxZQUFZLElBQUksUUFBUSxFQUFDO2dCQUNsQyxJQUFJLEdBQUcsR0FBRyw2REFBNkQsR0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDcEc7aUJBQUssSUFBSSxZQUFZLElBQUksU0FBUyxFQUFDO2dCQUNsQyxJQUFJLEdBQUcsR0FBRyx5REFBeUQsR0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDaEc7WUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNULElBQUksQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQ25DLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsV0FBVyxDQUFDLENBQUM7U0FDL0M7SUFDRyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3Qkgsc0NBNkJHO0FBR0gsU0FBZ0IsY0FBYztJQUM1QixJQUFJLE1BQU0sRUFBRTtRQUNWLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFKRCx3Q0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFRuc09BdXRoQ2xpZW50LFxuICBjb25maWd1cmVUbnNPQXV0aCxcbiAgSVRuc09BdXRoVG9rZW5SZXN1bHRcbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vYXV0aDJcIjtcbmltcG9ydCB7XG4gIFRuc09hUHJvdmlkZXIsXG4gIFRuc09hUHJvdmlkZXJPcHRpb25zRmFjZWJvb2ssXG4gIFRuc09hUHJvdmlkZXJGYWNlYm9vayxcbiAgVG5zT2FQcm92aWRlck9wdGlvbnNHb29nbGUsXG4gIFRuc09hUHJvdmlkZXJHb29nbGUsXG4gIFRuc09hUHJvdmlkZXJPcHRpb25zTWljcm9zb2Z0LFxuICBUbnNPYVByb3ZpZGVyTWljcm9zb2Z0XG59IGZyb20gXCJuYXRpdmVzY3JpcHQtb2F1dGgyL3Byb3ZpZGVyc1wiOyBcblxubGV0IGNsaWVudDogVG5zT0F1dGhDbGllbnQgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlT0F1dGhQcm92aWRlcnMoKSB7XG4gIGNvbnN0IG1pY3Jvc29mdFByb3ZpZGVyID0gY29uZmlndXJlT0F1dGhQcm92aWRlck1pY3Jvc29mdCgpO1xuICBjb25zdCBnb29nbGVQcm92aWRlciA9IGNvbmZpZ3VyZU9BdXRoUHJvdmlkZXJHb29nbGUoKTtcbiAgY29uc3QgZmFjZWJvb2tQcm92aWRlciA9IGNvbmZpZ3VyZU9BdXRoUHJvdmlkZXJGYWNlYm9vaygpO1xuXG4gIGNvbmZpZ3VyZVRuc09BdXRoKFttaWNyb3NvZnRQcm92aWRlciwgZ29vZ2xlUHJvdmlkZXIsIGZhY2Vib29rUHJvdmlkZXJdKTtcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlT0F1dGhQcm92aWRlckdvb2dsZSgpOiBUbnNPYVByb3ZpZGVyIHtcbiAgY29uc3QgZ29vZ2xlUHJvdmlkZXJPcHRpb25zOiBUbnNPYVByb3ZpZGVyT3B0aW9uc0dvb2dsZSA9IHtcbiAgICBvcGVuSWRTdXBwb3J0OiBcIm9pZC1mdWxsXCIsXG4gICAgY2xpZW50SWQ6ICBcbiAgICAgIFwiMzM0Njg5ODU4MjM5LXM5dms2MXBmdnRwYzk4Nzd2YzJpbGJiM3RxazEyYWxkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIsXG4gICAgcmVkaXJlY3RVcmk6XG4gICAgICBcImNvbS5nb29nbGV1c2VyY29udGVudC5hcHBzLjMzNDY4OTg1ODIzOS1zOXZrNjFwZnZ0cGM5ODc3dmMyaWxiYjN0cWsxMmFsZDovYXV0aFwiLFxuICAgICAgdXJsU2NoZW1lOlxuICAgICAgXCJjb20uZ29vZ2xldXNlcmNvbnRlbnQuYXBwcy4zMzQ2ODk4NTgyMzktczl2azYxcGZ2dHBjOTg3N3ZjMmlsYmIzdHFrMTJhbGRcIixcbiAgICBzY29wZXM6IFtcImVtYWlsXCJdIFxuICB9OyAgIFxuICBjb25zdCBnb29nbGVQcm92aWRlciA9IG5ldyBUbnNPYVByb3ZpZGVyR29vZ2xlKGdvb2dsZVByb3ZpZGVyT3B0aW9ucyk7IFxuICByZXR1cm4gZ29vZ2xlUHJvdmlkZXI7XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZU9BdXRoUHJvdmlkZXJGYWNlYm9vaygpOiBUbnNPYVByb3ZpZGVyIHtcbiAgY29uc3QgZmFjZWJvb2tQcm92aWRlck9wdGlvbnM6IFRuc09hUHJvdmlkZXJPcHRpb25zRmFjZWJvb2sgPSB7XG4gICAgb3BlbklkU3VwcG9ydDogXCJvaWQtbm9uZVwiLFxuICAgIGNsaWVudElkOiBcIjIyODk0MzQ5ODAxNjA3OFwiLFxuICAgIGNsaWVudFNlY3JldDogXCI2MmE3NzliZWJkMmMxNmFkNzQzNDUwZWQ1N2RhYTk3ZFwiLFxuICAgIHJlZGlyZWN0VXJpOiBcImh0dHBzOi8vd2VibmV4dHRlY2hub2xvZ3kuY29tL2YucGhwXCIsXG4gICAgc2NvcGVzOiBbXCJlbWFpbFwiXVxuICB9O1xuICBjb25zdCBmYWNlYm9va1Byb3ZpZGVyID0gbmV3IFRuc09hUHJvdmlkZXJGYWNlYm9vayhmYWNlYm9va1Byb3ZpZGVyT3B0aW9ucyk7XG4gIHJldHVybiBmYWNlYm9va1Byb3ZpZGVyO1xufVxuXG5mdW5jdGlvbiBjb25maWd1cmVPQXV0aFByb3ZpZGVyTWljcm9zb2Z0KCk6IFRuc09hUHJvdmlkZXIge1xuICBjb25zdCBtaWNyb3NvZnRQcm92aWRlck9wdGlvbnM6IFRuc09hUHJvdmlkZXJPcHRpb25zTWljcm9zb2Z0ID0ge1xuICAgIG9wZW5JZFN1cHBvcnQ6IFwib2lkLWZ1bGxcIixcbiAgICBjbGllbnRJZDogXCJmMzc2ZmE4Ny02NGE5LTQ5YTEtOGI1Ni1lMGQ0OGZjMDgxMGJcIixcbiAgICAvLyByZWRpcmVjdFVyaTogXCJ1cm46aWV0Zjp3ZzpvYXV0aDoyLjA6b29iXCIsXG4gICAgcmVkaXJlY3RVcmk6IFwibXNhbGYzNzZmYTg3LTY0YTktNDlhMS04YjU2LWUwZDQ4ZmMwODEwYjovL2F1dGhcIixcbiAgICB1cmxTY2hlbWU6IFwibXNhbGYzNzZmYTg3LTY0YTktNDlhMS04YjU2LWUwZDQ4ZmMwODEwYlwiLFxuICAgIHNjb3BlczogW1wiaHR0cHM6Ly9vdXRsb29rLm9mZmljZS5jb20vbWFpbC5yZWFkXCJdXG4gIH07XG4gIGNvbnN0IG1pY3Jvc29mdFByb3ZpZGVyID0gbmV3IFRuc09hUHJvdmlkZXJNaWNyb3NvZnQoXG4gICAgbWljcm9zb2Z0UHJvdmlkZXJPcHRpb25zXG4gICk7XG4gIHJldHVybiBtaWNyb3NvZnRQcm92aWRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRuc09hdXRoTG9naW4ocHJvdmlkZXJUeXBlKSB7XG4gIGNsaWVudCA9IG5ldyBUbnNPQXV0aENsaWVudChwcm92aWRlclR5cGUpO1xuICAgICBcbiAgY2xpZW50LmxvZ2luV2l0aENvbXBsZXRpb24oKHRva2VuUmVzdWx0OiBJVG5zT0F1dGhUb2tlblJlc3VsdCwgZXJyb3IpID0+IHtcbiBcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJiYWNrIHRvIG1haW4gcGFnZSB3aXRoIGVycm9yOiBcIik7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGVsc2UgIHtcbiAgICAgICBjb25zb2xlLmxvZyhcImJhY2sgdG8gbWFpbiBwYWdlIHdpdGggYWNjZXNzIHRva2VuOiBcIik7XG4vLyAgICBjb25zb2xlLmxvZyh0b2tlblJlc3VsdCk7XG4gICAgaWYocHJvdmlkZXJUeXBlID09IFwiZmFjZWJvb2tcIil7IFxuICAgICAgdmFyIHVybCA9IFwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vbWU/ZmllbGRzPWVtYWlsLGlkLG5hbWUmYWNjZXNzX3Rva2VuPVwiK3Rva2VuUmVzdWx0W1wiYWNjZXNzVG9rZW5cIl07XG4gICAgIH1lbHNlIGlmIChwcm92aWRlclR5cGUgPT0gXCJnb29nbGVcIil7XG4gICAgICB2YXIgdXJsID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm8/YWNjZXNzX3Rva2VuPVwiK3Rva2VuUmVzdWx0W1wiYWNjZXNzVG9rZW5cIl07ICBcbiAgICB9ZWxzZSBpZiAocHJvdmlkZXJUeXBlID09IFwidHdpdHRlclwiKXtcbiAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL29hdXRoL2F1dGhlbnRpY2F0ZT9vYXV0aF90b2tlbj1cIit0b2tlblJlc3VsdFtcImFjY2Vzc1Rva2VuXCJdOyAgXG4gICAgfVxuXG4gICAgZmV0Y2godXJsKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgIC50aGVuKChyKSA9PiB7XG4gICAgY29uc29sZS5sb2cocik7XG4gICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKFwidGUtLS0tLS0tLS0tLS0tPlwiLHRva2VuUmVzdWx0KTsgXG59XG4gICAgfSk7XG4gIH1cblxuXG5leHBvcnQgZnVuY3Rpb24gdG5zT2F1dGhMb2dvdXQoKSB7XG4gIGlmIChjbGllbnQpIHtcbiAgICBjbGllbnQubG9nb3V0KCk7XG4gIH1cbn0iXX0=
