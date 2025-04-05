export interface Pokemon {
  id: string;
  name: string;
  type: string;
}

export interface CreatePokemonDTO {
  name: string;
  type: string;
}

export interface UpdatePokemonDTO {
  name?: string;
  type?: string;
}