<?php namespace Controlador\Usuario\RegistrarPersona;

    require_once('../../../autoload.php');
    use Modelo\Usuario\Usuario;     

    //echo __FILE__;

    $a = $_POST['CI'];
    $b = $_POST['NAME'];
    $c = $_POST['LNAME'];      
    if($_POST['UPDATE'] == 'true'){
        $e = true;
    }else{
        $e = false;
    }
    $f = $_POST['ID'];
    
    
    
    if( $a != NULL && $b != NULL && $c != NULL){        
        if($e){            
            $usuario = new Usuario();
            $usuario->SetPersonaUp($f,$a,$b,$c);
            $info = $usuario->ActualizarPersona();
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);
        }else{            
            $usuario = new Usuario();
            $usuario->SetPersonaIn($a,$b,$c);
            $info = $usuario->RegistrarPersona();
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);
        }        
    }
    
    
    
?>