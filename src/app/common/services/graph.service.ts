import { Injectable } from '@angular/core';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { AuthCodeMSALBrowserAuthenticationProvider, AuthCodeMSALBrowserAuthenticationProviderOptions } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { Client } from "@microsoft/microsoft-graph-client";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  account?: AccountInfo;
  client?: Client;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService
  ) {
    this.init();
  }

  async init() {
    await this.authService.instance.initialize();
    this.createMicrosoftGraphClient()
  }

  async createMicrosoftGraphClient() {
    const accounts = this.authService.instance.getAllAccounts();
    this.account = accounts[0] || undefined;
    if (this.account) {
      const options: AuthCodeMSALBrowserAuthenticationProviderOptions = {
        account: this.account, // the AccountInfo instance to acquire the token for.
        interactionType: InteractionType.Popup, // msal-browser InteractionType
        scopes: ["user.read", 'Files.Read.All'] // example of the scopes to be passed
      };

      // Pass the PublicClientApplication instance from step 2 to create AuthCodeMSALBrowserAuthenticationProvider instance
      const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(this.authService.instance as any, options);

      // Create a client instance
      this.client = Client.initWithMiddleware({
        authProvider
      });
    }
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.createMicrosoftGraphClient();
        });
    } else {
      this.authService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.createMicrosoftGraphClient();
        });
    }
  }

  logout() {
    this.authService.logout();
  }
}
