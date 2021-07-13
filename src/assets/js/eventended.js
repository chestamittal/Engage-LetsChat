window.addEventListener( 'load', () => {
    
    //When the 'Return button' button is clicked.
    document.getElementById('return-button').addEventListener('click', (e)=>{
        e.preventDefault();
        
            sessionStorage.removeItem('room');
            location.replace('/good');
    });
    
    //When the 'Logout button' button is clicked.
    document.getElementById('logout-button').addEventListener('click', (e)=>{
        e.preventDefault();
        
            sessionStorage.removeItem('room');
            location.replace('/logout');
    });
} );
