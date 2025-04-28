
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
              Access the Sales Process Automation System and manage your clients.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/advisor")} variant="secondary" className="w-full">
              Advisor Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
