import { IncomingMessage, ServerResponse } from 'http';

export function buildRoutePath(path: string): RegExp {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replace(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)');

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  return pathRegex;
}

import { PokemonController, CreatePokemonDTO } from '../controllers/PokemonController.js';
import { Database } from '../config/database.js';
import { UpdatePokemonDTO } from '../@types/pokemon.js';

const database = new Database();
const pokemonController = new PokemonController(database);

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/pokemons'),
    handler: (req: IncomingMessage, res: ServerResponse) => {
      return pokemonController.index(req, res);
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/pokemons'),
    handler: (req: IncomingMessage, res: ServerResponse) => {
      const extendedReq = { ...req, body: JSON.parse((req as any).body || '{}') } as IncomingMessage & { body: CreatePokemonDTO };
      return pokemonController.create(extendedReq, res);
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/pokemons/:id'),
    handler: (req: IncomingMessage, res: ServerResponse) => {
      const extendedReq = { 
        ...req, 
        body: JSON.parse((req as any).body || '{}'), 
        params: { id: req.url?.split('/').pop() || '' } 
      } as IncomingMessage & { body: UpdatePokemonDTO, params: { id: string } };
      return pokemonController.update(extendedReq, res);
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/pokemons/:id'),
    handler: (req: IncomingMessage, res: ServerResponse) => {
      const extendedReq = { ...req, params: { id: req.url?.split('/').pop() || '' } } as IncomingMessage & { params: { id: string } };
      return pokemonController.delete(extendedReq, res);
    }
  }
];