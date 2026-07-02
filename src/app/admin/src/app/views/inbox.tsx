'use client'

import { useState } from 'react'
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  ChevronLeft,
  MoreHorizontal,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Message, MessageStatus, ProjectCategory } from '@/types/dashboard'
import { cn } from '@/components/ui/utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  getMessages,
  markMessageAsRead,
  deleteMessage,
  createTestimonialFromMessage,
} from '@/app/actions/inboxActions'
import { toast } from 'sonner'

interface InboxPageProps {
  initialMessages?: any[]
}

export function InboxPage({ initialMessages = [] }: InboxPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<MessageStatus | 'All'>('All')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const mapMessages = (list: any[]): Message[] => {
    return list.map((m) => {
      let parsedInterests: ProjectCategory[] = []
      if (m.interests) {
        try {
          if (m.interests.startsWith('[')) {
            parsedInterests = JSON.parse(m.interests)
          } else {
            parsedInterests = m.interests
              .split(',')
              .map((x: string) => x.trim()) as ProjectCategory[]
          }
        } catch (e) {
          parsedInterests = [m.interests as ProjectCategory]
        }
      }
      return {
        id: String(m.id),
        senderName: m.name,
        email: m.email,
        subject: m.phone
          ? `Inquiry from ${m.name} (${m.phone})`
          : `Inquiry from ${m.name}`,
        message: m.message,
        interests: parsedInterests,
        date:
          typeof m.createdAt === 'string'
            ? m.createdAt
            : m.createdAt.toISOString(),
        status: m.isRead ? 'Read' : 'Unread',
      }
    })
  }

  const [messages, setMessages] = useState<Message[]>(() =>
    mapMessages(initialMessages)
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isConverting, setIsConverting] = useState(false)

  const fetchAllMessages = async () => {
    setIsLoading(true)
    try {
      const data = await getMessages()
      setMessages(mapMessages(data))
    } catch (e) {
      toast.error('Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkRead = async (messageId: string) => {
    try {
      const result = await markMessageAsRead(Number(messageId))
      if ('error' in result) {
        toast.error(result.error)
        return
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: 'Read' } : msg
        )
      )
      if (selectedMessage?.id === messageId) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, status: 'Read' } : null
        )
      }
    } catch (error) {
      toast.error('Failed to mark message as read')
    }
  }

  const handleDelete = async (messageId: string) => {
    try {
      const result = await deleteMessage(Number(messageId))
      if ('error' in result) {
        toast.error(result.error)
        return
      }

      setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
      toast.success('Message deleted successfully')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const handleAddToVouts = async (messageId: string) => {
    setIsConverting(true)
    try {
      const result = await createTestimonialFromMessage(Number(messageId))
      if ('error' in result) {
        toast.error(result.error)
        return
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: 'Read' } : msg
        )
      )
      if (selectedMessage?.id === messageId) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, status: 'Read' } : null
        )
      }
      toast.success('Message added to vouts successfully')
    } catch (error) {
      toast.error('Failed to add message to vouts')
    } finally {
      setIsConverting(false)
    }
  }

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message)
    if (message.status === 'Unread') {
      handleMarkRead(message.id)
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'All' || message.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const unreadCount = messages.filter((m) => m.status === 'Unread').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold font-serif">Inbox</h1>
        <p className="text-muted-foreground mt-1">
          Manage messages from your contact form ({unreadCount} unread)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as MessageStatus | 'All')
          }
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Messages</SelectItem>
            <SelectItem value="Unread">Unread</SelectItem>
            <SelectItem value="Read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <Card className="lg:col-span-1 p-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Loading inbox...</p>
            </div>
          ) : (
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No messages found</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className={cn(
                      'w-full text-left p-3 rounded-lg transition-colors hover:bg-accent',
                      selectedMessage?.id === message.id && 'bg-accent',
                      message.status === 'Unread' && 'bg-muted/50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {message.status === 'Unread' ? (
                          <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span
                          className={cn(
                            'text-sm truncate',
                            message.status === 'Unread' && 'font-semibold'
                          )}
                        >
                          {message.senderName}
                        </span>
                      </div>
                      {message.status === 'Unread' && (
                        <Badge className="h-2 w-2 rounded-full p-0 bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p
                      className={cn(
                        'text-sm mb-1 truncate',
                        message.status === 'Unread'
                          ? 'font-medium'
                          : 'text-muted-foreground'
                      )}
                    >
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </button>
                ))
              )}
            </div>
          )}
        </Card>

        {/* Message Detail */}
        <Card className="lg:col-span-2 p-6">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                  className="lg:hidden"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>From: {selectedMessage.senderName}</span>
                    <span>•</span>
                    <span>{selectedMessage.email}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedMessage.date).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddToVouts(selectedMessage.id)}
                    disabled={isConverting}
                  >
                    {isConverting ? 'Adding…' : 'Add to Vouts'}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleMarkRead(selectedMessage.id)}
                        disabled={selectedMessage.status === 'Read'}
                      >
                        <MailOpen className="mr-2 h-4 w-4" />
                        Mark as Read
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(selectedMessage.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMessage.interests &&
                  selectedMessage.interests.length > 0 ? (
                    selectedMessage.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No specific interests indicated
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Message</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-muted-foreground">
              <Mail className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg">Select a message to view</p>
              <p className="text-sm mt-1">
                Choose a message from the list to read its content
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
