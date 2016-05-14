# IRCDC

## Internet Relay Chat Docker Client

The goal of this project is to create a web based IRC (Internet Relay Chat) client that anyone with a Linux server can quickly spin up and configure. Configuration and setup will be done through [Docker Compose](https://docs.docker.com/compose/).

Based on [node-irc](https://github.com/martynsmith/node-irc) and [pg-promise]().

### Progress

- [ ] Standard Goals
  - [ ] ReactJS client
  - [ ] Docker Compose
  - [ ] HTTP API
  - [ ] Web Sockets
  - [ ] IRC Client Daemon

- [ ] Stretch goals
  - [ ] Port IRC Client Daemon to Elixir/Erlang
    - [ ] Enable Hot reloading to have little to no downtime
  - [ ] Android client

## FAQ

### How does IRCDC work

IRCDC is comprised of an: HTTP server, Websocket server and IRC client daemon. Any frontend can be written for IRCDC. The [official client](https://github.com/hekar/ircdc-react/) is written in ReactJS. Logs are currently written to a Postgres database.

### Will there be an Android app?

[ircdc-react](https://github.com/hekar/ircdc-react) will be responsive. Since the ircdc-react client is standalone, presumably any type of client could be written for ircdc.
