
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Accounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Checking Account", institution: "Chase Bank", balance: 5000 },
    { id: 2, name: "Investment Portfolio", institution: "Vanguard", balance: 42000 },
  ]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    institution: "",
    balance: "",
  });
  const [open, setOpen] = useState(false);

  const handleAddAccount = () => {
    if (newAccount.name && newAccount.institution && newAccount.balance) {
      const account = {
        id: accounts.length + 1,
        name: newAccount.name,
        institution: newAccount.institution,
        balance: parseFloat(newAccount.balance),
      };
      setAccounts([...accounts, account]);
      setNewAccount({ name: "", institution: "", balance: "" });
      setOpen(false);
      toast({
        title: "Account added",
        description: `${account.name} has been added to your accounts.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Financial Accounts</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    placeholder="Retirement Account"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={newAccount.institution}
                    onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
                    placeholder="Fidelity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                    placeholder="10000"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAccount}>Add Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {accounts.length > 0 ? (
            <div className="divide-y">
              {accounts.map((account) => (
                <div key={account.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Landmark className="text-green-500" />
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.institution}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">${account.balance.toLocaleString()}</span>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No accounts added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounts;
