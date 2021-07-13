export default {
    closeVideo( elemId ) {
        if ( document.getElementById( elemId ) ) {
            document.getElementById( elemId ).remove();
            this.adjustVideoElemSize();
        }
    },

    pageHasFocus() {
        return !( document.hidden || document.onfocusout || window.onpagehide || window.onblur );
    },

    userMediaAvailable() {
        return !!( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
    },

    getUserFullMedia() {
        if ( this.userMediaAvailable() ) {
            return navigator.mediaDevices.getUserMedia( {
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            } );
        }

        else {
            throw new Error( 'User media not available' );
        }
    },

    getUserAudio() {
        if ( this.userMediaAvailable() ) {
            return navigator.mediaDevices.getUserMedia( {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            } );
        }

        else {
            throw new Error( 'User media not available' );
        }
    },

    shareScreen() {
        if ( this.userMediaAvailable() ) {
            return navigator.mediaDevices.getDisplayMedia( {
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            } );
        }

        else {
            throw new Error( 'User media not available' );
        }
    },

    getIceServer() {
        return {
            iceServers: [{
                urls: [ "URL" ]
             }, {
                username: "YOUR_USERNAME",
                credential: "YOUR_CREDENTIAL",
                urls: [
                    /* URLs */
                ]
             }]
        };
    },

    addChat( data, senderType ) {
        let chatMsgDiv = document.querySelector( '#chat-messages' );
        let contentAlign = 'justify-content-end';
        let senderName = 'You';
        let msgBg = 'bg-white';

        if ( senderType === 'remote' ) {
            contentAlign = 'justify-content-start';
            senderName = data.sender;
            msgBg = '';

            this.toggleChatNotificationBadge();
        }

        let infoDiv = document.createElement( 'div' );
        infoDiv.className = 'sender-info';
        infoDiv.innerHTML = `${ senderName } - ${ moment().format( 'hh:mm a')}`;

        let colDiv = document.createElement( 'div' );
        colDiv.className = `col-10 card chat-card msg ${ msgBg }`;
        colDiv.innerHTML = xssFilters.inHTMLData( data.msg ).autoLink( { target: "_blank", rel: "nofollow"});

        let rowDiv = document.createElement( 'div' );
        rowDiv.className = `row ${ contentAlign } mb-2`;


        colDiv.appendChild( infoDiv );
        rowDiv.appendChild( colDiv );

        chatMsgDiv.appendChild( rowDiv );

        /**
         * Move focus to the newly added message but only if:
         * 1. Page has focus
         * 2. User has not moved scrollbar upward. This is to prevent moving the scroll position if user is reading previous messages.
         */
        if ( this.pageHasFocus ) {
            rowDiv.scrollIntoView();
        }
    },

    toggleChatNotificationBadge() {
        if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
            document.querySelector( '#new-chat-notification' ).setAttribute( 'hidden', true );
        }

        else {
            document.querySelector( '#new-chat-notification' ).removeAttribute( 'hidden' );
        }
    },

    replaceTrack( stream, recipientPeer ) {
        let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find( s => s.track && s.track.kind === stream.kind ) : false;

        sender ? sender.replaceTrack( stream ) : '';
    },

    toggleShareIcons( share ) {
        let shareIconElem = document.querySelector( '#share-screen' );

        if ( share ) {
            console.log("Screen is being shared");
            shareIconElem.setAttribute( 'title', 'Stop sharing screen' );
            shareIconElem.children[0].classList.add( 'text-primary' );
            shareIconElem.children[0].classList.remove( 'text-white' );
        }

        else {
            console.log("Screen Sharing has been stopped.");
            shareIconElem.setAttribute( 'title', 'Share screen' );
            shareIconElem.children[0].classList.add( 'text-white' );
            shareIconElem.children[0].classList.remove( 'text-primary' );
        }
    },

    toggleVideoBtnDisabled( disabled ) {
        console.log("Video button disabled at time of Screen Sharing");
        document.getElementById( 'toggle-video' ).disabled = disabled;
    },

    maximiseStream( e ) {
        let elem = e.target.parentElement.previousElementSibling;

        elem.requestFullscreen() || elem.mozRequestFullScreen() || elem.webkitRequestFullscreen() || elem.msRequestFullscreen();
    },

    singleStreamToggleMute( e ) {
        if ( e.target.classList.contains( 'fa-microphone' ) ) {
            e.target.parentElement.previousElementSibling.muted = true;
            e.target.classList.add( 'fa-microphone-slash' );
            e.target.classList.remove( 'fa-microphone' );
        }

        else {
            e.target.parentElement.previousElementSibling.muted = false;
            e.target.classList.add( 'fa-microphone' );
            e.target.classList.remove( 'fa-microphone-slash' );
        }
    },

    singleStreamToggleVideo( e ) {
        if ( e.target.classList.contains( 'fa-video' ) ) {
            document.getElementById(e.target.parentElement.previousElementSibling.id).pause();
            e.target.classList.add( 'fa-video-slash' );
            e.target.classList.remove( 'fa-video' );
        }

        else {
            document.getElementById(e.target.parentElement.previousElementSibling.id).play();
            e.target.classList.add( 'fa-video' );
            e.target.classList.remove( 'fa-video-slash' );
        }
    },

    setLocalStream( stream, mirrorMode = true ) {
        const localVidElem = document.getElementById( 'local' );

        localVidElem.srcObject = stream;
        mirrorMode ? localVidElem.classList.add( 'mirror-mode' ) : localVidElem.classList.remove( 'mirror-mode' );
    },

    adjustVideoElemSize() {
        let elem = document.getElementsByClassName( 'card' );
        let totalRemoteVideosDesktop = elem.length;
        let newWidth = totalRemoteVideosDesktop <= 2 ? '38%' : (
            totalRemoteVideosDesktop == 3 ? '33.33%' : (
                totalRemoteVideosDesktop <= 8 ? '25%' : (
                    totalRemoteVideosDesktop <= 15 ? '20%' : (
                        totalRemoteVideosDesktop <= 18 ? '16%' : (
                            totalRemoteVideosDesktop <= 23 ? '15%' : (
                                totalRemoteVideosDesktop <= 32 ? '12%' : '10%'
                            )
                        )
                    )
                )
            )
        );


        for ( let i = 0; i < totalRemoteVideosDesktop; i++ ) {
            elem[i].style.width = newWidth;
        }
    },


    createDemoRemotes( str, total = 6 ) {
        let i = 0;

        let testInterval = setInterval( () => {
            let newVid = document.createElement( 'video' );
            newVid.id = `demo-${ i }-video`;
            newVid.srcObject = str;
            newVid.autoplay = true;
            newVid.className = 'remote-video';

            //video controls elements
            let controlDiv = document.createElement( 'div' );
            controlDiv.className = 'remote-video-controls';
            controlDiv.innerHTML = `<i class="fa fa-video text-white pr-3 toggle-remote-video" title="Hide Video">
                </i><i class="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
                <i class="fa fa-expand text-white expand-remote-video" title="Expand"></i>`;

            //create a new div for card
            let cardDiv = document.createElement( 'div' );
            cardDiv.className = 'card card-sm';
            cardDiv.id = `demo-${ i }`;
            cardDiv.appendChild( newVid );
            cardDiv.appendChild( controlDiv );

            //put div in main-section elem
            document.getElementById( 'videos' ).appendChild( cardDiv );

            this.adjustVideoElemSize();

            i++;

            if ( i == total ) {
                clearInterval( testInterval );
            }
        }, 2000 );
    }
};
