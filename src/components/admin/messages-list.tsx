"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageActions } from "@/components/admin/message-actions";
import { SearchInput } from "@/components/admin/search-input";
import { MessageSquare } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface MessagesListProps {
  messages: Message[];
  unreadCount: number;
}

export function MessagesList({ messages, unreadCount }: MessagesListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.message.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "ALL" ||
        (filter === "UNREAD" && !m.isRead) ||
        (filter === "READ" && m.isRead);
      return matchesSearch && matchesFilter;
    });
  }, [messages, search, filter]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search messages..."
        />
        <div className="flex gap-1">
          <Button
            variant={filter === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("ALL")}
          >
            All ({messages.length})
          </Button>
          <Button
            variant={filter === "UNREAD" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("UNREAD")}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === "READ" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("READ")}
          >
            Read ({messages.length - unreadCount})
          </Button>
        </div>
      </div>

      {/* Messages */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">
                {messages.length === 0
                  ? "No messages yet"
                  : "No messages match your search"}
              </p>
              <p className="text-xs mt-1">
                {messages.length === 0
                  ? "Messages from the contact form will appear here"
                  : "Try adjusting your search or filter"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((message) => (
            <Card
              key={message.id}
              className={message.isRead ? "opacity-70" : "border-primary/30"}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{message.name}</h3>
                      {!message.isRead && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>
                    <p className="mt-3 text-sm whitespace-pre-wrap">
                      {message.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <MessageActions
                    messageId={message.id}
                    isRead={message.isRead}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
