//variables
const listaTweets = document.getElementById('lista-tweets');


//event listeners

eventListeners();

function eventListeners() {

    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //borrar tweets
    listaTweets.addEventListener('click', borrarTweets);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//funciones

//añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText ='x';

    //crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);
    // añadir a local Storage
    agregarTweetLocalStorage(tweet);
}

//eliminar el tweet del DOM
function borrarTweets(e) {
    e.preventDefault();
    if(e.target.className ==='borrar-tweet') {
        e.target.parentElement.remove();
        alert('tweet eliminado');
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }    
}

// mostrar datos de locastorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage(); 
    
    tweets.forEach(function(tweet) {

        //crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText ='x';

        //crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

//agregar tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //agregar el nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo
    localStorage.setItem('tweets',JSON.stringify(tweets) );
    
}

// comprobar elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    //revisamos los valores de  local storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    }else {
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// eliminar tweet de localstorage

function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    //elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets) );

}