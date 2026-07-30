let seiten=[];


function neueSeite(){

let titel=prompt(
"Seitentitel:"
);


let text=prompt(
"Was möchtest du schreiben?"
);


let seite={

titel:titel,

text:text,

datum:new Date().toLocaleDateString()

};


seiten.push(seite);


speichern();


anzeigen();

}



function speichern(){

localStorage.setItem(
"tagebuch",
JSON.stringify(seiten)
);

}



function laden(){

let daten=
localStorage.getItem("tagebuch");


if(daten){

seiten=JSON.parse(daten);

}


anzeigen();

}



function anzeigen(){

let liste=
document.getElementById(
"seitenListe"
);


liste.innerHTML="";


seiten.forEach(
(seite)=>{


liste.innerHTML += `

<h3>
${seite.titel}
</h3>

<p>
${seite.text}
</p>

small>
${seite.datum}
</small>


<hr>


`;

});


}



laden();

