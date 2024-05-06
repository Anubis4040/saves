<?php
	namespace Modelo\Persona;
	
	use Modelo\BaseDatos\ConexionBaseDatos;
	
	class Persona extends ConexionBaseDatos {
		
		protected $idPersona;
		protected $ci;
		protected $nombre;
		protected $apellido;		
		protected $tlf;
		protected $tTlf;
		
		protected $conexion;
		
		public function __Construct($idPersona = '', $ci = '99999999', $nombre = '', $apellido = '', $tlf = '00000000000', $tTlf = 1) {
			
			parent::__Construct();
			$this->conexion = self::$conexionBD;
			
			$this->idPersona = $idPersona;
			$this->ci        = $ci;
			$this->nombre    = htmlentities(addslashes($nombre));
			$this->apellido  = htmlentities(addslashes($apellido));			
			$this->tlf       = $tlf;
			$this->tTlf      = $tTlf;
			
		}

		public function SetPersonaIn($ci,$nombre,$apellido){
			$this->ci        = $ci;
			$this->nombre    = htmlentities(addslashes($nombre));
			$this->apellido  = htmlentities(addslashes($apellido));	
		}

		public function SetPersonaUp($idPersona,$ci,$nombre,$apellido){
			$this->idPersona = $idPersona;
			$this->ci        = $ci;
			$this->nombre    = htmlentities(addslashes($nombre));
			$this->apellido  = htmlentities(addslashes($apellido));	
		}

		public function SetPersonaId($idPersona){
			$this->idPersona = $idPersona;
		}

		public function SetCi($ci){
			$this->ci        = $ci;
		}

		public function SetPersonaTlf($tlf,$tTlf){
			$this->tlf       = $tlf;
			$this->tTlf      = $tTlf;
		}
		
		public function RegistrarPersona() {
			
			$informe = array();
			$this->conexion->beginTransaction();
			try {
				$sql = "INSERT INTO persona (ci,nombre,apellido) VALUES (:ci, :n, :ln)";
				
				$query = $this->conexion->prepare($sql);
				
				$query->execute(array(
					":ci" => $this->ci,
					":n" => $this->nombre,
					":ln" => $this->apellido					
				));
				
				$resultado = $query;
				
				$this->idPersona      = $this->conexion->lastInsertId();
				$informe["idPersona"] = $this->idPersona;
				
				$rowAfIn = $resultado->rowCount();
				
				if ($rowAfIn == 0) {
					$informe['errorSms'] = $resultado->errorInfo();
				} else {
					$informe['rowAf'] = $rowAfIn;
				}
				
				$this->conexion->commit();
				
				return $informe;
				
			}
			catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
		}
		
		public function ActualizarPersona() {
			$informe = array();
			$this->conexion->beginTransaction();
			try {
				
				$sqlUp = "UPDATE persona SET ci = :ci, 
                                            nombre = :n,
                                            apellido = :ln                                            
                                            WHERE idPersona = :id";
				
				$queryUp = $this->conexion->prepare($sqlUp);
				
				$queryUp->execute(array(
					":ci" => $this->ci,
					":n" => $this->nombre,
					":ln" => $this->apellido,					
					":id" => $this->idPersona
				));
				
				$resultadoUp = $queryUp;
				
				$rowAfUp = $queryUp->rowCount();
				
				if ($rowAfUp == 0) {
					$informe['rowAf']    = $rowAfUp;
					$informe['errorSms'] = $queryUp->errorInfo();
				} else {
					$informe['rowAf'] = $rowAfUp;
				}
				
				$this->conexion->commit();
				
				return $informe;
				
			}
			catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
			
		}
		
		public function EliminarPerona() {
			
			$this->conexion->beginTransaction();
			
			$informe = array();
			
			try {
				
				$sql = "DELETE FROM persona WHERE idPersona = :id";
				
				$query = $this->conexion->prepare($sql);
				
				$query->execute(array(
					":id" => $this->idPersona
				));
				
				$resultado = $query;
				
				$rowAfIn = $resultado->rowCount();
				
				if ($rowAfIn == 0) {
					$informe['errorSms'] = $resultado->errorInfo();
					$informe['rowAf']    = $rowAfIn;
				} else {
					$informe['rowAf'] = $rowAfIn;
				}
				
				$this->conexion->commit();
				
			}
			catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
			
			return $informe;
		}
		
		public function ValidarCedulaBD() {
			$informe = array();
			try {
				
				$sql = "SELECT per.ci FROM persona AS per 
                JOIN usuario AS user USING (idPersona) 
                WHERE per.ci = :ci";
				
				$query = $this->conexion->prepare($sql);
				
				$query->execute(array(
					":ci" => $this->ci
				));
				
				$resultado = $query;
				
				while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
					$informe['ciU'] = $registro['ci'];
				}
				
				$rowAfIn = $resultado->rowCount();
				
				if ($rowAfIn == 0) {
					$informe['rowAfU']    = $rowAfIn;
					$informe['errorSmsU'] = $resultado->errorInfo();
					
					$sql = "SELECT per.ci , per.idPersona,per.nombre,per.apellido FROM persona AS per
                    JOIN solicitante AS soli USING (idPersona)
                    WHERE per.ci = :ci";
					
					$query = $this->conexion->prepare($sql);
					
					$query->execute(array(
						":ci" => $this->ci
					));
					
					$resultado = $query;
					
					while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                        $informe['idPS'] = $registro['idPersona'];
                        $informe['ciS'] = $registro['ci'];                        
                        $informe['nombre'] = $registro['nombre'];
                        $informe['apellido'] = $registro['apellido'];                        
					}
					
					$rowAfIn = $resultado->rowCount();
					
					if ($rowAfIn == 0) {
						$informe['rowAfS']    = $rowAfIn;
						$informe['errorSmsS'] = $resultado->errorInfo();
						
					} else {
						$informe['rowAfS'] = $rowAfIn;
					}
					
				} else {
					$informe['rowAfU'] = $rowAfIn;
				}
				
			}
			catch (\PDOException $e) {
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
			return $informe;
		}
		
	}
	
	
?>