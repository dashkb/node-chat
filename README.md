# Node Seminar - Chat

In this session, we'll introduce Node.JS and use it to build
a simple chat server that we'll access with netcat/nc or telnet.

Node's primary use case is scalable network applications. All I/O, by default,
is asynchronous; so it's able to handle a huge amount of connected clients,
provided most of them are mostly quiet most of the time, so it's perfect
for chat servers.

#### Install Node

Let's all help each other get the latest version of Node.JS (7.10.0) installed.

If this is your first experience with Node, or you don't have a preferred method
of installing it (there are many ways), head to https://nodejs.org and download
the latest distribution for your OS.  (There's an installer for Mac and Windows, and
a tarball of binaries for Linux)

If you'd prefer not to install Node, but have Docker, you can use the provided Dockerfiles
to run things. You can use the `run-in-docker` script for
convenience.

#### Client

Make sure you have one of `netcat`, `nc`, or `telnet` available at
the command line.

#### Chat Server

* Start with a simple tcp server, connect and disconnect with nc
* Add `Client` class and keep track of connected clients
* Log client messages in server
* Broadcast client messages to all conected clients
  * Except the client that sent it
* Broadcast connect/disconnect messages

#### TUI Client

A nicer chatting interface than netcat. A starting point (including the UI)
has been provided in `client.js`

#### Bot

An automated chat client with programmed responses. Add scripting
support to the TUI client, or extract a client library and use
it to make a headless client.

#### Bonus

* Add slash commands
  * `/me` for third person / "action"
* Add channels
* Use Express to add an HTTP api to the chat server
  * Enable posting messages as a user
  * Enable searching messages
