$(function (){
    hentFilmer();
    hentEnBillett()
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
function hentEnBillett() {
    const id = window.location.search.substring(1);
    const url ="/hentEnBillett?id="+id;
    $.get(url, function (billett) {
        $("#id").val(billett.id); // må ha med id inn skjemaet, hidden i html
        $("#fornavn").val(billett.fornavn);
        $("#etternavn").val(billett.etternavn);
        $("#telefonnr").val(billett.telefonnr);
        $("#e-post").val(billett.epost);
        $("#film").val(billett.film);
        $("#antall").val(billett.antall);
    })
}

function endreEnBillett () {
    if (validerInputs()) {
        const billett = {
            id: $("#id").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#e-post").val(),
            film: $("#film").val(),
            antall: $("#antall").val()
        }

        $.post("/endreEnBillett", billett, function () {
            window.location.href="/index.html";
        })
    }
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