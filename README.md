# Microsoft Engage 2021

## Teams Clone: LetsChat

A webapp for video conferencing using WebRTC, Socket.io and NodeJS.
It has been deployed on http://letschat-engage.herokuapp.com/ 

### Design Documentation

https://github.com/chestamittal/Engage-LetsChat/blob/master/documentation.md

### Before you Start

To run the code on your machine, you need to:

- enter your OAuth credentials in src/passport-setup.js , 
- enter username and password for sender in sendEmail() function in src/index.html ,
- Create a Xirsys account and enter their server details in getIceServer() function in src/assets/js/helpers.js .

### Getting Started

Run the following commands to get started

```
git clone https://github.com/chestamittal/Engage-LetsChat.git
npm ci
cd src
node app.js
```

## Features

- Multi-participants
- OAuth authentication
- Toggling of video stream
- Toggling of audio stream (mute & unmute)
- Screen sharing
- Invite by Email
- Text chat
- Detect link in Chat
- Mute individual participant
- Expand participants' stream
- Pause participants' video

# Screenshots

## Landing Page, Authentication and Homescreen

<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/LandingPage.png"/>
<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/Authentication.png"/>
<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/HomePage.png"/>

## Features

<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/ScreenShare.png"/>
<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/RemoteVideoControls.png"/>
<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/InvitePeople.png"/>

## 1:1 and Multiuser

<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/1on1.png"/>
<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/MultiUser.png"/>

## Ending Page

<img height = 300 src="https://github.com/chestamittal/Engage-LetsChat/blob/master/screenshots/EndedPage.png"/>