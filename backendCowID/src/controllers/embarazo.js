import { connect } from '../database';

export const getEmbarazos = async (req, res) => {
    const db = await connect();
    
    const [rows] = await db.query("SELECT * FROM Embarazo");

    console.log([rows]);
    res.json([rows]);
}

export const getEmbarazo = async (req, res) => {
    const db = await connect();

    const [rows] = await db.query("SELECT * FROM Embarazo WHERE id = ?", [req.params.id]);

    console.log(rows[0]);
    res.json(rows[0]);
}

export const getLastEmbarazo = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM Embarazo ORDER BY id DESC limit 1");

    res.json(rows[0]);
}

export const getEmbarazosCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM Embarazo");

    console.log("Embarazos Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const createEmbarazo = async (req, res) => {
    const db = await connect();
    const [results] = await db.query("INSERT INTO Embarazo(VacaID, FechaInseminacion, FechaParto) VALUES (? ,?, ?) ",
         [req.body.VacaID, req.body.FechaInseminacion, req.body.FechaParto]);

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

export const deleteEmbarazo = async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM Embarazo WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateEmbarazo = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE Embarazo SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}