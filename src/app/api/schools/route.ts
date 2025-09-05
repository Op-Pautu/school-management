import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/prisma"

// GET - Fetch all schools
export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(schools)
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    )
  }
}

// POST - Add new school
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const contact = formData.get("contact") as string
    const email_id = formData.get("email_id") as string
    const image = formData.get("image") as File

    // Validate required fields
    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !contact ||
      !email_id ||
      !image
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate contact number (10 digits)
    const contactRegex = /^\d{10}$/
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { error: "Contact must be a 10-digit number" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSchool = await prisma.school.findFirst({
      where: { email_id },
    })

    if (existingSchool) {
      return NextResponse.json(
        { error: "School with this email already exists" },
        { status: 400 }
      )
    }

    // Handle image upload
    let imagePath = ""
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const fileExtension = image.name.split(".").pop()
      const filename = `school_${timestamp}.${fileExtension}`

      // Create schoolImages directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), "public", "schoolImages")
      try {
        await mkdir(uploadDir, { recursive: true })
      } catch (error) {
        // Directory might already exist, ignore error
      }

      // Save file
      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)
      imagePath = filename
    }

    // Save to database
    const school = await prisma.school.create({
      data: {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image: imagePath,
      },
    })

    return NextResponse.json(school, { status: 201 })
  } catch (error) {
    console.error("Error creating school:", error)
    return NextResponse.json(
      { error: "Failed to create school" },
      { status: 500 }
    )
  }
}
