<?php namespace Controlador\Usuario\ResetearClave;

    require_once('../../../autoload.php');
    use Modelo\Usuario\Usuario;   

    //echo __FILE__;

    $a = $_POST['ID'];
    $b = $_POST['CI'];    

    if($a != NULL && $b != NULL ){       

      $usuario = new Usuario();
      $usuario->SetPersonaId($a);
      $usuario->SetPass($b);
      $info = $usuario->ResetearClave();
      header('Content-type: application/json; charset=utf-8');
      echo json_encode($info);

    }

?>