"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash } from "lucide-react"
import type { Course } from "@/types/course"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteCourse } from "./actions"

//import { toast } from "sonner"

export function CourseActions({ course }: { course: Course }) {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    try {
      setIsDeleting(true)
      await deleteCourse(course.id)
      //toast.success("Course deleted successfully")
      setIsDeleteModalOpen(false)
    } catch (error) {
      //toast.error("Failed to delete course")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/dashboard/courses/${course.id}`)}
        className="mr-2"
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit course</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => setIsDeleteModalOpen(true)}>
        <Trash className="h-4 w-4" />
        <span className="sr-only">Delete course</span>
      </Button>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the course and all its contents.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}