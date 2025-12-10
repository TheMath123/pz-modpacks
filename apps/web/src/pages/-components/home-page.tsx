import { PublicModpacks } from './public-modpacks'

export function HomePage() {
  return (
    <main className="container flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Wellcome to PZ Modpacks!</h1>
        <h2 className="text-lg font-medium ">
          Your gateway to the best Project Zomboid modpacks.
        </h2>
      </div>

      <PublicModpacks />
    </main>
  )
}
