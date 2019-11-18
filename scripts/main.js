var header = document.querySelector('header');
var section = document.querySelector('section');

// Almacenando la URL del JSON  que queremos recuperar en una variable

var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

/*
El link anterior guarda esto:
{
  "squadName" : "Super hero squad",
  "homeTown" : "Metro City",
  "formed" : 2016,
  "secretBase" : "Super tower",
  "active" : true,
  "members" : [
    {
      "name" : "Molecule Man",
      "age" : 29,
      "secretIdentity" : "Dan Jukes",
      "powers" : [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name" : "Madame Uppercut",
      "age" : 39,
      "secretIdentity" : "Jane Wilson",
      "powers" : [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name" : "Eternal Flame",
      "age" : 1000000,
      "secretIdentity" : "Unknown",
      "powers" : [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}

*/

// Para crear una solicitud, necesitamos crear una nueva instancia de objeto de solicitud desde el XMLHttpRequest constructor, usando la palabra new palabra clave. 

var request = new XMLHttpRequest();

// Ahora tenemos que abrir  una nueva solicitud  usando el open() método.
/*
Esto toma al menos dos parámteros: hay otros parámetros opcionales disponibles.
Sólo necesitamos los dos parámetros obligatorios para este simple ejemplo:
El método HTTP para usar al hacer la solicitud de red. En este caso GETestá bien, ya que solo estamos recuperando algunos datos simples.
La URL para realizar la solicitud: esta es la URL del archivo JSON que almacenamos anteriormente.
*/

request.open('GET', requestURL);

/*
A continuación, aquí estamos configurando responseTypeJSON, de modo que XHR sepa que el servidor devolverá JSON, y que esto se debe convertir detrás de las escenas en un objeto JavaScript. Luego enviamos la solicitud con el send()método
*/

request.responseType = 'json';
request.send();

/*
La última parte de esta sección implica esperar a que la respuesta regrese del servidor y luego tratar con ella.
*/

request.onload = function() {
  var superHeroes = request.response;
  populateHeader(superHeroes);
    showHeroes(superHeroes);
}

/*
Aquí estamos almacenando la respuesta a nuestra solicitud (disponible en la responsepropiedad) en una variable llamada superHeroes; ¡esta variable ahora contendrá el objeto de JavaScript basado en el JSON! Luego pasamos ese objeto a dos llamadas a función: la primera completará la < header>con la información correcta, mientras que la segunda creará una tarjeta de información para cada héroe en el equipo, y la insertará en el <section>.
*/
/*
Hemos envuelto el código en un controlador de eventos que se ejecuta cuando el evento de carga se activa en el objeto de solicitud (ver onload); esto se debe a que el evento de carga se desencadena cuando la respuesta se devuelve satisfactoriamente; hacerlo de esta manera garantiza que request.responsedefinitivamente estará disponible cuando lleguemos a intentar hacer algo con él.
*/

function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['squadName'];
  header.appendChild(myH1);

  var myPara = document.createElement('p');
  myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
  header.appendChild(myPara);
}

/*
Hemos llamado al parámetro jsonObjpara recordarnos a nosotros mismos que este objeto JavaScript se originó a partir de JSON. Aquí primero creamos un <h1>elemento con createElement(), establecemos textContentque es igual a la squadNamepropiedad del objeto, luego lo agregamos al encabezado usando appendChild(). Luego hacemos una operación muy similar con un párrafo: créelo, establezca su contenido de texto y añádalo al encabezado. La única diferencia es que su texto se establece en una cadena concatenada que contiene tanto los homeTowny formedlas propiedades del objeto.
*/

// A continuación, agregue la siguiente función en la parte inferior del código, que crea y muestra las tarjetas de superhéroe:

function showHeroes(jsonObj) {
  var heroes = jsonObj['members'];
      
  for (var i = 0; i < heroes.length; i++) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';
        
    var superPowers = heroes[i].powers;
    for (var j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}

/*
Para empezar, a lmacenamos la memberspropiedad del objeto JavaScript en una nueva variable. Esta matriz contiene múltiples objetos que contienen la información para cada héroe.

A continuación, usamos un bucle for para recorrer cada objeto en la matriz. Para cada uno, nosotros:

Crea varios elementos nuevos: an <article>, an <h2>, three <p>s y a <ul>.
Configura el <h2> para que contenga el héroe actual name.
Llene los tres párrafos con su secretIdentity, agey una línea que diga "Superpoderes:" para introducir la información en la lista.
Almacene la powerspropiedad en otra nueva variable llamada superPowers- esto contiene una matriz que enumera los superpoderes del héroe actual.
Usa otro forciclo para recorrer los superpoderes del héroe actual. Para cada uno creamos un <li>elemento, colocamos la superpotencia dentro de él y luego usamos el listIteminterior del <ul>elemento ( myList) appendChild().
Lo último que hacemos es agregar el <h2>, <p>s, y <ul>dentro del <article>( myArticle), luego anexar el <article>interior del <section>. El orden en el que se anexan las cosas es importante, ya que este es el orden en que se mostrarán dentro del HTML.
*/

