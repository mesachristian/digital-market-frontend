import { getCourses } from "@/lib/courses"
//import { formatDate } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CourseActions } from "./course-actions"

export async function CoursesTable() {
    const courses = await getCourses()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => (
                    <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>
                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
                                {course.paymentType}
                            </span>
                        </TableCell>
                        <TableCell>{course.createdAt}</TableCell>
                        <TableCell className="text-right">
                            <CourseActions course={course} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}