import { Course } from "@/types/course"

const COURSE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5044/courses"

export async function getCourses(): Promise<Course[]> {
    try {
        const response = await fetch(`${COURSE_API_URL}`, {
            next: {
                revalidate: 300, // Cache for 5 minutes
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch courses")
        }

        return response.json()
    } catch (error) {
        console.error("Error fetching courses:", error)
        throw error
    }
}