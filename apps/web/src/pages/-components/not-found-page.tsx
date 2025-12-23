import { Button } from '@org/design-system/components/ui/button'
import { HouseIcon, SkullIcon } from '@org/design-system/components/ui/icons'
import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Background Noise/Texture Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--primary)_100%)] opacity-15" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Glitching 404 */}
        <div className="relative mb-8">
          <h1 className="animate-pulse text-9xl font-black tracking-tighter text-primary opacity-60 blur-[2px] md:text-[12rem] -z-10">
            404
          </h1>
          <h1 className="absolute inset-0 animate-bounce text-9xl font-black tracking-tighter text-primary md:text-[12rem]">
            404
          </h1>
          <div className="absolute -right-12 -top-12 animate-bounce delay-700">
            <SkullIcon
              size={80}
              weight="duotone"
              className="rotate-12 text-muted-foreground opacity-50"
            />
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold uppercase tracking-widest text-foreground md:text-4xl">
          Brains Not Found
        </h2>

        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          It seems the zombies got to this page before you did. There's nothing
          left here but dead code and debris.
        </p>

        <Button
          asChild
          size="lg"
          className="relative border-border bg-primary text-secondary-foreground hover:bg-primary-hover"
        >
          <Link to="/" className="flex items-center gap-2">
            <HouseIcon size={20} weight="bold" />
            Escape to Base
          </Link>
        </Button>

        <p className="mt-12 animate-pulse text-xs uppercase tracking-widest text-destructive/60">
          Don't make a sound...
        </p>
      </div>

      {/* Random floating particles/dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 100}s linear infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
