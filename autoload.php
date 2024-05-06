<?php
    define('ROOT', DIRNAME(__FILE__));
    define('DS', DIRECTORY_SEPARATOR);

    spl_autoload_register('autoload');

    function autoload($class){
        $class = ROOT . DS .  $class . '.php';
        if(!file_exists($class)){
            throw new Exception("Error al cargar la clase " . $class);            
        }else{
            require_once($class);
        }
    }    
?>