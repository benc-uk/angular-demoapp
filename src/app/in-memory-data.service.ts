import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const goats = [
      { id: 0,  name: 'Nigel', photo: 'goat1.jpg', likes: 0 },
      { id: 11, name: 'Mr Frisky', photo: 'goat2.jpg', likes: 0 },
      { id: 12, name: 'Lumpy Dave', photo: 'goat3.jpg', likes: 0 },
      { id: 13, name: 'Old Stumpy', photo: 'goat4.jpg', likes: 0 },
      { id: 14, name: 'Bruce Forsyth', photo: 'goat5.jpg', likes: 5 },
      { id: 15, name: 'Dodgy Ian', photo: 'goat6.jpg', likes: 8 },
      { id: 16, name: 'Sad Ken', photo: 'goat7.jpg', likes: 11 },
      { id: 17, name: 'Ziggy Stardust', photo: 'goat8.jpg', likes: 1 },
      { id: 18, name: 'Psycho Killer', photo: 'goat9.jpg', likes: 9 },
      { id: 19, name: 'Goat Name Placeholder', photo: 'goat10.jpg', likes: 0 },
      { id: 20, name: 'Bert The Goat', photo: 'goat11.jpg', likes: 2 }
    ];
    return {goats};
  }
}