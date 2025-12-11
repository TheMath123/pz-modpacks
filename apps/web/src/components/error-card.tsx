export function ErrorCard({ message }: { message: string }) {
  return (
    <div className="text-center py-12 border-2 border-destructive/20 rounded-md p-4 shadow-sm shadow-destructive/10">
      <p className="text-destructive font-medium">
        Error loading modpacks: {message}
      </p>
    </div>
  )
}
