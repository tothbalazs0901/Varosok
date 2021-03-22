$(function(){
   $('#varos').keyup(adatBeolvas); //referencia az adatBeolvas metódusra  
   $('article').delegate(" table th","click", rendezes);
});

var tomb = [];
var irany = true;

function rendezes() {
    var aktOszlop = $(this).attr("id");//Number(this.id);
    console.log(aktOszlop);
    tomb.sort(function(a, b){
        var number;
        if(irany){
            number = Number(a[aktOszlop] > b[aktOszlop]) *2-1;
        }else{
            number = Number(a[aktOszlop] < b[aktOszlop]) *2-1;
        }
        return number;
    }
    );
    tablazatbaKiir();
    irany = !irany;
}

function adatBeolvas(){
    console.log($('#varos').val());    
    $.ajax({
        type: "GET",
        url: "feldolgoz.php?varos="+$('#varos').val(),
        success: function(eredmeny){
            //$("article").html(eredmeny);
            tomb = JSON.parse(eredmeny);
            console.log(tomb);
            kiir();
        }});
}

function kiir(){   
    $("article").html("");
    var txt = "<select>";
            for (var i = 0; i < tomb.length; i++) {
                txt += "<option>" + tomb[i].nev + "</option>";
            //$("article").append(tomb[i].nev).append("<br>");
           //$("article").append("<br>");
            }
            txt += "</select>";
            $('#valasztoLista').html(txt);
            tablazatbaKiir();
}

function tablazatbaKiir(){
    var tablazat = "<table><tr><th id='nev'>Név</th><th id='megye'>Megye</th><th id='jaras'>Járás</th></tr>";
    for (var i = 0; i < tomb.length; i++) {
        tablazat += "<tr><td>" + tomb[i].nev + "</td><td>" + tomb[i].megye + "</td><td>" + tomb[i].jaras + "</td></tr>";       
    }
    tablazat += "</table>";
    $("article").html(tablazat);
}