<?php namespace Controlador\Usuario\RegistrarUsuario;

    require_once('../../../autoload.php');
    use Modelo\Usuario\Usuario;     
    use Modelo\Ingeniero\Ingeniero;

    //echo __FILE__;

      //echo __FILE__;   
      $a = $_POST['USER'];
      $b = $_POST['TUSER'];    
      $c = $_POST['EMAIL'];
      $d = $_POST['PASS'];    
      $e = $_POST['ID'];   
      $g = $_POST['SEXO'];

      if($a != NULL && $b != NULL && $c != NULL && $d != NULL && $e != NULL && $g != NULL){       
            $usuario = new Ingeniero();
            $usuario->SetPersonaId($e);
            $usuario->SetUsuarioIn($a,$b,$c,$g,$d);           
            $info = $usuario->RegistrarUsuario();            
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);     
      }

?>