import { InMemoryDbService } from 'angular-in-memory-web-api';

// Note we need both id and RowKey, real API doesn't use id only RowKey
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const goats = [
      { id: 0, RowKey: 0,  name: 'Nigel', photo: 'goat1.jpg', likes: 0, desc: 'Blah'  },
      { id: 11, RowKey: 11, name: 'Mr Frisky', photo: 'goat2.jpg', likes: 0, desc: 'Blah'  },
      { id: 12, RowKey: 12, name: 'Lumpy Dave', photo: 'goat3.jpg', likes: 0, desc: 'Blah'  },
      { id: 13, RowKey: 13, name: 'Old Stumpy', photo: 'goat4.jpg', likes: 0, desc: 'Blah'  },
      { id: 14, RowKey: 14, name: 'Bruce Forsyth', photo: 'goat5.jpg', likes: 5, desc: 'Blah'  },
      { id: 15, RowKey: 15, name: 'Dodgy Ian', photo: 'goat6.jpg', likes: 8, desc: 'Blah'  },
      { id: 16, RowKey: 16, name: 'Sad Ken Jr', photo: 'goat7.jpg', likes: 11, desc: 'Blah' },
      { id: 17, RowKey: 17, name: 'Ziggy Stardust', photo: 'goat8.jpg', likes: 1, desc: 'Blah'  },
      { id: 18, RowKey: 18, name: 'Psycho Killer', photo: 'goat9.jpg', likes: 9, desc: 'Blah'  },
      { id: 19, RowKey: 19, name: 'Goat Name Placeholder', photo: 'goat10.jpg', likes: 0, desc: 'Blah'  },
      { id: 20, RowKey: 20, name: 'Bert The Goat', photo: 'goat11.jpg', likes: 2, desc: 'Blah'  }
    ];
    return {goats};
  }
}