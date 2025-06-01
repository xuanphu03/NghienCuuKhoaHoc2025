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

interface WarningNotificationProps {
  stateWarning: number;
}

export default function WarningNotification({ stateWarning }: WarningNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Theo dõi prop stateWarning
  useEffect(() => {
    if (stateWarning === 1) {
      setIsOpen(true);
    }
  }, [stateWarning]);

  const closeWarning = () => {
    setIsOpen(false);
  };

  const handleRemind = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 10000); // Nhắc lại sau 10 giây
  }
  
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 absolute'
      )}
    >
      <div className="text-center space-y-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Cảnh Báo Sạt Lở Đất!
              </DialogTitle>
              <DialogDescription className="text-red-800">
                Hệ thống phát hiện nguy cơ sạt lở đất nghiêm trọng tại khu vực
                bạn đang theo dõi.
              </DialogDescription>
            </DialogHeader>

            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Cảnh báo:</strong> Khu vực được giám sát hiện đang có
                dấu hiệu sạt lở đất. Vui lòng thông báo cho cơ quan chức năng,
                cảnh báo người dân xung quanh và thực hiện các biện pháp ứng phó
                khẩn cấp nếu cần thiết.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleRemind}>
                Nhắc lại sau
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
