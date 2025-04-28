
import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export function NotificationCenter() {
  const { notifications, markNotificationAsRead, unreadNotificationsCount } = useApp();

  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info':
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadNotificationsCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
              variant="destructive"
            >
              {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium">Notifications</h3>
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-4 flex items-start gap-3 cursor-pointer",
                    !notification.read && "bg-muted/50"
                  )}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className={cn(
                    "rounded-full p-1.5",
                    getNotificationColor(notification.type)
                  )}>
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className={!notification.read ? "font-medium" : undefined}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {notifications.length > 0 && (
          <div className="p-2 border-t text-center">
            <Button variant="ghost" size="sm" className="w-full">
              Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
