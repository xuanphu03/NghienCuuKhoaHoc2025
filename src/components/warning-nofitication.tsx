'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WarningNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState(false);

  // Demo: Tự động hiển thị thông báo sau 5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setAutoTriggered(true);
    }, 5000);

    // Cleanup timer khi component unmount
    return () => clearTimeout(timer);
  }, []);

  // Hàm kích hoạt thông báo thủ công
  const triggerWarning = () => {
    setIsOpen(true);
    setAutoTriggered(false);
  };

  // Hàm đóng thông báo
  const closeWarning = () => {
    setIsOpen(false);
  };

  // Trong thực tế, bạn có thể thay thế useEffect trên bằng:
  // useEffect(() => {
  //   // Ví dụ: Kiểm tra điều kiện lỗi từ API
  //   const checkErrorCondition = async () => {
  //     try {
  //       const response = await fetch('/api/check-status')
  //       const data = await response.json()
  //       if (data.hasError) {
  //         setIsOpen(true)
  //       }
  //     } catch (error) {
  //       setIsOpen(true)
  //     }
  //   }
  //
  //   // Hoặc kiểm tra localStorage
  //   const hasSeenWarning = localStorage.getItem('hasSeenWarning')
  //   if (!hasSeenWarning) {
  //     setIsOpen(true)
  //   }
  //
  //   // Hoặc kiểm tra props/state từ component cha
  //   if (someErrorCondition) {
  //     setIsOpen(true)
  //   }
  // }, [someErrorCondition])

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 absolute')}
    >
      <div className="text-center space-y-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Cảnh Báo Quan Trọng!
              </DialogTitle>
              <DialogDescription>
                Đây là thông báo cảnh báo xuất hiện ở giữa màn hình
              </DialogDescription>
            </DialogHeader>

            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Lưu ý:</strong> Hệ thống đã phát hiện một vấn đề quan
                trọng cần được xử lý ngay lập tức. Vui lòng kiểm tra và thực
                hiện các biện pháp cần thiết.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={closeWarning}>
                Để Sau
              </Button>
              <Button
                variant="destructive"
                onClick={closeWarning}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Đã Hiểu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
