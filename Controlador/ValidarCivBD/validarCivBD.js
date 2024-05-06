function validarCivBD(civ) {

    console.log("valCivBD");   

    datos = {
        CIV: civ.val()
    }

    var id = civ.attr("id");

    console.log(datos);
    x = $.ajax({
            url: "Controlador/ValidarCivBD/validarCivBD.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {            
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;            
            if (dat['rowAf'] == 0) {
                noCiv(id);                 
            } else if(dat['rowAf'] == 1) {
               siCiv(id,civ);
            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}



function noCiv(id){
    if (id == "civIngeniero") {
        $("#"+id+" ~ label").attr("data-success", "Correcto");
        $("#"+id+"").removeClass("invalid").addClass("valid");
        $("#"+id+" ~ .infoErBD").hide(600);                    
    } else if (id == "actualizarCivUsuario") {
        $("#"+id+" ~ label").attr("data-success", "Correcto");
        $("#"+id+"").removeClass("invalid").addClass("valid");
        $("#"+id+" ~ .infoErBD").hide(600);
    }
}

function siCiv(id,civ){
    if (id == "civIngeniero") {
        $("#"+id+" ~ label").removeAttr("data-success");
        $("#"+id+"").removeClass("valid").addClass("invalid");
        $("#"+id+" ~ .infoErBD").show(600);
        $("#"+id+" ~ .infoEr").hide(600);
        $("#"+id+" ~ info").hide(600);
    } else if (id == "actualizarCivUsuario") {
        if (civ.val() != civ.attr("placeholder")) {
            $("#"+id+" ~ label").removeAttr("data-success");
            $("#"+id+"").removeClass("valid").addClass("invalid");
            $("#"+id+" ~ .infoErBD").show(600);
            $("#"+id+" ~ .infoEr").hide(600);
            $("#"+id+" ~ .info").hide(600);
        } else {
            $("#"+id+" ~ label").attr("data-success", "Correcto");
            $("#"+id+"").removeClass("invalid").addClass("valid");
            $("#"+id+" ~ .infoErBD").hide(600);
        }

    }
}