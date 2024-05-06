function capturarInputs(e) {

    var d = Array();

    for (var i = 0; i < e.length; i++) {
        switch (e[i].type) {

            case 'email':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("email");
                console.log(e[i].name + " : " + e[i].value);
                d[i] = e[i].value.toLowerCase().trim();
                break;

            case 'file':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("file");
                console.log(e[i].name + " : " + e[i].files);
                var o  = Array();
                o = e[i].files;
                d[i] = o;
                break;

            case 'hidden':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("hidden");
                console.log(e[i].name + " : " + e[i].value);
                d[i] = e[i].value;
                break;

            case 'number':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("number");
                console.log(e[i].name + " : " + e[i].value);
                d[i] = e[i].value;
                break;

            case 'password':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("password");
                console.log(e[i].name + " : " + e[i].value);
                d[i] = e[i].value;
                break;

            case 'radio':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("radio");
                var op = $('[name=' + e[i].name + ']');
                for (var o = 0; o < op.length; o++) {
                    if (op[o].checked) {
                        d[i] = 1;
                        console.log(e[i].name + " : " + d[i]);
                        break;
                    } else {
                        d[i] = 0;
                        console.log(e[i].name + " : " + d[i]);
                        break;
                    }
                }
                break;

            case 'select-one':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("select-one");
                console.log(e[i].name + " : " + e[i].selectedOptions[0].value);
                d[i] = e[i].selectedOptions[0].value;
                break;

            case 'select-multiple':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("select-multiple");
                console.log(e[i].name);
                var c = $('#' + e[i].id + ' option:selected:not(.none)');
                var op = Array();
                for (var o = 0; o < c.length; o++) {
                    op[o] = c[o].value;
                }
                console.table(op);
                d[i] = op;
                break;

            case 'tel':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("tel");
                console.log(e[i].name + " : " + e[i].value);
                d[i] = e[i].value.trim();
                break;

            case 'text':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                if (!isNaN(e[i].value)) {
                    console.log('   alfanumérico');
                    console.log(e[i].name + " : " + e[i].value);
                    d[i] = e[i].value;
                } else {
                    console.log("texto");
                    console.log(e[i].name + " : " + e[i].value);
                    d[i] = e[i].value.toLowerCase().trim();
                }
                break;

            case 'textarea':
                console.log('-------------------------------------------------');
                console.log(e[i]);
                console.log("TextArea");
                console.log(e[i].name + " : " + e[i].value);
                d[i] = e[i].value.toLowerCase().trim();
                break;

            default:
                console.log('-------------------------------------------------');
                console.log('default: ' + e[i].type);
                break;
        }
    }

    return d;

}

function capturarInputsActualizar(e) {
    var d = Array();
    for (var i = 0; i < e.length; i++) {
        if (!isNaN(e[i].value)) {
            if (e[i].value.length == 0) {
                d[i] = $("#" + e[i].id).attr("placeholder");
            } else {
                d[i] = e[i].value;
            }
            console.log("Number");
            console.log(e[i].name + " : " + d[i]);

        } else if (e[i].type == "radio") {
            console.log("radio");
            var op = $('[name=' + e[i].name + ']');
            for (var o = 0; o < op.length; o++) {
                if (op[o].checked) {
                    d[i] = (o + 1);
                    console.log(e[i].name + " : " + d[i]);
                }
            }
            if (d[i] == null) {
                var id = $("#" + op[0].id).parent().parent().attr("id");
                if ($("#" + id + " input[type='radio']:visible.is-valid").hasClass("r-true")) {
                    d[i] = 1;
                } else if ($("#" + id + " input[type='radio']:visible.is-valid").hasClass("r-false")) {
                    d[i] = 2;
                }
            }

        } else if (e[i].tagName == "select") {
            $("#" + e[i].id).change(function () {
                d[i] = $("#" + e[i].id).val();
                console.log("Select");
            });

        } else {

            if (e[i].type == "email") {
                if (e[i].value.length == 0) {
                    d[i] = $("#" + e[i].id).attr("placeholder");
                } else {
                    d[i] = e[i].value.toLowerCase().trim();
                }
                console.log("Email");

            } else if (e[i].type == "password") {
                if (e[i].value.length == 0) {
                    d[i] = $("#" + e[i].id).attr("placeholder");
                } else {
                    d[i] = e[i].value.trim();
                }
                console.log("Password");

            } else {
                if (e[i].value.length == 0) {
                    d[i] = $("#" + e[i].id).attr("placeholder");
                } else {
                    d[i] = e[i].value.toLowerCase().trim();
                }
                console.log("Text");
            }
            console.log(e[i].name + " : " + d[i]);
        }
    }

    return d;
}