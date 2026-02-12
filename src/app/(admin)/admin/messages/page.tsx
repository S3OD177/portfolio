export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { MessagesList } from "@/components/admin/messages-list";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Contact form submissions
        </p>
      </div>
      <MessagesList messages={messages} unreadCount={unreadCount} />
    </div>
  );
}
