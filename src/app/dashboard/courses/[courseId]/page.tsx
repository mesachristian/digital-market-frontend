import { ChapterEditor } from "@/components/chapter-editor"

export default function ChaptersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Course Chapters</h1>
        <p className="text-muted-foreground">Organize your course content into chapters and lessons</p>
      </div>
      <ChapterEditor />
    </div>
  )
}