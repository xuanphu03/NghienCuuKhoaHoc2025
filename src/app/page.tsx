'use client';

import { useEffect, useState } from 'react';
import {
  Droplets,
  ImageIcon,
  Radio,
  ZoomInIcon as TiltShift,
  Timer,
  Vibrate,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getData } from '@/components/hooks/getData';
import WarningNotification from '@/components/warning-nofitication';

interface DataSensorProps {
  doam: number | undefined;
  luongMua: number | undefined;
  nguy_co_sat_lo: number | undefined;
  goc_do: number | undefined;
  soLanGauLat: number | undefined;
  soLanRung10Phut: number | undefined;
}

export default function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [isData, isSetData] = useState<DataSensorProps | undefined>();

  // Update the date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    async function fetchData() {
      getData('sensor_data', (data) => {
        isSetData(data);
      });
    }

    fetchData();

    return () => clearInterval(timer);
  }, []);

  // Format date and time in Vietnamese format
  const formattedDateTime = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(currentDateTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 border-b bg-background flex justify-center items-center">
        <div className="container h-16 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Hệ thống Giám sát Môi trường</h1>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <span className="text-sm font-medium">{formattedDateTime}</span>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 flex justify-center">
        <div className="container relative">
          {isData?.nguy_co_sat_lo && (
            <WarningNotification stateWarning={isData.nguy_co_sat_lo} />
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Humidity Card */}
            <Card className="border-l-4 border-l-pink-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Độ ẩm</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isData?.doam}%</div>
                <Progress value={isData?.doam} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {isData?.doam &&
                    (isData?.doam > 70
                      ? 'Độ ẩm cao'
                      : isData?.doam < 30
                      ? 'Độ ẩm thấp'
                      : 'Độ ẩm bình thường')}
                </p>
              </CardContent>
            </Card>
            {/* Vibration Card */}
            <Card
              className={`border-l-4 border-l-green-500 ${
                isData?.nguy_co_sat_lo && 'border-l-red-500'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rung chấn</CardTitle>
                <Vibrate className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">
                    {isData?.nguy_co_sat_lo ? 'Có' : 'Không'}
                  </div>
                  <Badge
                    variant={
                      isData?.nguy_co_sat_lo ? 'destructive' : 'secondary'
                    }
                  >
                    {isData?.nguy_co_sat_lo ? 'Đang rung' : 'Ổn định'}
                  </Badge>
                </div>
                <div className="mt-4 h-[40px] flex items-center">
                  <div
                    className={`w-full h-2 rounded-full ${
                      isData?.nguy_co_sat_lo ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Rainfall Card */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Lượng mưa</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <title>Lượng mưa</title>
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M16 14v6" />
                  <path d="M8 14v6" />
                  <path d="M12 16v6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isData?.luongMua} ml</div>
              </CardContent>

              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Số lần rung trong 10 phút
                </CardTitle>
                <Radio size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isData?.soLanRung10Phut} lần / 10 phút
                </div>
              </CardContent>
            </Card>
            {/* Tilt Card */}
            <Card className="border-l-4 border-l-gray-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Độ nghiêng
                </CardTitle>
                <TiltShift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isData?.goc_do != null
                    ? `${Number(isData.goc_do).toFixed(2)}°`
                    : 'Đang tải...'}
                </div>
                <div className="relative mt-20 h-[60px] flex items-center justify-center">
                  <div className="w-[100px] h-[2px] bg-muted-foreground" />
                  <div
                    className="absolute w-[200px] h-[2px] bg-primary origin-center"
                    style={{ transform: `rotate(${isData?.goc_do}deg)` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-10 text-center">
                  {isData?.goc_do && isData?.goc_do > 5
                    ? 'Độ nghiêng cao'
                    : 'Độ nghiêng bình thường'}
                </p>
              </CardContent>
            </Card>
            {/* Image Display Card */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Hình ảnh giám sát
                </CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="camera1">
                  <TabsList className="mb-4">
                    <TabsTrigger value="camera1">Vị trí 1</TabsTrigger>
                    <TabsTrigger value="camera2">Vị trí 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="camera1">
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2118.4973622726184!2d108.21467158637716!3d16.076778148606035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142184792140755%3A0xd4058cb259787dac!2sUniversity%20of%20Technology%20and%20Education%20-%20University%20of%20%C4%90%C3%A0%20N%E1%BA%B5ng!5e1!3m2!1sen!2s!4v1748315932140!5m2!1sen!2s"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps - Camera 1"
                      />
                      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                        Vị trí 1 - Khu vực A
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="camera2">
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1768.3112768916133!2d108.24919617759537!3d15.973712432541056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421168cbea003d%3A0xabbc1bca6654719f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCwgxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5nIC0gQ8ahIHPhu58gMg!5e1!3m2!1sen!2s!4v1748316207332!5m2!1sen!2s"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps - Camera 2"
                      />
                      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                        Vị trí 2 - Khu vực B
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            
          </div>

          <div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nghiên cứu khoa học. From Xuan Phu with love hẹ hẹ hẹ
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
