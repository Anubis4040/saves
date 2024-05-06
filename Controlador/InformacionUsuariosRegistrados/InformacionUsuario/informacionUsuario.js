function informacionUsuario(login, update , tipo) {

    console.log("informacionUsuario");

    datos = {
        LOGIN: login,
        TIPO: tipo
    }

    console.log(datos);
    x = $.ajax({
            url: "Controlador/InformacionUsuariosRegistrados/InformacionUsuario/informacionUsuario.php",
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
                toastr["error"]("ERROR DE DB");
            } else {
                var informacionUsuario = dat;
                tUser = informacionUsuario[0]['tUser'];
                tTlf = informacionUsuario[0]['tTlf'];
                userCi = informacionUsuario[0]["ci"];
                if (update == false) {
                    activarModalinformacion(informacionUsuario);
                } else if (update) {
                    activarModalActualizarUsuariosHistorial(informacionUsuario);
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

function activarModalActualizarUsuariosHistorial(informacion) {   

        $("#civ").show();
        $('#modalActualizarUsuariosHistorial .text-muted').hide();
        $("#modalActualizarUsuariosHistorial option").prop("selected", false);
        $("#modalActualizarUsuariosHistorial label").addClass("active");

        var nombre = informacion[0]["nombre"];
        nombre = nombre.split(' ');

        $("#idUpp").val(informacion[0]["idPersona"]);
        $("#idUpc").val(informacion[0]["idPersona"]);
        $("#idUppass").val(informacion[0]["idPersona"]);

        $("#actualizarCedulaUsuario").attr('placeholder', informacion[0]["ci"]);
        $("#actualizarCivUsuario").attr('placeholder', informacion[0]["civ"]);
        $("#actualizarNombreUsuario").attr('placeholder', nombre[0]);
        $("#actualizarApellidoUsuario").attr('placeholder', nombre[1]);
        $("#actualizarUsuarioUsuario").attr('placeholder', informacion[0]["login"]);
        $("#actualizarCorreoUsuario").attr('placeholder', informacion[0]["email"]);
        $("#telUser").attr('placeholder', informacion[0]["tlf"]);

        if (informacion[0]['sexo'] == 1) {
            $("#actualizarSexoUsuarioMasculino").addClass("is-valid sex");
            $("#actualizarSexoUsuarioFemenino").removeClass("sex");
        } else {
            $("#actualizarSexoUsuarioFemenino").addClass("is-valid sex");
            $("#actualizarSexoUsuarioMasculino").removeClass("sex");
        }

        $("#actualidarTipoUsuario option[value=" + informacion[0]['tUser'] + "]").attr("selected", true);
        $("#tTelUser option[value=" + informacion[0]['tTlf'] + "]").prop("selected", true);

        $('#modalActualizarUsuariosHistorial .mdb-select').material_select();

        $("#modalActualizarUsuariosHistorial").modal();             
    
}

function activarModalinformacion(informacion) {    
    $("#modalInformacion").modal();
    $("#modalInformacion #loginUsuario").text("Informacion de " + informacion[0]["login"]);
    $("#modalInformacion #nombreUsuario").text(informacion[0]["nombre"]);
    if (informacion[0]["tUser"] == "1") {
        $("#modalInformacion #tUserUsuario").text("Tipo de Usuario: ADMINISTRADOR");
    } else if (informacion[0]["tUser"] == "2") {
        $("#modalInformacion #tUserUsuario").text("Tipo de Usuario: INGENIERO");
    }
    if (informacion[0]["estatus"] == "1") {
        $("#modalInformacion #estatusUsuario").text("Estatus: ACTIVO");
    } else if (informacion[0]["estatus"] == "2") {
        $("#modalInformacion #estatusUsuario").text("Estatus: INACTIVO");
    }
    $("#modalInformacion #ciUsuario").text("Cedula: " + informacion[0]["ci"]);
    $("#modalInformacion #CivUsuario").text("Civ: " + informacion[0]["civ"]);
    if (informacion[0]["sexo"] == "1") {
        $("#modalInformacion #sexoUsuario").text("Sexo: MASCULINO");
    } else if (informacion[0]["sexo"] == "2") {
        $("#modalInformacion #sexoUsuario").text("Sexo: FEMENINO");
    }
    if (informacion[0]["tTlf"] == "1") {
        $("#modalInformacion #tlfUsuario").text("Tlf: " + informacion[0]["tlf"] + " MOVIL");
    } else if (informacion[0]["tTlf"] == "2") {
        $("#modalInformacion #tlfUsuario").text("Tlf: " + informacion[0]["tlf"] + " LOCAL");
    }
    $("#modalInformacion #correoUsuario").text("Correo: " + informacion[0]["email"]);

}