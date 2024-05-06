function eliminarPersona() {

    if (cid) {

        console.log("DeletPer");

        datos = {
            ID: idPersona
        }

        console.log(datos);
        x = $.ajax({
                url: "Controlador/Usuario/EliminarPersona/eliminarPersona.php",
                type: "POST",
                async: true,
                data: datos
            })
            .done(function (dat, est, obj) {

                console.log(typeof (dat));
                if (typeof (dat) == "string" || dat['rowAf'] == 0) {
                    toastr["error"]("ERROR DE DB");
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
}