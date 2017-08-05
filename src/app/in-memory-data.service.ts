import { InMemoryDbService } from 'angular-in-memory-web-api';

// Note we need both id and RowKey, real API doesn't use id only RowKey
export class InMemoryThingService implements InMemoryDbService {
  createDb() {
    const things = [
      { id: 0,  RowKey: 0,  name: 'ZX Spectrum', photo: 'zx-spectrum.jpg', likes: 11, desc: 'Blah'  },
      { id: 11, RowKey: 11, name: 'Commodore 64', photo: 'c64.jpg', likes: 9, desc: 'Blah'  },
      { id: 12, RowKey: 12, name: 'Amstrad CPC 464', photo: 'amstrad-cpc-464.jpg', likes: 6, desc: 'Blah'  },
      { id: 13, RowKey: 13, name: 'ZX81', photo: 'zx81.jpg', likes: 8, desc: 'Blah'  },
      { id: 14, RowKey: 14, name: 'Amiga A500', photo: 'amiga-a500.jpg', likes: 15, desc: 'Blah'  },
      { id: 15, RowKey: 15, name: 'Atari 520ST', photo: 'atari-520st.jpg', likes: 2, desc: 'Blah'  },
      { id: 16, RowKey: 16, name: 'BBC Micro', photo: 'bbc-micro.jpg', likes: 5, desc: 'Blah' },
      { id: 17, RowKey: 17, name: 'Commodore VIC-20', photo: 'vic-20.jpg', likes: 3, desc: 'Blah'  },
      { id: 18, RowKey: 18, name: 'Dragon 32', photo: 'dragon-32.jpg', likes: 4, desc: 'Blah'  },
      { id: 19, RowKey: 19, name: 'Acorn Electron', photo: 'acorn-electron.jpg', likes: 1, desc: 'Blah'  },
      { id: 20, RowKey: 20, name: 'SAM Coupé', photo: 'sam-coupe.jpg', likes: 2, desc: 'Blah'  }
    ];

    return {things};
  }
}