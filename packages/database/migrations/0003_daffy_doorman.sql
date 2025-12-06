ALTER TABLE "modpacks" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "modpacks_members" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;