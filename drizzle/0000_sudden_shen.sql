CREATE TABLE IF NOT EXISTS "course_trainer" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"trainer_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"subject" varchar(255) NOT NULL,
	"participants" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"price" numeric(10, 2) NOT NULL,
	"numeric_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"training_subjects" text[] NOT NULL,
	"location" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "trainers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
