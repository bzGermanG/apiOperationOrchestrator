import { v4 as uuidv4 } from 'uuid';

// Obtener un UUID
async function getUUID(req, res) 
{
    try 
    {
        const uuId = uuidv4();
        res.json({ "UUID": uuId});
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message });
    }
}

export {
    getUUID
  }; 