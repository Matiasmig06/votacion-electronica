const STORAGE="votacion_nosql";

function obtenerDatos(){

return JSON.parse(
localStorage.getItem(STORAGE)
)||[];

}

function guardar(datos){

localStorage.setItem(
STORAGE,
JSON.stringify(datos)
);

}

function votar(){

const votante=
document.getElementById("votante").value.trim();

const opcion=
document.getElementById("opcion").value;

if(!votante||!opcion){

alert("Completar campos");

return;

}

let votos=
obtenerDatos();

let existe=
votos.find(
v=>v.votante===votante
);

if(existe){

alert("Ya votó");

return;

}

const nuevoVoto={

id:Date.now(),

votante,

opcion,

fecha:new Date(),

metadata:{
ip:"local",
dispositivo:navigator.userAgent
}

};

votos.push(
nuevoVoto
);

guardar(votos);

mostrar();

alert("Voto registrado");

}

function mostrar(){

let votos=
obtenerDatos();

let conteo={};

votos.forEach(v=>{

conteo[v.opcion]=
(conteo[v.opcion]||0)+1;

});

let html="";

for(let opcion in conteo){

html+=`

<div class="resultado">

${opcion}

→

${conteo[opcion]}

votos

</div>

`;

}

html+=`
<br>
Total:
${votos.length}
`;

document.getElementById(
"resultados"
).innerHTML=html;

}

function exportarJSON(){

let datos=
obtenerDatos();

const archivo=
new Blob(
[
JSON.stringify(
datos,
null,
2
)
],
{
type:"application/json"
}
);

const url=
URL.createObjectURL(
archivo
);

const a=
document.createElement("a");

a.href=url;

a.download=
"votacion.json";

a.click();

}

function reiniciar(){

if(confirm(
"Eliminar resultados?"
)){

localStorage.removeItem(
STORAGE
);

mostrar();

}

}

mostrar();