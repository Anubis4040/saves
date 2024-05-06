function registrarPersona(e) {

    var d = capturarInputs(e);
    ciAux = d[0];
    sexoU  = d[3];

    if (update == false) {
        console.log("InsertPer");
        datos = {
            CI: d[0],
            NAME: d[1],
            LNAME: d[2],          
            UPDATE: update,
            ID: ""
        }
    } else if (update == true) {
        console.log("UpdatePer");
        datos = {
            CI: d[0],
            NAME: d[1],
            LNAME: d[2],         
            UPDATE: update,
            ID: idPersona
        }
    }

    notificacion();
    console.log(datos);

    x = $.ajax({
            url: "Controlador/Usuario/RegistrarPersona/registrarPersona.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {           

            if (update == false) {
                idPersona = dat.idPersona;
            }

            console.log(typeof (dat));

            if (typeof (dat) == "string" && dat['rowAf'] == 0 || dat == '' || typeof (dat) == "string" ) {
                notificacion();
                toastr["error"]("ERROR DE DB");
            } else {
                usuarioDatos1();
            }

            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;
        })
        .fail(function (obj, est) {
            toastr["warning"]("ERROR DE PETICION");
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");

        });
}