
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { toast } from "@/utils/toast";
import { formatCurrency, formatNumber, formatDate } from "@/utils/format";
import { useModal, Modal } from "@/components/ui/modal";

const Home = () => {
  const navigate = useNavigate();
  const { addNotification } = useApp();
  const modal = useModal();

  const handleShowNotification = () => {
    addNotification({
      message: "This is a new notification from the dashboard",
      type: "info"
    });
    toast.success("Notification added!");
  };

  const showDemoModal = () => {
    modal.open();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Boutique Family Office</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive financial services for families and advisors
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Client Dashboard</CardTitle>
            <CardDescription>
              Access your personal financial information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              View your accounts, documents, and financial goals all in one place.
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Current assets:</p>
              <p className="text-2xl font-bold">{formatCurrency(2450000)}</p>
              <p className="text-sm text-green-600">+{formatNumber(4.2)}% from last month</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/accounts")} className="w-full">
              View Accounts
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Document Center</CardTitle>
            <CardDescription>
              Manage your important financial documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Securely store, access, and share your financial statements and documents.
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Last updated:</p>
              <p className="text-md">{formatDate(new Date(), 'medium')}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/documents")} className="w-full">
              View Documents
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Sales Process Automation</CardTitle>
            <CardDescription>
              For financial advisors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Access the Sales Process Automation System with email templates, client tracking, and ROI analysis.
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <Button onClick={() => navigate("/advisor")} variant="secondary" className="flex-1">
                Advisor Login
              </Button>
              <Button onClick={() => navigate("/advisor?tab=templates")} variant="outline" className="flex-1">
                Email Templates
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Create Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create a demo notification to see the notification system in action.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleShowNotification} className="w-full">
              Create Notification
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Show Toast</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Try out our new toast notification system with different styles.</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button onClick={() => toast.success("This is a success message!")} variant="default">
                Success
              </Button>
              <Button onClick={() => toast.error("This is an error message!")} variant="destructive">
                Error
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button onClick={() => toast.warning("This is a warning message!")} variant="outline">
                Warning
              </Button>
              <Button onClick={() => toast.info("This is an info message!")} variant="secondary">
                Info
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modal Example</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Try out the new modal dialog system.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={showDemoModal} className="w-full">
              Show Modal
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Modal
        open={modal.isOpen}
        onOpenChange={modal.onOpenChange}
        title="Demo Modal"
        description="This is an example of our new modal system."
        buttons={[
          {
            text: "Cancel",
            variant: "outline",
            onClick: modal.close
          },
          {
            text: "Continue",
            variant: "default",
            onClick: () => {
              toast.success("Modal action completed!");
              modal.close();
            }
          }
        ]}
      >
        <div className="py-4">
          <p>This is the content of the modal dialog. You can put any React component or HTML in here.</p>
          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium">Example Form Field:</p>
            <input 
              type="text" 
              className="mt-2 w-full p-2 border border-input rounded" 
              placeholder="Enter some text" 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
