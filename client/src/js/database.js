import { openDB } from 'idb';
import { header } from './header';

const initdb = async () =>
  openDB('jate-db', 1, {
    async upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate');
      console.log('jate database created');
      await seedDb()
    },
  });

const seedDb = async()=>{
  console.log('SEED the database');
  const jateDB = await openDB('jate-db', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ id: 1, jate: header });
}

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const jateDB = await openDB('jate-db', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  console.log('GET from the database');
  const jateDB = await openDB('jate-db', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(id);
  const result = await request;
  console.log('result.value', result);
  return result;

}

initdb();
