let seiten=[
{
name:"",
text:"",
bild:"",
datum:new Date().toLocaleDateString()
}
];


let aktuell=0;

let bild="";


const seite=
document.getElementById("buch");


function laden(){

let daten=
localStorage.getItem("tagebuch");

if(daten){

seiten=JSON.parse(daten);

}

anzeigen();

}



function anzeigen(){


let s=seiten[aktuell];


document.getElementById("name").value=s.name;


document.getElementById("text").value=s.text;


document.getElementById("datum").innerHTML=s.datum;



let img=document.getElementById("bild");


if(s.bild){

img.src=s.bild;

img.style.display="block";

}

else{

img.style.display="none";

}



document.getElementById("anzeige")
.innerHTML=
`${aktuell+1} / ${seiten.length}`;


}



function speichern(){


seiten[aktuell]={

name:
document.getElementById("name").value,


text:
document.getElementById("text").value,


bild:
document.getElementById("bild").src || "",


datum:
document.getElementById("datum").innerHTML

};


localStorage.setItem(
"tagebuch",
JSON.stringify(seiten)
);


}



function weiter(){

speichern();


if(aktuell==seiten.length-1){

seiten.push({

name:"",

text:"",

bild:"",

datum:
new Date().toLocaleDateString()

});


}


aktuell++;

anzeigen();

}



function zurueck(){

speichern();


if(aktuell>0){

aktuell--;

}


anzeigen();

}





function bildHinzufuegen(){


document.getElementById("datei").click();


}



document
.getElementById("datei")
.onchange=function(){


let reader=new FileReader();


reader.onload=function(){

let img=document.getElementById("bild");


img.src=reader.result;

img.style.display="block";


};



reader.readAsDataURL(this.files[0]);


};





interact("#bild")

.draggable({

listeners:{

move(event){


let target=event.target;


let x=
(parseFloat(target.dataset.x)||0)
+event.dx;


let y=
(parseFloat(target.dataset.y)||0)
+event.dy;



target.style.transform=
`translate(${x}px,${y}px)`;


target.dataset.x=x;

target.dataset.y=y;


}

}

})

.resizable({

edges:{
left:true,
right:true,
bottom:true,
top:true
},


listeners:{


move(event){


event.target.style.width=
event.rect.width+"px";


}

}

});





let startX=0;


document
.getElementById("buch")
.addEventListener(
"touchstart",
e=>{

startX=e.changedTouches[0].screenX;

});



document
.getElementById("buch")
.addEventListener(
"touchend",
e=>{


let ende=
e.changedTouches[0].screenX;


if(startX-ende>80){

weiter();

}


if(ende-startX>80){

zurueck();

}


});






function screenshot(){


html2canvas(
document.getElementById("buch")
)

.then(canvas=>{


let link=
document.createElement("a");


link.download=
"mein-tagebuch.png";


link.href=
canvas.toDataURL();


link.click();


});


}




laden();
