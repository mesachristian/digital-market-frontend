"use server"

import { Course } from "@/types/course"
import { revalidatePath } from "next/cache"

const COURSE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5044/courses"

export async function createCourse(data: Omit<Course, "id" | "createdAt" | "updatedAt">) {
    try {
        const response = await fetch(`${COURSE_API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error("Failed to create course")
        }

        console.log("actions createCourse is ok")

        revalidatePath("/dashboard/courses")
        return response.json()
    } catch (error) {
        console.error("Error creating course:", error)
        throw error
    }
}

export async function deleteCourse(id: string) {
    try {
        const response = await fetch(`${COURSE_API_URL}/${id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("Failed to delete course")
        }

        revalidatePath("/dashboard/courses")
        return true
    } catch (error) {
        console.error("Error deleting course:", error)
        throw error
    }
}