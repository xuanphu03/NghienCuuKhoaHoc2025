import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';


export async function getData(path: string) {
  try {
    const snapshot = await get(ref(database, path));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    console.log('No data available');
    return null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
}