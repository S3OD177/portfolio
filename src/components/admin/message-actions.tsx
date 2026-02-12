"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";
import {
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
} from "@/lib/actions/messages";
import { useState } from "react";

interface MessageActionsProps {
  messageId: string;
  isRead: boolean;
}

export function MessageActions({ messageId, isRead }: MessageActionsProps) {
  const [loading, setLoading] = useState(false);

  const handleToggleRead = async () => {
    setLoading(true);
    try {
      if (isRead) {
        await markMessageAsUnread(messageId);
        toast.success("Marked as unread");
      } else {
        await markMessageAsRead(messageId);
        toast.success("Marked as read");
      }
    } catch {
      toast.error("Failed to update message");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this message?")) return;
    setLoading(true);
    try {
      await deleteMessage(messageId);
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
    setLoading(false);
  };

  return (
    <div className="flex gap-1 shrink-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleRead}
        disabled={loading}
        title={isRead ? "Mark as unread" : "Mark as read"}
      >
        {isRead ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={loading}
        className="text-destructive hover:text-destructive"
        title="Delete message"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
