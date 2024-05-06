function registrarSolicitante(e) {

     d = capturarInputs(e);

    if(d[3] == ''){
        d[3] = false;
    } else if(d[1] == ''){
        d[1] = false;
    }

    if ($("#datosPublicosPrivados").is(":visible")) {
        datos = {
            TSOLI: d[0],
            RIF: d[1],
            NOMBREORG: d[2],
            IDR: d[3],
            CI: d[4],
            NOMBREREP: d[5],
            APELLIDOREP: d[6],
            EMAIL: d[7],
            TLF: d[8],
            TTLF: d[9],
            CORDS: d[10],
            INFO: d[11],
            VISIBLE: 1
        }
        console.table(datos);
    } else {
        datos = {
            TSOLI: d[0],
            RIF: false,
            NOMBREORG: false,
            IDR: d[1],
            CI: d[2],
            NOMBREREP: d[3],
            APELLIDOREP: d[4],
            EMAIL: d[5],
            TLF: d[6],
            TTLF: d[7],
            CORDS: d[8],
            INFO: d[9],
            VISIBLE: 0
        }
        console.table(datos);
    }
    notificacion();
    x = $.ajax({
            url: "Controlador/Solicitante/RegistrarSolicitante/registrarSolicitante.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            if (typeof (dat) == "string" || dat['rowAf'] == 0) {                
                toastr["error"]("ERROR DE DB");
            } else {
                $("#modalRegistroSolicitante").modal('hide');
                $("#datSolic")[0].reset();
                $("#datSolic input:not(.cords):not(.tlf) + label").removeClass("active");                            
                toastr["success"]("Fue registrado exitosamente");
                console.log("Registrado");
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