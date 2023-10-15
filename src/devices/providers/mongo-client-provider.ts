import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://127.0.0.1:27017/clean-arch';

export const mongoClient = new MongoClient(MONGO_URI);

export async function connectToMongoDB(): Promise<void> {
    try {
        console.log("Tentando estabelecer conexão com o MongoDB...");
        await mongoClient.connect();
        console.log("Conexão com o MongoDB estabelecida com sucesso!");
    } catch (error) {
        console.error("Erro ao tentar conectar ao MongoDB:", error);
    }
}

// Chame imediatamente para garantir que a conexão seja estabelecida ao iniciar
connectToMongoDB();
