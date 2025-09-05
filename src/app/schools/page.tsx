import SchoolCard from "@/components/school-card"

async function getSchools() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL || ""}/api/schools`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export default async function ShowSchoolsPage() {
  const schools: {
    id: number
    name: string
    address: string
    city: string
    image: string
    contact: string
    state: string
    email_id: string
  }[] = await getSchools()

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Schools</h1>
      {schools.length === 0 && <p>No schools yet.</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </main>
  )
}
