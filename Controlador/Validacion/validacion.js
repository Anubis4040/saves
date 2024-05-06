function validar(e) {

    var elementos;

    var id = e.attr("id");

    if (!validarInputs(e)) {
        return false;
    } else {
        if (id == "datosInicioUsuario") {
            elementos = $("#" + id + " input");
            return iniciarSesion(elementos);
        } else if (id == "datosPersona") {
            elementos = $("#" + id + " input");
            return registrarPersona(elementos);
        } else if (id == "datos1") {
            usuarioDatos2();
            return true;
        } else if (id == "datos2") {
            var idP = e.parent().attr("id");
            elementos = $("#" + idP + " input:hidden:not(.select-dropdown):not(.off), #" + idP + " select:hidden, #" + idP + " input:visible:not(.select-dropdown):not(.off)");
            return registrarUsuario(elementos);
        } else if (id == "modalRegistroSolicitante") {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.off):not(.controls), #" + id + " select:hidden, #" + id + " input:hidden.infoUbi:not(.controls) , #" + id + " input:hidden.id:not(.controls)");
            return registrarSolicitante(elementos);
        } else if (id == 'solicitudInspec') {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible, #" + id + " input:hidden.infoUbi:not(.controls) , #" + id + " input[name='_submit']:hidden:not(.controls)");
            return solicitudInspeccion(elementos);
        } else if (id == 'FormularioPlanificacionInspeccion') {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible, #" + id + " input:hidden.infoUbi:not(.controls) , #" + id + " input[name='_submit']:hidden:not(.controls)");
            return PlanificarPetInsp(elementos, 1);
        } else if (id == 'FormularioPlanificacionObra') {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible, #" + id + " input:hidden.infoUbi:not(.controls) , #" + id + " input[name='_submit']:hidden:not(.controls)");
            return PlanificarPetInsp(elementos, 2);
        } else if (id == "modalMaterial") {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible");
            return añadirMaterial(elementos);
        } else if (id == "modalDano") {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible");
            return añadirDano(elementos);
        } else if (id == "modalMaquina") {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible");
            return añadirMaquina(elementos);
        } else if (id == "FormFinalizarInspeccion") {
            elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.datepicker):not(.controls), #" + id + " textarea:visible, #" + id + " input[name='_submit']:hidden:not(.controls), #" + id + " select:hidden");
            return FinalizarInspeccion(elementos);
        } else if (id == "modalFinalizarReparacion") {
            elementos = $("#" + id).find("input:visible:not(.select-dropdown):not([name='cantidadMaterial']):not(.datepicker):not(.controls), select:hidden:not(.off):not([name='cUni']):not([name='material']), input[name='_submit']:hidden:not(.controls), textarea:visible");
            return finalizarObra(elementos);
        }

    }
}

function validarInputs(e) {
    var id = e.attr("id");
    elementos = $("#" + id + " input:visible:not(.select-dropdown):not(.controls), #" + id + " select:hidden:not(.off), #" + id + " textarea:visible");
    var val = "";
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].value.length == 0 || elementos[i].type == "radio" || elementos[i].tagName == "SELECT" || elementos[i].type == "file") {
            if (elementos[i].type == "radio") {
                var op = $('[name=' + elementos[i].name + ']');
                var r = false;
                for (var o = 0; o < op.length; o++) {
                    if (op[o].checked) {
                        r = true;
                        break;
                    }
                }
                if (r == false) {
                    elementos[i].classList.add("is-invalid");
                    val = "e";
                } else {
                    elementos[i].classList.remove("is-invalid");
                    if (elementos[i].checked == true) {
                        elementos[i].classList.add("is-valid");
                    }
                    val++;
                }
            } else if (elementos[i].type == "file") {
                if (elementos[i].files.length == 0) {
                    $("#" + elementos[i].id).addClass("invalid");
                    val = "e";
                } else {
                    $("#" + elementos[i].id).removeClass("invalid");
                    $("#" + elementos[i].id).addClass("valid");
                    val++;
                }
            } else if (elementos[i].tagName == "SELECT" && !elementos[i].hasAttribute('multiple')) {
                if (elementos[i].value == 0 || elementos[i].value == "") {
                    $("#" + elementos[i].id).parent("div").children("input").addClass("invalid");
                    val = "e";
                } else {
                    $("#" + elementos[i].id).parent("div").children("input").removeClass("invalid");
                    $("#" + elementos[i].id).parent("div").children("input").addClass("valid");
                    val++;
                }
            } else if (elementos[i].tagName == "SELECT" && elementos[i].hasAttribute('multiple')) {
                if ($("#" + elementos[i].id + " option:selected").length == 1) {
                    $("#" + elementos[i].id).parent("div").children("input").addClass("invalid");
                    val = "e";
                } else {
                    $("#" + elementos[i].id).parent("div").children("input").removeClass("invalid");
                    $("#" + elementos[i].id).parent("div").children("input").addClass("valid");
                    val++;
                }
            } else {
                elementos[i].classList.add("invalid");
                val = "e";
            }
        } else if (elementos[i].value.length >= 0 && elementos[i].classList.contains('invalid')) {
            val = "e";
        } else {
            $("#" + elementos[i].id).removeClass("invalid is-invalid").addClass("valid is-valid");
            val++;
        }
        if (elementos[i].tagName == "TEXTAREA" && elementos[i].value.length > 0) {
            if (elementos[i].value.length > 0) {
                elementos[i].classList.remove("invalid");
                elementos[i].classList.add("valid");
                val++;
            } else {
                elementos[i].classList.add("invalid");
                val = "e";
            }
        }
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
};

// validar la actualizacion de usuario

function validarDatosUsuarioActualizarUser(e) {
    var elementos;
    var id = e.attr("id");
    if (!validarInputsActualizarUser(e)) {
        notificacion();
        toastr["warning"]("Debes modificar algun dato para actualizar");
        return false;
    } else {
        if (id == "datosPublicos") {
            elementos = $("#" + id + " input");
            return actualizarDatosPublicos(elementos);
        } else if (id == "datosCuenta") {
            elementos = $("#" + id + " input:not(.select-dropdown), #" + id + " select:hidden, #" + id + " input.id:hidden");
            return actualizarDatosCuenta(elementos);
        } else if (id == "datosClave") {
            elementos = $("#" + id + " input:hidden");
            return resetearClave(elementos);
        }
    }
}

function validarInputsActualizarUser(e) {
    var id = e.attr("id");
    var element = $("#" + id + " input:visible:not(.select-dropdown):not([type='radio']), #" + id + " textarea:visible");
    var radio = $("#" + id + " input[type='radio']:visible");
    var select = $("#" + id + " select:hidden");
    console.log(element, radio, select);
    var val = 0;
    var h = false;
    if (element.length > 0) {
        for (var i = 0; i < element.length; i++) {
            if (element[i].value == $("#" + element[i].id).attr("placeholder") || element[i].value == '') {
                val++;
            }
            if ($("#" + element[i].id).hasClass("invalid")) {
                console.log("entro");
                h = true;
            }
        }
    }

    var r = true;
    var ra = false;
    if (radio.length > 0) {
        for (var i = 0; i < radio.length; i++) {
            var op = $('[name=' + radio[i].name + ']');
            for (var o = 0; o < op.length; o++) {
                if (op[o].checked) {
                    if ($("#" + op[o].id).prop("checked") == true && $("#" + op[o].id).hasClass("sex")) {
                        r = false;
                    } else {
                        ra = true;
                    }
                } else {
                    r = false;
                }
            }
        }
    }

    var f = 0;
    var t = 0;
    if (select.length > 0) {
        for (var i = 0; i < select.length; i++) {
            if (select[i].name == "actualidarTipoUsuario") {
                if ($("#" + select[i].id + " option:checked").val() == tUser) {
                    f++;
                } else {
                    t++;
                }
            } else if (select[i].name == "tTelUser") {
                if ($("#" + select[i].id + " option:checked").val() == tTlf) {
                    f++;
                } else {
                    t++;
                }
            }
        }
    }

    if (select.length != 0 || radio.length != 0 || element.length != 0) {
        if (val == element.length) {
            if (radio.length > 0 && h != true) {
                if (ra == false) {
                    return false;
                } else {
                    return true;
                }
            }
            if (select.length > 0 && h != true) {
                if (t == 0) {
                    return false;
                } else {
                    return true;
                }
            }
        } else if (val != element.length) {
            if (element.length > 0 && h != true) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return true;
    }
}

/*
Evalua si el input es de tipo password o text para mostrar proceder a mostrarlo u ocultarlo
*/
function mostrarPass(e) {

    var element = $("#" + e.id).parent(),
        elem = element.parent();

    if (elem.find("input").attr("type") == "password") {
        elem.find("input").attr("type", "text");
    } else if (elem.find("input").attr("type") == "text") {
        elem.find("input").attr("type", "password");
    }
}

$("#usuarioClave,#claveUsuario,#claveUsuarioValidar").keyup(function () {
    if ($(":focus").val().length != 0) {
        $(" :focus ~ .md-addon-p").show();
    } else {
        $(":focus ~ .md-addon-p").hide();
    }
});

// validamos que el contenido ingresado solo sean numeros

function validarSoloNumeros(e) { // valida que solo se igresen caracteres numericos        
    var key = e.keyCode || e.which; // almacena en key el codigo de la tecla precionada
    var teclado = String.fromCharCode(key).toLowerCase(); // almacena en teclado el valor de la tecla precionada en minusculas
    var numeros = "1234567890"; // almacena en numeros las teclas (numeros) que se permitiran
    var especiales = "8-13-37-38-46-164"; // almacena en especiales el codio de otras teclas que se permitiran
    var tecladoEspecial = false; // variable de control 
    for (var i in especiales) { // recorre los codigos almacenados en especiales
        if (key == especiales[i]) { // evalua si el codigo almacenado en key coinside con algunos en especiales, tecladoEspecial se iguala a true y se rompe e ciclo
            tecladoEspecial = true;
            break;
        }
    }

    if (numeros.indexOf(teclado) == -1 && !tecladoEspecial) { // se evalua si  numeros.indexOf(teclado) es igual a -1 y tecladoEspecial es false, de ser asi se retorna false. 
        // NOTA: numeros.indexOf(teclado)   compara si la tecla precionada es igual a las teclas permitidas en numeros si son iguales retorna 0 y si no retorna -1
        if ($(" :focus").hasClass("valid") != true) { // evalua si el elemento que esta en focus tiene la clase valid
            if ($(":focus").attr("id") == "cedulaUsuario" || $(":focus").attr("id") == "civIngeniero" || $(":focus").attr("id") == "ciRep") {
                $(":focus ~ .infoEr").show(600); // se muestra el elemento
            }
        }
        return false;
    }
}

// se valida la cedula 

function validarCedula(e) {
    $(":focus ~ .infoErBD").hide(600);
    if (e.value.length == 0) { // evalua si el largo del elemento == 0
        $("#" + e.id + " ~ label").removeAttr("data-success"); // remueve el atributo data-success de los label que tengan la mismar jerarquia que el elemento con el id enviado por parametro
        $(":focus ~ .info").show(600); // se muestra el elemento 
        $("#" + e.id).blur(function () { // evalua si el elemento con el id enviado por parametro pierde el foco 
            $("#" + e.id + " ~ small").hide(600); // oculta los small que tengan la mismar jerarquia que el elemento con el id enviado por parametro 
        });
    } else if (e.value.length < 7 && e.value < 1000000 || e.value.length > 8 && e.value < 1000000 || e.value.length > 8 && e.value > 1000000) { // evalua si el largo del elemento es menor a 7 y su valor es menor a 1000000 o el elemento es mayor a 8 y su valor es mayor a 1000000
        $("#" + e.id + " ~ label").removeAttr("data-success"); // remueve el atributo data-success de los label que tengan la mismar jerarquia que el elemento con el id enviado por parametro
        $("#" + e.id).removeClass("valid").addClass("invalid"); // remueve la clase valid y agrega la clase invalid a el elemento con el id enviado por parametro
        $(":focus ~ .info").show(600); // se muestra el elemento                
    } else if (e.value.length >= 7 && e.value.length <= 8 && e.value > 1000000) { // evalua si el largo del elemento es mayor igual a 7 y menor igual a 8 y su valor sea mayor a 1000000
        $("#" + e.id + " ~ label").show().attr("data-success", "Correcto"); // muestra los label que tengan la mismar jerarquia que el elemento con el id enviado por parametro y agrega el atributo data-success="Correcto"
        $("#" + e.id).removeClass("invalid").addClass("valid"); // remueve la clase valid y agrega la clase invalid a el elemento con el id enviado por parametro 
        $(":focus ~ small").hide(600); // se oculta el elemento
        // $(":focus ~ .info").hide(600);  Descomentar ante posible error al estar la cedula registrada
    }
}

// validamos que el contenido ingresado solo sean letras 
function validarSoloLetras(e) { // valida que solo se igresen caracteres alfabeticos
    var key = e.keyCode || e.which; // almacena en key el codigo de la tecla precionada
    var teclado = String.fromCharCode(key).toLowerCase(); // almacena en teclado el valor de la tecla precionada en minusculas
    var letras = "abcdefghijklmnñopqrstuvwxyz"; // almacena en letras las teclas (letras) que se permitiran
    var especiales = "8-13-37-38-46-164"; // almacena en especiales el codio de otras teclas que se permitiran
    var tecladoEspecial = false; // variable de control 
    for (var i in especiales) { // recorre los codigos almacenados en especiales
        if (key == especiales[i]) { // evalua si el codigo almacenado en key coinside con algunos en especiales, tecladoEspecial se iguala a true y se rompe e ciclo
            tecladoEspecial = true;
            break;
        }
    }
    if (letras.indexOf(teclado) == -1 && !tecladoEspecial) { // se evalua si letras.indexOf(teclado) es igual a -1 y tecladoEspecial es false, de ser asi se retorna false.
        // NOTA: letras.indexOf(teclado) compara si la tecla precionada es igual a las teclas permitidas en letras si son iguales retorna 0 y si no retorna -1 
        $(" :focus ~ .info").show(600); // muestra el small que tenga la misma jerarquia que el elemento en focus
        $(" :focus ~ label").removeAttr("data-success"); // remueve el atributo data-success de los labels que tenga la misma jerarquia que el elemento en focus
        // f sera igual al id del elemento en focus
        var f = $(":focus").attr("id");
        $(" :focus ").blur(function () { // evalua si el elemento en focus pierde el focus
            $("#" + f + " ~ .info").hide(600); // se ocultan los small que tengan la misma jerarquia del elemento con el id almacenado en f
            if (isNaN($("#" + f).val())) { // evalua si el valor del elemento con el id almacenado en f es un string de sololetras
                $("#" + f + " ~ label").show(600).attr("data-success", "Correcto"); // agrega el atributo data-success="Correcto" a los labels con la misma jerarquia del elemento con el id almacenado en f
            }
        });
        return false;

    } else { // si letras.indexOf(teclado) es igual a 0 y tecladoEspecial es false, de ser asi se retorna true.
        if ($(" :focus ").val().length + 1 < 2) { // evalua si el largo del valor del el emento en focus + 1 es menor a 2 
            $(" :focus ~ label").removeAttr("data-success"); // remueve el atributo data-success de los labels que tenga la misma jerarquia del elemento en focus
        } else { // si el largo del valor del el emento en focus + 1 es mayor a 2 
            $(" :focus ").removeClass("invalid").addClass("valid"); // remueve la clase invalid y agrega la clase valid a el elemento en focus
            $(" :focus ~ .info").hide(600); // oculta los small que tengan la misma jerarquia del elemento en focus
            $(" :focus ~ label").show(600).attr("data-success", "Correcto"); // agrega el atributo data-success="Correcto" a los labels con la misma jerarquia que el elemento en focus
        }
    }
}

// validar los radios
function validarRadios(r) {
    if ($("#" + r.id).hasClass("r-true")) {
        $(".r-true").removeClass("is-invalid").addClass("is-valid");
        $(".r-false").removeClass("is-invalid").removeClass("is-valid");
    } else {
        $(".r-false").removeClass("is-invalid").addClass("is-valid");
        $(".r-true").removeClass("is-invalid").removeClass("is-valid");
    }
}

//  validamos que el contenido ingresado permita letras numeros y algunos caracteres especiales

function validarAlfaNumerico(e) {
    var key = e.keyCode || e.which;
    var teclado = String.fromCharCode(key).toLowerCase();
    var letras = "abcdefghijklmnñopqrstuvwxyz0123456789-_.";
    var especiales = "8-37-38-46-164";
    var tecladoEspecial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecladoEspecial = true;
            break;
        }
    }
    if (letras.indexOf(teclado) == -1 && !tecladoEspecial) {
        $(" :focus ~ .info").show(600);
        $(" :focus ~ label").removeAttr("data-success", "Correcto");
        var f = $(":focus").attr("id");
        $(" :focus ").blur(function () {
            $("#" + f + " ~ .info").hide(600);
            if (isNaN($("#" + f).val())) {
                $("#" + f + " ~ label").show(600).attr("data-success", "Correcto");
            }
        });
        return false;
    } else {
        if ($(" :focus ").val().length + 1 < 6) {
            $(" :focus ~ label").removeAttr("data-success", "Correcto");
        } else {
            $(" :focus ").removeClass("invalid").addClass("valid");
            $(" :focus ~ .info").hide(600);
            $(" :focus ~ label").show(600).attr("data-success", "Correcto");
        }
    }
}

function validarClave() {
    if ($("#claveUsuario").val() == "") {
        $("#claveUsuarioValidar").attr('disabled', 'disabled');
        $("#claveUsuario").keyup(function () {
            if ($(":focus").val().length != 0) {
                if ($(":focus").val().length >= 6) {
                    $("#claveUsuarioValidar").removeAttr('disabled').attr("maxlength", " " + $(":focus").val().length).attr("minlength", " " + $(":focus").val().length);
                    $(":focus").addClass("valid").removeClass("invalid");
                    if (isNaN($(":focus").val())) {
                        if ($(":focus").val().length >= 10) {
                            $(":focus ~ label").attr("data-success", "Alta");
                        } else if ($(":focus").val().length >= 8) {
                            $(":focus ~ label").attr("data-success", "Media");
                        } else {
                            $(":focus ~ label").attr("data-success", "Baja");
                        }
                    } else if (!isNaN($(":focus").val())) {
                        if ($(":focus").val().length >= 14) {
                            $(":focus ~ label").attr("data-success", "Alta");
                        } else if ($(":focus").val().length >= 10) {
                            $(":focus ~ label").attr("data-success", "Media");
                        } else {
                            $(":focus ~ label").attr("data-success", "Baja");
                        }
                    }

                    $(":focus ~ small").hide(600);
                    if ($("#claveUsuarioValidar").val() != 0 && $("#claveUsuarioValidar").hasClass("valid") && $(":focus").val().length != $("#claveUsuarioValidar").val().length) {
                        $("#claveUsuarioValidar").addClass("invalid").removeClass("valid");
                        $("#claveUsuarioValidar ~ label").removeAttr("data-success");
                        $("#claveUsuarioValidar ~ small").show(600);
                    } else if ($("#claveUsuarioValidar").val() == $(":focus").val() && $("#claveUsuarioValidar").hasClass("invalid")) {
                        $("#claveUsuarioValidar").addClass("valid").removeClass("invalid");
                        $("#claveUsuarioValidar ~ label").attr("data-success", "Clave correcta!");
                        $("#claveUsuarioValidar ~ small").hide(600);
                    }
                } else {
                    $("#claveUsuarioValidar").attr('disabled', 'disabled').val(null).removeClass("valid").removeClass("invalid");
                    $("#claveUsuarioValidar ~ label").removeClass("active");
                    $("#claveUsuarioValidar ~ small").hide(600);
                    $(":focus").addClass("invalid").removeClass("valid");
                    $(":focus ~ label").attr("data-success", "Ok!");
                    $(":focus ~ small").show(600);
                    // $("#spanPassVeri").hide(); OJO posible error
                }
            } else {
                // $("#spanPass").hide(); OJO posible error
                $("#claveUsuarioValidar").attr('disabled', 'disabled');
            }
        });

        $("#claveUsuarioValidar").keyup(function () {
            if ($(":focus").val().length != 0) {
                // $("#spanPassVeri").show(); posible error OJO
                if ($("#claveUsuario").val() == $(":focus").val()) {
                    $(":focus").addClass("valid").removeClass("invalid");
                    $(":focus ~ label").attr("data-success", "Clave correcta!");
                    $(":focus ~ small").hide(600);
                } else {
                    $(":focus ~ label").removeAttr("data-success");
                    $(":focus").addClass("invalid").removeClass("valid");
                    $(":focus ~ small").show(600);
                }
            } else {
                // $("#spanPassVeri").hide(); OJO posible error
            }

        });
    }
}