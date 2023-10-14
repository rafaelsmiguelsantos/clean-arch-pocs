import { promises as fs } from 'fs';
import { Repository } from "src/use-cases/ports/in-memory";
import { v4 as uuidv4 } from 'uuid';

export class InMemoryRepository<T, R extends { id: string }> implements Repository<T, R> {
  private db: { [id: string]: T } = {};
  private filePath: string;

  constructor(fileName: string = 'database.json') {
    this.filePath = `C:\\Users\\migue\\OneDrive\\Documentos\\estudo\\clean-arch-poc/${fileName}`;
    this.loadData().catch(err => {
      console.error('Erro ao carregar os dados do arquivo:', err);
    });
  }

  private async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.db = JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Arquivo não encontrado, crie um novo
        await this.saveData();
      } else {
        throw err;
      }
    }
  }

  private async saveData(): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(this.db, null, 2));
  }

  async insert(item: T): Promise<R> {
    const id = uuidv4();
    this.db[id] = item;
    await this.saveData();
    return { id } as R;
  }
}
