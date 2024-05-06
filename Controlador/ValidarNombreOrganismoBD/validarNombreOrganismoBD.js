function validarNombreOrganismoBD(nombre) {

    console.log("nombreOrg");

    datos = {
        NOMBRE: nombre.val()
    }

    var id = nombre.attr("id");

    x = $.ajax({
            url: 'Controlador/ValidarNombreOrganismoBD/validarNombreOrganismoBD.php',
            type: 'POST',
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            if (dat['rowAf'] == 0) {
                if (id == "nombreOrg") {
                    $("#" + id + " ~ .infoErBD").hide(600);
                }
            } else if (dat['rowAf'] > 0) {
                if (id == "nombreOrg") {
                    $("#" + id + " ~ label").removeAttr("data-success");
                    $("#" + id + "").removeClass("valid").addClass("invalid");
                    $("#" + id + " ~ .infoErBD").show(600);
                }
            }
        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}