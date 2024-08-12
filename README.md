# task-paf-technical-trainee
## Full-stack Web Application  
## [Demo](https://task-paf-technical-trainee.deno.dev)  

Double login (Google, X/Twitter) + manage collected data using the admin panel.  

## Description 

### Frontend technology stack:
- JavaScript([Vue3](https://vuejs.org)) self-hosted script `vue.esm-browser.prod.js` used to improve UI/UX experience.  

### Backend technology stack:
- TypeScript([Deno](https://github.com/denoland/deno)) based web application.  
- Deno(runtime) + [Hono(framework)](https://github.com/honojs/hono) + [Eta(template render engine)](https://github.com/eta-dev/eta) based.  
- [OAuth2(Open Authorization)](https://oauth.net/2/) implemented for [Google](https://accounts.google.com/) and [X/Twitter](https://twitter.com) accounts, using [deno_vk_oauth](https://github.com/denoland/deno_kv_oauth).  
- common user can edit personal data record.  
- admin panel used to manage data records collected from users.  
- built-in [Deno KV](https://docs.deno.com/deploy/kv/manual/#deno-kv) used to manage database stuff.  
- [deno deploy](https://deno.com/deploy) hosted.  
- `admin access` granted using deno deploy `environment variables` in production, and `.env` file in development process.  
The `.env` file example:  
```properties
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=

GOOGLE_OAUTH_CONFIG_REDIRECT_URI=http://localhost:8000/callback-google
X_OAUTH_CONFIG_REDIRECT_URI=http://localhost:8000/callback-x

ADMIN_IDS=idfromappscreen,anotheradmin,commaseparated
CSRF_ORIGIN=http://localhost:8000
```
- for deno deploy, the `CSRF_ORIGIN` and the `*_CONFIG_REDIRECT_URI` prefix `http://localhost:8000` should be replaced to used domain.  
- to get `*_CLENT_ID` and `*_CLIENT_SECRET` first configure `OAuth2` for `Google` and `X/Twitter` accounts where you registered.  
- at the moment (2024) the solutions used have free plans.  
- `ADMIN_IDS` displayed in profile after login, and provided by `OAuth2 API`. So, first login without admin rights, then get id, finally add id into `.env` or deploy environment variable.  

## Requirements 

- configured [Deno](https://github.com/denoland/deno).  
- correct `.env` file(otherwise OAuth2 will fail).  

Developed on linux.  

## Usage  

- clone the repo  
- create and fill `.env` file in repo root folder(README.md file level).  
- terminal: `deno task bang` to run locally.  

For details discover the `deno.json` file.  
