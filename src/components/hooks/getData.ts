import { database } from '@/lib/firebase';
import { ref, onValue  } from 'firebase/database';
interface DataSensorProps {
  doam: number | undefined;
  luongMua: number | undefined;
  nguy_co_sat_lo: number | undefined;
  goc_do: number | undefined;
  soLanGauLat: number | undefined;
  soLanRung10Phut: number | undefined;
}
export function getData(path: string, callback: (data: DataSensorProps) => void) {
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