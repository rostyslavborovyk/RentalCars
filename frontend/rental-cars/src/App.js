import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    function onClick() {
        console.log("Hello")
        fetch("http://localhost:5000/register", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            credentials: "include",
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //     'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            redirect: "follow",
            body: JSON.stringify({
                "first_name": "Bill",
                "last_name": "Clinton",
                "passport_number": "wa123",
                "password": "111111"
            })
        })
            .then((response) => {
                console.log(response)
            })
    }

    return (
        <div>
            <h1>Hello</h1>
            <button onClick={onClick}>Hello</button>
        </div>
    );
}

export default App;
