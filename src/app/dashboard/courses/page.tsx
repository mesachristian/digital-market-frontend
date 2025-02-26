import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CoursesTable } from "./courses-table"
import { CreateCourseButton } from "./create-course-button"

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <CreateCourseButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading courses...</div>}>
            <CoursesTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
