let tagebuch =
JSON.parse(localStorage.getItem("tagebuch")) || [];


let bild="";



document
.getElementById("bild")
.addEventListener("change",function(){

let datei=this.files[0];

if(!datei)return;


let reader=new FileReader();


reader.onload=function(){

bild=reader.result;


let img=document.getElementById("vorschau");

img.src=bild;
img.style.display="block";

};


reader.readAsDataURL(datei);


});





function speichern(){


let eintrag={

titel:
document.getElementById("titel").value,

datum:
document.getElementById("datum").value ||
new Date().toLocaleDateString(),

text:
document.getElementById("text").value,

bild:bild

};


tagebuch.push(eintrag);



localStorage.setItem(
"tagebuch",
JSON.stringify(tagebuch)
);



anzeigen();


}





function anzeigen(){


let liste=
document.getElementById("seiten");


liste.innerHTML="";



tagebuch.forEach((seite,index)=>{


liste.innerHTML+=`

<div class="seite">

<h3>${seite.titel}</h3>

<p>${seite.datum}</p>

<p>${seite.text}</p>


${seite.bild ?
`<img src="${seite.bild}">`
:
""}



<button class="loeschen"
onclick="loeschen(${index})">

🗑 Löschen

</button>


</div>

`;

});


}




function loeschen(index){


tagebuch.splice(index,1);


localStorage.setItem(
"tagebuch",
JSON.stringify(tagebuch)
);


anzeigen();


}





async function pdfErstellen(){


const {jsPDF}=window.jspdf;


let pdf=
new jsPDF();



let y=20;



pdf.setFontSize(22);

pdf.text(
"Mein Tagebuch",
20,
y
);


y+=20;



for(let seite of tagebuch){



if(y>250){

pdf.addPage();

y=20;

}



pdf.setFontSize(16);


pdf.text(
seite.titel || "Ohne Titel",
20,
y
);


y+=10;



pdf.setFontSize(12);


let text=
pdf.splitTextToSize(
seite.text,
170
);


pdf.text(
text,
20,
y
);



y+=text.length*7;



pdf.text(
seite.datum,
20,
y
);



y+=15;



if(seite.bild){


try{


pdf.addImage(
seite.bild,
"JPEG",
20,
y,
80,
60
);


y+=70;


}

catch(e){

console.log(
"Bild konnte nicht eingefügt werden"
);

}


}



}



pdf.save(
"Mein-Tagebuch.pdf"
);



}



anzeigen();
