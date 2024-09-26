import { connect } from '../database';

export const getEnfermedades = async (req, res) => {
    const db = await connect();
    
    const [rows] = await db.query("SELECT * FROM Enfermedad");

    console.log([rows]);
    res.json([rows]);
}

export const getEnfermedad = async (req, res) => {
    const db = await connect();

    const [rows] = await db.query("SELECT * FROM Enfermedad WHERE id = ?", [req.params.id]);

    console.log(rows[0]);
    res.json(rows[0]);
}

export const getLastEnfermedad = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM Enfermedad ORDER BY id DESC limit 1");

    res.json(rows[0]);
}

export const getEnfermedadesCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM Enfermedad");

    console.log("Enfermedades Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const createEnfermedad = async (req, res) => {
    const db = await connect();
    const [results] = await db.query("INSERT INTO Enfermedad(VacaID, FechaDeteccion, FechaCuracion, Nombre,"+
        "Descripcion) VALUES (? ,?, ?, ?, ?) ",
         [req.body.VacaID, req.body.FechaDeteccion, req.body.FechaCuracion, req.body.Nombre,
         req.body.Descripcion]);

    console.log({
        id : results.insertId,
        ...req.body
        });

        /*El "..." selecciona todo lo del req.body */

    res.json({
        id : results.insertId,
        ...req.body
        });
}

export const deleteEnfermedad= async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM Enfermedad WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateEnfermedad = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE Enfermedad SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}