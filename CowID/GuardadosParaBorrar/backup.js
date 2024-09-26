  CowInfo
  
  /**Se guardan todas las producciones en la constante producciones */
    const loadProducciones = async () => {
        const produccionesTmp = await getProducciones();
        setProducciones(produccionesTmp[0]);
        //console.log(typeof (producciones));
    }



    /**Si una vaca no tiene producciones crear una */
        const nuevaProduccion = async () => {
            if (produccion.Fecha === undefined || produccion.Fecha) {
                const newProd = {
                    CantidadManana: 15,
                    CantidadTarde: 15,
                    Fecha: '2022/07/15',
                    VacaID: cowId,
                }
                await saveProduccion(newProd);
                //console.log("nuevas: " + producciones);
            }}
            
            
        const loadEnfermedad = async () => {
            const enfermedadTmp = await getEnfermedad(cowId);
            setEnfermedad(enfermedadTmp);
            // console.log(enfermedad);
        }



AddCow



