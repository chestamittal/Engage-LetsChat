import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
            console.log("Chat panel has been hidden");
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
            console.log("Chat panel has been shown");
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );


    //When the 'Leave room" is button is clicked
    document.getElementById('leave-room').addEventListener('click', (e)=>{
        e.preventDefault();

        console.log("leave-room clicked");
        location.replace('/ended');
    });


    //When the 'Create room" is button is clicked
    document.getElementById('create-room').addEventListener('click', (e)=>{
        e.preventDefault();

        console.log("create-room clicked");
        let roomName = Math.random().toString(36).slice(2).substring(0, 15);
        console.log(roomName);
        let yourName = document.querySelector('#your-name').value;
        console.log(roomName);

        if(roomName && yourName){
            //save the user's name in sessionStorage
            sessionStorage.setItem('username', yourName);
            sessionStorage.setItem('room', roomName);
            location.reload();
        }
    });

    //When the 'Enter room' button is clicked.
    document.getElementById('enter-room').addEventListener('click', (e)=>{
        e.preventDefault();

        console.log("enter-room-clicked");
        let yourName = document.querySelector('#username').value;
        let roomName = document.querySelector('#room-name').value;
        
        if(roomName){

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', yourName);
            sessionStorage.setItem('room', roomName);

            //reload room
            location.reload();
        }
    });


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            console.log("expand-remote-video");
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            console.log("toggle-remote-mic");
            helpers.singleStreamToggleMute( e );
        }

        else if ( e.target && e.target.classList.contains( 'toggle-remote-video' ) ) {
            console.log("toggle-remote-video");
            helpers.singleStreamToggleVideo( e );
        }
    } );

    //Function to copy Room Id to clipboard
    function copyToClipboard(elementId) {
        var aux = document.createElement("input");
        aux.setAttribute("value", elementId);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        console.log("Room Id Copied");
    }

    document.getElementById( 'copy-button' ).addEventListener( 'click', () => {
        console.log("Copy button clicked");
        const room = sessionStorage.getItem('room');
        copyToClipboard(room);
        document.getElementById('inviteModal').style.display='none';
        window.alert("Room Id copied");
    } );
} );
