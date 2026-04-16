-- CreateTable
CREATE TABLE "habits" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT,
    "color" TEXT NOT NULL DEFAULT '#10B981',
    "icon" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_weeks" (
    "id" TEXT NOT NULL,
    "week_number" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habit_weeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_tracks" (
    "id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "week_id" TEXT NOT NULL,
    "track_date" DATE NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habit_tracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "habits_user_id_idx" ON "habits"("user_id");

-- CreateIndex
CREATE INDEX "habit_weeks_week_number_idx" ON "habit_weeks"("week_number");

-- CreateIndex
CREATE UNIQUE INDEX "habit_weeks_week_number_start_date_key" ON "habit_weeks"("week_number", "start_date");

-- CreateIndex
CREATE INDEX "habit_tracks_habit_id_idx" ON "habit_tracks"("habit_id");

-- CreateIndex
CREATE INDEX "habit_tracks_week_id_idx" ON "habit_tracks"("week_id");

-- CreateIndex
CREATE INDEX "habit_tracks_track_date_idx" ON "habit_tracks"("track_date");

-- CreateIndex
CREATE UNIQUE INDEX "habit_tracks_habit_id_track_date_key" ON "habit_tracks"("habit_id", "track_date");

-- AddForeignKey
ALTER TABLE "habit_tracks" ADD CONSTRAINT "habit_tracks_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_tracks" ADD CONSTRAINT "habit_tracks_week_id_fkey" FOREIGN KEY ("week_id") REFERENCES "habit_weeks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
