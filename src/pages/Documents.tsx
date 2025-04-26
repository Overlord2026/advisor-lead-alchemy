
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Documents = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState([
    { id: 1, name: "Tax Return 2024.pdf", date: "2024-04-20" },
    { id: 2, name: "Insurance Policy.pdf", date: "2024-04-18" },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = {
        id: files.length + 1,
        name: e.target.files[0].name,
        date: new Date().toISOString().split('T')[0],
      };
      setFiles([...files, newFile]);
      toast({
        title: "File uploaded",
        description: `${newFile.name} has been uploaded successfully.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <Button size="sm" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </label>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {files.length > 0 ? (
            <div className="divide-y">
              {files.map((file) => (
                <div key={file.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">Uploaded on {file.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No documents uploaded yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
