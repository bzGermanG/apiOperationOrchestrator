import mongoose from 'mongoose';

class Database 
{
    constructor() 
    {
        this.connection = null;
    }

    async connect() 
    {
        try 
        {
            this.connection = await mongoose.connect(process.env.MONGODB_URI, {});
            console.log(`MongoDB conectado: ${this.connection.connection.host}`);
            return this.connection;
        } 
        catch (error) 
        {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }

    async disconnect() 
    {
        try 
        {
            if (this.connection) 
            {
                await mongoose.disconnect();
                console.log('MongoDB desconectado');
            }
        } 
        catch (error) 
        {
            console.error(`Error al desconectar: ${error.message}`);
            throw error;
        }
    }

    getConnection() 
    {
        return this.connection;
    }
}

const database = new Database();
export default database; 