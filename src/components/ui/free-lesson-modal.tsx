'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Play } from 'lucide-react'

interface FreeLessonModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  videoId: string
}

export function FreeLessonModal({
  isOpen,
  onClose,
  courseTitle,
  videoId,
}: FreeLessonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Primeira aula grátis
          </DialogTitle>
          <DialogDescription>
            Assista e conheça a qualidade do curso. Bons estudos!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={courseTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
