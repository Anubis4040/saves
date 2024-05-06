<?php namespace Modelo\BaseDatos;

    require_once('configuracion.php');

    class ConexionBaseDatos{

        protected static $conexionBD;

        public function __Construct(){            
            if(!isset(self::$conexionBD)){
                try{
                    $servidor = dbMane . ':host=' . dbHost . ';dbname=' . dbName;
                    self::$conexionBD = new \PDO($servidor, dbUser, dbPass);
                    self::$conexionBD->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                    self::$conexionBD->exec('SET CHARACTER SET ' . dbCharset);                                                                        
                }catch(PDOException $e){
                    self::$conexionBD = NULL;
                    die('Error: ' . $e->getMessage() . '<br><br> Detectado en la linea ' . $e->getLine() . ' del archivo: <br>' . $e->getFile() . '<br>');
                }
            }
        }

    }
 

?>