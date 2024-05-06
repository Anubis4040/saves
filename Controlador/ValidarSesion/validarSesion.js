function validarInicioSesion() {

    console.log("IniValSess");

    x = $.ajax({
            url: "Controlador/ValidarSesion/validarSesion.php",
            type: "POST",
            async: true
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);

            if (Object.keys(dat).length > 2) {
                datosDelUsuario = dat;
                inicioDeUsuario();
            } else if (typeof (dat) == "string") {
                console.log("no");
                $("#iniciar").load("Vista/Contenido/PaginaPricipal/inicio.html");
            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}