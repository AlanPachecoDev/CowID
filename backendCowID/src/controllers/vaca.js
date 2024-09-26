import { connect } from '../database';
import { db } from '../config/firebase';
import { getDocs, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { Collections } from './collections';

// export const getVacas = async (req, res) => {
//     const db = await connect();

//     const [rows] = await db.query("SELECT * FROM Vaca");

//     console.log([rows]);
//     res.json([rows]);
// }

export const getVacas = async (req, res) => {
    const querySnapshot = await getDocs(collection(db, Collections.VACAS));
    const sol = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
    })
    return res.status(200).json(sol)
}


// export const getVaca = async (req, res) => {
//     const db = await connect();

//     const [rows] = await db.query("SELECT * FROM Vaca WHERE id = ?", [req.params.id]);

//     console.log(rows[0]);
//     res.json(rows[0]);
// }

export const getVaca = async (req, res) => {
    try {
        const { id } = req.params
        console.log('query ', id)

        const docRef = doc(db, Collections.VACAS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Vaca", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        return res.status(200).json(docSnap.data())
    }
    catch (e) {
        console.log(e)
    }
}

export const getVacasCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT(*) FROM Vaca");

    console.log("Vacas Count:");
    console.log(rows[0]["COUNT(*)"]);
    res.json(rows[0]["COUNT(*)"]);
}

export const getLastVaca = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM Vaca ORDER BY id DESC limit 1");

    console.log(rows);
    res.json(rows[0]);
}

// export const createVaca = async (req, res) => {
//     const db = await connect();
//     const [results] = await db.query("INSERT INTO Vaca(Peso, FechaNacimiento, NumeroPartos, QR,"+ 
//         "ParcelaUbicacion, EdadDestete, AptaParaProduccion) VALUES (?,?, ?, ?, ?, ?, ?) ",
//          [req.body.peso, req.body.fechaNacimiento, req.body.numeroPartos, req.body.qr,
//          req.body.parcelaUbicacion, req.body.edadDestete, req.body.aptaParaProduccion]);

//     console.log({
//         id : results.insertId,
//         ...req.body
//         });

//         /*El "..." selecciona todo lo del req.body */
//         console.log({results});


//     res.json({
//         id : results.insertId,
//         ...req.body
//         });
// }


/**
 * Este metodo guarda una vaca en la base de datos
 * @param {*} req 
 * @param {*} res 
 * @returns ok:estado de la consulta , vacadID: Id del documento guardado en firebase
 */
export const createVaca = async (req, res) => {
    try{
        const { body } = req
        const result = await addDoc(collection(db, Collections.VACAS), body)
        return res.status(200).json({ok:true,vacaID:result.id})
    }catch(e){
        res.status(400).json({ok:false})
    }
    
}

export const deleteVaca = async (req, res) => {
    const db = await connect();
    const result = await db.query("DELETE FROM Vaca WHERE id = ?", [req.params.id]);

    console.log(result);
    //res.json({});
    res.sendStatus(204);
}

export const updateVaca = async (req, res) => {
    const db = await connect();

    const results = await db.query('UPDATE Vaca SET ? WHERE id = ?', [
        req.body,
        req.params.id
    ])
    console.log(results);
    res.sendStatus(204);
}