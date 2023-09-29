# api.hideo54.com

## Publicly Available APIs

Running on a single container on Cloud Run, which is maintained publicly in this repository.

Each endpoint is basically `https://api.hideo54.com/:appname/:something`.

## Private Use

Each app is running on Cloud Functions and is maintained in private repository. The main app, which is managed in this repository, plays a role of proxy.

Each endpoint is basically `https://api.hideo54.com/private/:appname/:something`.
