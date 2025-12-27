export function AppFooter() {
  return (
    <footer className="container mx-auto py-4 text-center text-sm text-muted-foreground flex flex-row gap-4 justify-between flex-wrap items-center">
      <div>
        Made by{' '}
        <a
          href="https://discord.gg/AzGnT9yF2a"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          Greens Group
        </a>
      </div>
      <div>
        &copy; 2025 - {new Date().getFullYear()} | PZ Packs. All rights
        reserved.
      </div>
    </footer>
  )
}
