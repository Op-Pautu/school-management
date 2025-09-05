"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"

interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  image: string
  email_id: string
}

interface SchoolCardProps {
  school: School
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={
            school.image.startsWith("/")
              ? school.image
              : `/schoolImages/${school.image}`
          }
          alt={school.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder-school.png"
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {school.name}
        </h3>

        <div className="flex items-start text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-sm">
            <p className="line-clamp-2">{school.address}</p>
            <p className="font-medium">
              {school.city}, {school.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
