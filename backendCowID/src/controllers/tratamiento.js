import { connect } from '../database';

export const getTratamientos = async (req, res) => {
    const db = await connect();
    
    const [rows] = await db.query("SELECT * FROM Tratamiento");

    console.log([rows]);
    res.json([rows]);
}

export const getTratamiento = async (req, res) => {
    const db = await connect();

    const [rows] = await db.query("SELECT * FROM Tratamiento WHERE id = ?", [req.params.id]);

    console.log(rows[0]);
    res.json(rows[0]);
}

export const getLastTratamiento = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM Tratamiento ORDER BY id DESC limit 1");

    res.json(rows[0]);
}

export const getTratamientosCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM Tratamiento");

    console.log("Tratamientos Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const createTratamiento = async (req, res) => {
    const db = await connect();
    const [results] = await db.query("INSERT INTO Tratamiento(VacaID, EnfermedadID, NombreDoctorTratante,"+
    "Descripcion) VALUES (? ,?, ?, ?) ",
         [req.body.VacaID, req.body.EnfermedadID, req.body.NombreDoctorTratante, req.body.Descripcion]);

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

export const deleteTratamiento = async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM Tratamiento WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateTratamiento = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE Tratamiento SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}