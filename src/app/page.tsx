'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Droplets,
  ImageIcon,
  ZoomInIcon as TiltShift,
  Timer,
  Vibrate,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export default function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Sample data - in a real app, this would come from an API or sensors
  const [data, setData] = useState({
    humidity: 68,
    vibration: false,
    rainfall: 12.5,
    tilt: 10.2,
    hasWarning: true,
    warningMessage: 'Độ ẩm cao, có nguy cơ sạt lở',
  });

  // Update the date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    setData({
      humidity: 68,
      vibration: false,
      rainfall: 12.5,
      tilt: 10.2,
      hasWarning: true,
      warningMessage: 'Độ ẩm cao, có nguy cơ sạt lở',
    });
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
    <div className="min-h-screen">
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
        <div className="container">
          {data.hasWarning && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Cảnh báo!</AlertTitle>
              <AlertDescription>{data.warningMessage}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Humidity Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Độ ẩm</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.humidity}%</div>
                <Progress value={data.humidity} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {data.humidity > 70
                    ? 'Độ ẩm cao'
                    : data.humidity < 30
                    ? 'Độ ẩm thấp'
                    : 'Độ ẩm bình thường'}
                </p>
              </CardContent>
            </Card>
            {/* Vibration Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rung chấn</CardTitle>
                <Vibrate className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">
                    {data.vibration ? 'Có' : 'Không'}
                  </div>
                  <Badge variant={data.vibration ? 'destructive' : 'secondary'}>
                    {data.vibration ? 'Đang rung' : 'Ổn định'}
                  </Badge>
                </div>
                <div className="mt-4 h-[40px] flex items-center">
                  <div
                    className={`w-full h-2 rounded-full ${
                      data.vibration ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Rainfall Card */}
            <Card>
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
                <div className="text-2xl font-bold">{data.rainfall} ml</div>
                <div className="mt-4 h-[40px] flex items-end">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className="flex-1 bg-primary/80 mx-0.5 rounded-t"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span>T7</span>
                  <span>CN</span>
                </div>
              </CardContent>
            </Card>
            {/* Tilt Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Độ nghiêng
                </CardTitle>
                <TiltShift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.tilt}°</div>
                <div className="relative mt-20 h-[60px] flex items-center justify-center">
                  <div className="w-[100px] h-[2px] bg-muted-foreground" />
                  <div
                    className="absolute w-[200px] h-[2px] bg-primary origin-center"
                    style={{ transform: `rotate(${data.tilt}deg)` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-10 text-center">
                  {data.tilt > 5 ? 'Độ nghiêng cao' : 'Độ nghiêng bình thường'}
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
                    <TabsTrigger value="camera1">Camera 1</TabsTrigger>
                    <TabsTrigger value="camera2">Camera 2</TabsTrigger>
                    <TabsTrigger value="camera3">Camera 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="camera1">
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src="/placeholder.svg?height=400&width=800"
                        width={800}
                        height={400}
                        alt="Camera 1 feed"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                        Camera 1 - Khu vực A
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="camera2">
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src="/placeholder.svg?height=400&width=800"
                        width={800}
                        height={400}
                        alt="Camera 2 feed"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                        Camera 2 - Khu vực B
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="camera3">
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src="/placeholder.svg?height=400&width=800"
                        width={800}
                        height={400}
                        alt="Camera 3 feed"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                        Camera 3 - Khu vực C
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
