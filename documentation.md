# Outline

This project has been made as a part of Microsoft Engage 2021 program as an individual contributor and using Agile Methodology. It has been deployed on https://letschat-engage.herokuapp.com/ , and uses open source resources like WebRTC, socket.io and OAuth. It aims to develop Microsoft Teams Clone with a minimum feature to connect two participants for video calling. The solution could be either a webapp or a mobile based application. In the ‘Adapt’ phase, it was disclosed that we need to include a Chat feature in our clone.

# Agile Methodology

We were given a timeline of four weeks which I divided into four sprints and managed using Azure Devops:
- Sprint 1:
    - Design
    - Research
    - Learn
- Sprint 2:
    - Landing Page
    - Authentication
    - Homescreen
    - Room Id generation
- Sprint 3:
    - Video Conferencing
    - Enable/Disable Audio,Video
    - Screen Share
    - Remote Video Controls
    - Ending Page
- Sprint 4:
    - Chat Feature
    - Invite by Email
    - UI Improvement
    - Demo and documentation

# Overview

## Features

- Authentication
    - Sign In using Google passport, that is, OAuth2.0
    - Single user can join multiple times if he/she needs to do so. 
- Video Conferencing Rooms
    - User can create a new Chat room by clicking the ‘Create Room’ button.
    - User can share the Room Id to new users to join in.
    - Chat Rooms have the functionality to mute/unmute yourself or enable/disable your video stream.
- Remote Video Controls
    - Users are provided with three remote video functionalities:
        - Users can mute/unmute a particular participant remotely.
        - Users can enable/disable a particular participant’s video.
        - Users can expand a particular participant’s video to full screen.
- Screen Share
    - Participants can share their:
        - Entire Screen
        - A particular browser tab
        - Any specific app window
    - Users have the option to share their screens’ audio in case they want to.
    - Participants have the option to expand any person’s shared screen.
- Invite Participants
    - User can invite other participants by entering their email id, and the app will send them a default invite email, or,
    - User can copy the room Id to invite participants by any other application.
- Chat Feature
    - A chat feature wherein you can share messages and links.
    - Your message is sent to all the users along with your name and the time at which the message was sent.
    - In case you share links, they are automatically detected.
    - You are notified whenever there is a new chat pending to be seen.

## APIs and Services

- Authentication: Google Passport, OAuth2.0
- VideoCall and Chat: WebRTC, Socket.io
- Invite by email: SMTP
- Connections: TURN-STUN ice servers by Xirsys

## User Experience

1. As the users open the web page, they are displayed a simple landing page, which has a button to redirect them to the google authentication, which is a must to use the app.
2. If authentication fails, the user is displayed an error screen which asks them to try again.
3. After successful authentication, users are directed to home screen which has two options:
    -The user can either create a new room, or
    -The user can enter the room Id and enter an existing room
    Both of these direct the user to the Video Conferencing room.
4. The Video Chat displays the user's local video at the bottom left corner, has a bar at the top which has 6 buttons which are for video on/off, audio on/off, screen share, invite user(either by email or by copying room id), chat panel and leave room, respectively.
5. When the chat button is clicked, the chat panel appears on the right side of the screen wherein participants can live chat with each other.
6. When users hover over other participants’ video stream, they are displayed three buttons, which are for remote video on/off, remote audio on/off, and expand remote video respectively.
7. When the user clicks the leave room button, they land upon the ending page which displays them three options to either rejoin the meeting, go to the homepage or to logout and go to the landing page.

# Resources Used

Link to resources and APIs used:

- https://webrtc.org/getting-started/peer-connections
- https://socket.io/docs/v4
- http://www.passportjs.org/packages/passport-google-oauth20/
- https://www.npmjs.com/package/serve-favicon
- https://xirsys.com/
- https://smtpjs.com/
- https://fontawesome.com/v5.15/icons
- https://getbootstrap.com/
- https://github.com/bryanwoods/autolink-js