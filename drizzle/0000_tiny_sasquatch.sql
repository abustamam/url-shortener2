CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"hit_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "urls_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "slug_idx" ON "urls" USING btree ("slug");