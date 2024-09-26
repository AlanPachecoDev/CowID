CREATE DATABASE IF NOT EXISTS cowidpro;
GO
USE cowidpro;
GO

CREATE TABLE IF NOT EXISTS Vaca (
    id INT NOT NULL AUTO_INCREMENT,
    MamaID INT,
    Peso Float NOT NULL,
    FechaNacimiento DATE NOT NULL, 
    NumeroPartos INT NOT NULL,
    QR VARCHAR(1000) NOT NULL,
    ParcelaUbicacion VARCHAR(50) NOT NULL,
    EdadDestete INT NOT NULL,
    AptaParaProduccion BOOLEAN NOT NULL,

    CONSTRAINT pk_Vaca PRIMARY KEY(id),
    INDEX (MamaID),
    FOREIGN KEY(MamaID) REFERENCES Vaca(id)
);

CREATE TABLE IF NOT EXISTS ProduccionDiaria(
    id INT NOT NULL AUTO_INCREMENT,
    VacaID INT NOT NULL,
    Fecha DATE NOT NULL,
    CantidadManana INT NOT NULL,
    CantidadTarde INT NOT NULL,

    CONSTRAINT pk_ProduccionDiaria PRIMARY KEY(id),
    INDEX (VacaID),
    FOREIGN KEY(VacaID) REFERENCES Vaca(id)
);

CREATE TABLE IF NOT EXISTS Vacuna(
    id INT NOT NULL AUTO_INCREMENT,
    VacaID INT NOT NULL,
    Fecha DATE NOT NULL,
    NombreVacuna VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_Vacuna PRIMARY KEY (id),
    INDEX (VacaID),
    FOREIGN KEY(VacaID) REFERENCES Vaca(id)
);

CREATE TABLE IF NOT EXISTS Embarazo(
    id INT NOT NULL AUTO_INCREMENT,
    VacaID INT NOT NULL,
    FechaInseminacion DATE NOT NULL,
    FechaParto DATE,

    CONSTRAINT pk_Embarazo PRIMARY KEY(id),
    INDEX (VacaID),
    FOREIGN KEY(VacaID) REFERENCES Vaca(id)
);

CREATE TABLE IF NOT EXISTS Enfermedad(
    id INT NOT NULL AUTO_INCREMENT,
    VacaID INT NOT NULL,
    FechaDeteccion DATE NOT NULL,
    FechaCuracion DATE,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_Enfermedad PRIMARY KEY(id),
    INDEX (VacaID),
    FOREIGN KEY(VacaID) REFERENCES Vaca(id)
);

CREATE TABLE IF NOT EXISTS Tratamiento(
    id INT NOT NULL AUTO_INCREMENT,
    VacaID INT NOT NULL,
    EnfermedadID INT NOT NULL,
    NombreDoctorTratante VARCHAR(70) NOT NULL,
    Descripcion VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_Tratamiento PRIMARY KEY(id),
    INDEX (VacaID),
    FOREIGN KEY(VacaID) REFERENCES Vaca(id),
    INDEX (EnfermedadID),
    FOREIGN KEY(EnfermedadID) REFERENCES Enfermedad(id)
);




-- INSERT INTO tasks (title, description) VALUES ('Task 1', 'Description 1'), ('Task 2', 'Description 2');
-- INSERT INTO Vaca(Peso, FechaNacimiento, NumeroPartos, QR, ParcelaUbicacion, EdadDestete, AptaParaProduccion)
-- VALUES (200.5,'2020/5/15', 2, 'DAWDFEWGEAW', 'Parcela 1', 1, TRUE)

