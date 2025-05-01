
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  UploadCloud, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  FileSpreadsheet 
} from "lucide-react";
import { LeadSource, ImportResult } from "@/types/leadSources";
import { LeadSourceService } from "@/services/LeadSourceService";
import { toast } from "@/utils/toast";

interface CSVImportProps {
  leadSource: LeadSource;
  onSuccess?: (result: ImportResult) => void;
  onClose: () => void;
}

const CSVImport = ({ leadSource, onSuccess, onClose }: CSVImportProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Only accept CSV files
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    
    try {
      // Read the file content
      const text = await readFileAsText(selectedFile);
      
      // Parse CSV (simple implementation - would use a more robust parser in production)
      const rows = parseCSV(text, leadSource.config?.delimiter as string || ',');
      
      // Extract preview rows (up to 5)
      const previewRows = rows.slice(0, 5);
      
      setPreview(previewRows);
    } catch (err) {
      setError('Failed to read file: ' + err.message);
      console.error(err);
    }
  };
  
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  
  const parseCSV = (text: string, delimiter = ','): any[] => {
    const rows = text.split('\n');
    
    // Skip header row if configured
    const startIndex = leadSource.config?.has_header !== false ? 1 : 0;
    
    // Get column mapping
    const mapping = leadSource.config?.mapping || {
      first_name: 'first_name',
      last_name: 'last_name',
      email: 'email',
      phone: 'phone'
    };
    
    // Get headers row for mapping
    const headers = leadSource.config?.has_header !== false
      ? rows[0].split(delimiter).map(header => header.trim())
      : [];
    
    return rows.slice(startIndex).filter(row => row.trim()).map(row => {
      const values = row.split(delimiter);
      
      // If we have headers, use them to map values
      if (headers.length > 0) {
        const record: Record<string, string> = {};
        
        headers.forEach((header, index) => {
          if (index < values.length) {
            record[header] = values[index].trim();
          }
        });
        
        return {
          firstName: record[mapping.first_name as string] || '',
          lastName: record[mapping.last_name as string] || '',
          email: record[mapping.email as string] || '',
          phone: record[mapping.phone as string] || '',
          // Store the full record
          ...record
        };
      } 
      
      // No headers, use positional mapping
      return {
        firstName: values[0]?.trim() || '',
        lastName: values[1]?.trim() || '',
        email: values[2]?.trim() || '',
        phone: values[3]?.trim() || '',
      };
    });
  };
  
  const handleImport = async () => {
    if (!file) return;
    
    try {
      setImporting(true);
      
      // Read the file content
      const text = await readFileAsText(file);
      
      // Parse CSV
      const rows = parseCSV(text, leadSource.config?.delimiter as string || ',');
      
      // Call the import API
      const result = await LeadSourceService.importLeadSource(leadSource.id, rows);
      
      setImportResult(result);
      
      toast.success(`Successfully imported ${result.imported} records`);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      setError('Import failed: ' + err.message);
      toast.error('Import failed');
      console.error(err);
    } finally {
      setImporting(false);
    }
  };
  
  const renderPreview = () => {
    if (preview.length === 0) return null;
    
    const headers = Object.keys(preview[0]).slice(0, 6); // Limit to first 6 columns
    
    return (
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              {headers.map((header, index) => (
                <th key={index} className="px-2 py-1 text-left text-xs font-medium text-muted-foreground border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-muted last:border-0">
                {headers.map((header, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`} className="px-2 py-1 truncate max-w-[150px]">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-2">
          Preview showing {preview.length} of {file ? 'many' : '0'} rows
        </p>
      </div>
    );
  };
  
  const renderResults = () => {
    if (!importResult) return null;
    
    return (
      <div className="mt-4 p-4 border rounded-lg bg-green-50">
        <div className="flex items-center">
          <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
          <div>
            <h4 className="font-medium">Import Complete</h4>
            <p className="text-sm">
              Successfully imported {importResult.imported} records. 
              {importResult.failed > 0 && ` ${importResult.failed} records failed.`}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  const renderError = () => {
    if (!error) return null;
    
    return (
      <div className="mt-4 p-4 border rounded-lg bg-red-50">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <div>
            <h4 className="font-medium">Error</h4>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="relative">
        <CardTitle>Import from {leadSource.name}</CardTitle>
        <CardDescription>
          Upload a CSV file to import leads from {leadSource.name}
        </CardDescription>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {!file && !importResult && (
          <div className="border-2 border-dashed rounded-lg p-10 text-center">
            <div className="flex flex-col items-center">
              <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">Upload CSV File</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your CSV file here, or click to browse
              </p>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('csv-file')?.click()}
              >
                <UploadCloud className="h-4 w-4 mr-2" /> Select File
              </Button>
              <input 
                id="csv-file"
                type="file" 
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}
        
        {file && !importResult && (
          <div>
            <div className="flex items-center">
              <FileSpreadsheet className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <h4 className="font-medium">{file.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto"
                onClick={() => {
                  setFile(null);
                  setPreview([]);
                  setError(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {renderPreview()}
            {renderError()}
          </div>
        )}
        
        {importResult && renderResults()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        
        {file && !importResult && (
          <Button onClick={handleImport} disabled={importing}>
            {importing ? 'Importing...' : 'Import Data'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CSVImport;
