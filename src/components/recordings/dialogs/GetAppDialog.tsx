
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GetAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GetAppDialog({ open, onOpenChange }: GetAppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Mobile Recording App</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 flex flex-col items-center">
          <div className="w-40 h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
            <div className="text-xs text-muted-foreground text-center p-4">
              QR Code Placeholder
            </div>
          </div>
          
          <p className="text-sm text-center mb-4">
            Scan this QR code with your mobile device to download the app.
          </p>
          
          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19c-4.3 0-7.8-3.4-7.8-7.8S7.7 3.4 12 3.4s7.8 3.4 7.8 7.8-3.4 7.8-7.8 7.8z"></path>
                <path d="M12 19V3.4"></path>
                <path d="M12 3.4C9.8 6.9 8.5 9.9 8.5 13.5c0 2.3 1.5 4.8 3.5 5.5"></path>
                <path d="M12 3.4c2.2 3.5 3.5 6.5 3.5 10.1 0 2.3-1.5 4.8-3.5 5.5"></path>
              </svg>
              App Store
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Google Play
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            The mobile app allows you to record meetings on-the-go and automatically syncs with your advisor portal.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
