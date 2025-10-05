"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, useResolveAlert } from "@/hooks/useAlerts";

interface Props {
  alert: Alert | null;
  onClose: () => void;
}

export default function AlertModal({ alert, onClose }: Props) {
  const [notes, setNotes] = useState("");
  const resolveAlert = useResolveAlert();

  if (!alert) return null;

  const handleResolve = (status: "CLEARED" | "REPORTED") => {
    resolveAlert.mutate({ id: alert._id, status, notes });
    onClose();
  };

  return (
    <Dialog open={!!alert} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve Alert</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p><strong>Sender:</strong> {alert.sender}</p>
          <p><strong>Receiver:</strong> {alert.receiver}</p>
          <p><strong>Amount:</strong> {alert.amount} HBAR</p>
          <p><strong>Risk:</strong> {alert.riskLevel}</p>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => handleResolve("CLEARED")}>Cleared</Button>
          <Button variant="destructive" onClick={() => handleResolve("REPORTED")}>Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
