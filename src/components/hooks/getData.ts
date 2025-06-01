import { database } from '@/lib/firebase';
import { ref, onValue  } from 'firebase/database';


export function getData(path: string, callback: (data: any) => void) {
  try {
    const dbRef = ref(database, path);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
}