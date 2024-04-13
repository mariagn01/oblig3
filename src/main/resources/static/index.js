$(function (){
    hentFilmer();
})

function hentFilmer() {
    $.get("/hentFilmer", function(filmliste) {
        formaterFilmliste(filmliste)
    })
}

function formaterFilmliste(filmer) {
    let filmliste = "<select class='form-select' name='film' id='film'>" +
        "<option selected disabled placeholder='Velg film'>Velg film</option>"
    for (const film of filmer) {
        filmliste += "<option value='" + film + "'>" + film + "</option>";
    }
    filmliste += "</select>"
    $("#filmliste").html(filmliste);
}

function kjopbillett () {
//Bruker en egen valideringsfunksjon for å sjekke inputfelter før denne funksjonen kjøres
    if (validerInputs()) {
        //Legger verdier i et objekt og legger dette inn i array på server
        const billett = {
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#e-post").val(),
            film: $("#film").val(),
            antall: $("#antall").val()
        }

        $.post("/lagre", billett, function () {
            visBilletter();
        })

        //Tømmer inputfelt
        $("#film").val("")
        $("#fornavn").val("")
        $("#etternavn").val("")
        $("#telefonnr").val("")
        $("#e-post").val("")
        $("#film").val("")
        $("#antall").val("")

    }
}

//Funksjon for visning/oversikt av billetter som henter array fra server og formaterer med en egen funksjon
function visBilletter () {
    $.get("/hentBilletter", function (billetter) {
        formaterData(billetter);
    })
}

function formaterData(billetter) {
    let ut= "<table class='table'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>E-post</th>" +
        "</tr>";
    for (const billett of billetter){
        ut+="<tr>";
        ut+="<td>"+billett.film+"</td><td>"+billett.antall+"</td><td>"+billett.fornavn+"</td><td>"+billett.etternavn+"</td><td>"+billett.telefonnr+"</td><td>"+billett.epost+"</td>";
        ut+="</tr>";
    }
    ut += "</table>"
    $("#billettvisning").html(ut);
}

//Funksjon for sletting av billetter som tømmer array
function slettbilletter () {
    $.get("/slettAlle", function (){
        visBilletter()
    })
    $("#billettvisning").html("Billettene er slettet");
}

//Funksjon for validering av inputfelt, der hvert felt valideres ved if-setninger
function validerInputs() {
    let film = $("#film").val()
    let antall = $("#antall").val()
    let fornavn = $("#fornavn").val()
    let etternavn = $("#etternavn").val()
    let telefonnr = $("#telefonnr").val()
    let epost = $("#e-post").val()

    //Nullstiller feilmeldinger
    $("#film-feil").text("")
    $("#antall-feil").text("")
    $("#fornavn-feil").text("")
    $("#etternavn-feil").text("")
    $("#telefonnr-feil").text("")
    $("#epost-feil-feil").text("")

    //Sjekker at film er valgt
    if (!film) {
        $("#film-feil").html("Velg en film")
        return false;
    }

    //Sjekker at antall er over 0 og at det er skrevet inn et positivt heltall
    if (antall <= 0 || !Number.isInteger(parseInt(antall))) {
        document.getElementById("antall-feil").innerHTML="Skriv inn antall";
        return false;
    }

    //Sjekker at inputboksen for fornavn ikke er tom
    if (fornavn === "") {
        document.getElementById("fornavn-feil").innerHTML="Skriv inn fornavn";
        return false;
    }

    //Sjekker at inputboksen for etternavn ikke er tom
    if (etternavn === "") {
        document.getElementById("etternavn-feil").innerHTML="Skriv inn etternavn";
        return false;
    }

    //Sjekker at telefonnummer ikke er tomt, og at det er et på mellom 7-15 siffer
    let tlfRegex = /^\d{7,15}$/;
    if (telefonnr === "" || !tlfRegex.test(telefonnr)) {
        document.getElementById("telefonnr-feil").innerHTML="Skriv inn et telefonnummer med 8 siffer";
        return false;
    }

    //Sjekker at e-post er skrevet inn og har gyldig format ved hjelp av Regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (epost === "" || !emailRegex.test(epost)) {
        document.getElementById("epost-feil").innerHTML="Vennligst skriv inn en gyldig e-post";
        return false;
    }

    return true; // Returnerer true hvis alle valideringer er bestått
}