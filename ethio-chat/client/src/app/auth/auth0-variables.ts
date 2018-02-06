// https://manage.auth0.com/#/clients/cDJlPPaVj23AkRKFJJ8P3MYjG9ZVjKz4/quickstart

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'cDJlPPaVj23AkRKFJJ8P3MYjG9ZVjKz4',
  domain: 'ethiochat.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
