
function cerrarSesion() {

    console.log("CerrarSess");

    x = $.ajax({
            url: "Controlador/CerrarSesion/cerrarSesion.php",
            type: "POST",
            async: true
        })
        .done(function (dat, est, obj) {

            console.log(dat + " " + typeof (dat));

            if (dat == 1) {
                datosDelUsuario = null;
                comp = false;
                removerOpcionesBarraLateral();  
                // Resetear el modal de registro   
                $("#iniciar").load("Vista/Contenido/PaginaPricipal/inicio.html");
                cargarDash();
                $("#opcionInicio a").addClass("active");
                $("#opcionUsuarios, #opcionInspecciones").removeClass("active");
                $("#opcionUsuarios a ,#opcionInspecciones a").removeClass("active");
                $("#opcionUsuarios div, #opcionInspecciones div").attr("style", "display: none; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;");
            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}

function removerOpcionesBarraLateral() {
    $("#opcionObra,#opcionUsuarios,#opcionInspecciones,#opcionDañosEquipos").removeClass("d-block").addClass("d-none");
    $("#opcionObra a,#opcionUsuarios a,#opcionInspecciones a,#opcionDañosEquipos a").addClass("disabled").attr("aria-disabled", "true");
}