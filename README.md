# Pokemon API

A simple RESTful API built with Node.js and TypeScript for managing Pokemon data.

## Features

- Create new Pokemon
- List all Pokemon
- Update Pokemon information
- Delete Pokemon
- In-memory JSON database
- TypeScript support

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WebPokemon-1
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3333`

## API Endpoints

- `GET /pokemons` - List all Pokemon
- `POST /pokemons` - Create a new Pokemon
- `PUT /pokemons/:id` - Update a Pokemon
- `DELETE /pokemons/:id` - Delete a Pokemon

### Request Body Examples

Creating/Updating a Pokemon:
```json
{
  "name": "Bulbasaur",
  "type": "Grass/Poison"
}
```

## Tech Stack

- Node.js
- TypeScript
- Native HTTP module
- File system for data persistence
