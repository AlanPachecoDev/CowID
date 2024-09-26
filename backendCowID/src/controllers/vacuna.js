import { connect } from '../database';

export const getVacunas = async (req, res) => {
    const db = await connect();
    
    const [rows] = await db.query("SELECT * FROM Vacuna");

    console.log([rows]);
    res.json([rows]);
}

export const getVacuna = async (req, res) => {
    const db = await connect();

    const [rows] = await db.query("SELECT * FROM Vacuna WHERE id = ?", [req.params.id]);

    console.log(rows[0]);
    res.json(rows[0]);
}

export const getLastVacuna = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM Vacuna ORDER BY id DESC limit 1");

    res.json(rows[0]);
}

export const getVacunasCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM Vacuna");

    console.log("Vacunas Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const createVacuna = async (req, res) => {
    const db = await connect();
    const [results] = await db.query("INSERT INTO vacuna(VacaID, Fecha, NombreVacuna, Descripcion) VALUES (? ,?, ?, ?) ",
         [req.body.VacaID, req.body.Fecha, req.body.NombreVacuna, req.body.Descripcion]);

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

export const deleteVacuna = async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM Vacuna WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateVacuna = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE Vacuna SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}