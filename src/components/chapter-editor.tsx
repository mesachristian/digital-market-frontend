"use client"

import * as React from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { ChevronDown, ChevronRight, GripVertical, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
}

export function ChapterEditor() {
  const [chapters, setChapters] = React.useState<Chapter[]>([
    {
      id: "1",
      title: "Chapter 1",
      lessons: [
        { id: "1-1", title: "Lesson 1" },
        { id: "1-2", title: "Lesson 2" },
        { id: "1-3", title: "Lesson 3" },
      ],
    },
  ])
  const [expandedChapters, setExpandedChapters] = React.useState<string[]>(["1"])
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination, type } = result

    if (type === "chapter") {
      const items = Array.from(chapters)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)
      setChapters(items)
      return
    }

    if (type === "lesson") {
      const chapterIndex = chapters.findIndex((chapter) => chapter.id === source.droppableId)
      const newChapters = [...chapters]
      const lessons = Array.from(chapters[chapterIndex].lessons)
      const [reorderedItem] = lessons.splice(source.index, 1)

      if (source.droppableId === destination.droppableId) {
        // Moving within the same chapter
        lessons.splice(destination.index, 0, reorderedItem)
        newChapters[chapterIndex].lessons = lessons
      } else {
        // Moving to a different chapter
        const destChapterIndex = chapters.findIndex((chapter) => chapter.id === destination.droppableId)
        newChapters[chapterIndex].lessons = lessons
        newChapters[destChapterIndex].lessons.splice(destination.index, 0, reorderedItem)
      }

      setChapters(newChapters)
    }
  }

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: "New Chapter",
      lessons: [],
    }
    setChapters([...chapters, newChapter])
    setEditingId(newChapter.id)
    setExpandedChapters([...expandedChapters, newChapter.id])
  }

  const addLesson = (chapterId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
    }
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, lessons: [...chapter.lessons, newLesson] } : chapter,
      ),
    )
    setEditingId(newLesson.id)
  }

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId))
    setExpandedChapters(expandedChapters.filter((id) => id !== chapterId))
  }

  const deleteLesson = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : chapter,
      ),
    )
  }

  const updateTitle = (id: string, newTitle: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === id) {
          return { ...chapter, title: newTitle }
        }
        return {
          ...chapter,
          lessons: chapter.lessons.map((lesson) => (lesson.id === id ? { ...lesson, title: newTitle } : lesson)),
        }
      }),
    )
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chapters</CardTitle>
        <Button onClick={addChapter} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New chapter
        </Button>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="chapters" type="chapter">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {chapters.map((chapter, index) => (
                  <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} className="mb-4">
                        <div className="flex items-center gap-2 rounded-md border bg-card p-2">
                          <div
                            {...provided.dragHandleProps}
                            className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
                          >
                            <GripVertical className="h-4 w-4" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleChapter(chapter.id)}
                          >
                            {expandedChapters.includes(chapter.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          {editingId === chapter.id ? (
                            <Input
                              autoFocus
                              defaultValue={chapter.title}
                              className="h-8"
                              onBlur={(e) => {
                                updateTitle(chapter.id, e.target.value)
                                setEditingId(null)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateTitle(chapter.id, e.currentTarget.value)
                                  setEditingId(null)
                                }
                              }}
                            />
                          ) : (
                            <button
                              onClick={() => setEditingId(chapter.id)}
                              className="flex-1 text-left hover:underline"
                            >
                              {chapter.title}
                            </button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addLesson(chapter.id)}
                            className="ml-auto h-6 w-6 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteChapter(chapter.id)}
                            className="h-6 w-6 p-0 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {expandedChapters.includes(chapter.id) && (
                          <Droppable droppableId={chapter.id} type="lesson">
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps} className="ml-6 mt-2 space-y-2">
                                {chapter.lessons.map((lesson, index) => (
                                  <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="flex items-center gap-2 rounded-md border bg-card p-2"
                                      >
                                        <div
                                          {...provided.dragHandleProps}
                                          className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
                                        >
                                          <GripVertical className="h-4 w-4" />
                                        </div>
                                        {editingId === lesson.id ? (
                                          <Input
                                            autoFocus
                                            defaultValue={lesson.title}
                                            className="h-8"
                                            onBlur={(e) => {
                                              updateTitle(lesson.id, e.target.value)
                                              setEditingId(null)
                                            }}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                updateTitle(lesson.id, e.currentTarget.value)
                                                setEditingId(null)
                                              }
                                            }}
                                          />
                                        ) : (
                                          <button
                                            onClick={() => setEditingId(lesson.id)}
                                            className="flex-1 text-left hover:underline"
                                          >
                                            {lesson.title}
                                          </button>
                                        )}
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => deleteLesson(chapter.id, lesson.id)}
                                          className="ml-auto h-6 w-6 p-0 text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  )
}