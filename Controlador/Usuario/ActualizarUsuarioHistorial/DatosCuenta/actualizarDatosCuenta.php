<?php namespace Controlador\Usuario\ActualizarUsuarioHistorial\DatosCuenta;

    require_once('../../../../autoload.php');    
    use Modelo\Usuario\Usuario; 
    use Modelo\Ingeniero\Ingeniero; 

    //echo __FILE__;

    $a = $_POST['ID'];
    $b = $_POST['LOGIN'];
    $c = $_POST['TUSER'];
    $d = $_POST['CIV'];
    $e = $_POST['EMAIL']; 
    $f = $_POST['TLF'];   
    $g = $_POST['TTLF'];  

    if($a != NULL && $b != NULL && $c != NULL && $d != NULL && $e != NULL && $f != NULL && $g != NULL){  
        if($d == "false"){
            $usuario = new Usuario();     
            $usuario->SetPersonaId($a); 
            $usuario->SetPersonaTlf($f,$g);
            $usuario->SetLogin($b);
            $usuario->SetTUser($c);
            $usuario->SetEmail($e);
            $info = $usuario->ActualizarDatosCuenta();     
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info); 
        }else{
            $usuario = new Ingeniero();     
            $usuario->SetPersonaId($a); 
            $usuario->SetPersonaTlf($f,$g);
            $usuario->SetLogin($b);
            $usuario->SetTUser($c);
            $usuario->SetEmail($e);
            $usuario->SetIngenieroCiv($d);
            $info = $usuario->ActualizarDatosCuenta();     
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info); 
        }
          
    }
?>