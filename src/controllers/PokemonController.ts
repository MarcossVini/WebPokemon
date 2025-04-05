import { randomUUID } from 'crypto';
import { Database } from '../config/database.js';
import { Pokemon, CreatePokemonDTO, UpdatePokemonDTO } from '../@types/pokemon.js';
import { IncomingMessage, ServerResponse } from 'http';

export class PokemonController {
  constructor(private database: Database) {}

  async index(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const pokemons = this.database.select('pokemons');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(pokemons));
  }

  async create(req: IncomingMessage & { body: CreatePokemonDTO }, res: ServerResponse): Promise<void> {
    const { name, type } = req.body;
    
    const pokemon: Pokemon = {
      id: randomUUID(),
      name,
      type,
    };

    this.database.insert('pokemons', pokemon);
    res.writeHead(201).end();
  }

  async update(
    req: IncomingMessage & { body: UpdatePokemonDTO, params: { id: string } }, 
    res: ServerResponse
  ): Promise<void> {
    const { id } = req.params;
    const { name, type } = req.body;
    
    this.database.update('pokemons', id, { name, type });
    res.writeHead(204).end();
  }

  async delete(
    req: IncomingMessage & { params: { id: string } }, 
    res: ServerResponse
  ): Promise<void> {
    const { id } = req.params;
    
    this.database.delete('pokemons', id);
    res.writeHead(204).end();
  }
}

export { CreatePokemonDTO };
