INSERT INTO `persona` (`idPersona`, `ci`, `nombre`, `apellido`, `tlf`, `tTlf`) VALUES
(1, '10101010', 'admin', 'root', '0000-000-000', 1);

INSERT INTO `usuario` (`idUsuario`, `login`, `email`, `pass`, `sexo`, `tUser`, `estatus`, `img`, `idPersona`) VALUES
(1, 'admin', 'admin@root.com', '$2y$12$ycgpi7Xk4DoDTjflvSZBGum3wUDxbBVQTgVWSEsFcsbRLxkZ550SK', 1, 4, 1, 'NULL', 1);


INSERT INTO `ingeniero` (`idIngeniero`, `civ`, `idUsuario`) VALUES 
(1, 'No Posee', 1);