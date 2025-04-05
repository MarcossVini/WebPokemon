import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Pokemon } from '../@types/pokemon.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const databasePath = join(currentDir, '..', '..', 'db.json');

export class Database {
  #database: { [key: string]: Pokemon[] };

  constructor() {
    this.#database = {};
    this.#init();
  }

  async #init(): Promise<void> {
    try {
      const data = await fs.readFile(databasePath, 'utf8');
      this.#database = JSON.parse(data);
    } catch {
      this.#persist();
    }
  }

  #persist(): Promise<void> {
    return fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table: string): Pokemon[] {
    return this.#database[table] ?? [];
  }

  insert(table: string, data: Pokemon): Pokemon {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  update(table: string, id: string, data: Partial<Pokemon>): void {
    const rowIndex = this.#database[table]?.findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { 
        ...this.#database[table][rowIndex], 
        ...data 
      };
      this.#persist();
    }
  }

  delete(table: string, id: string): void {
    const rowIndex = this.#database[table]?.findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}