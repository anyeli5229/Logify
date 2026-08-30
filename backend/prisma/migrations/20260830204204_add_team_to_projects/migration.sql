-- CreateTable
CREATE TABLE "_ProjectTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectTeam_AB_unique" ON "_ProjectTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectTeam_B_index" ON "_ProjectTeam"("B");

-- AddForeignKey
ALTER TABLE "_ProjectTeam" ADD CONSTRAINT "_ProjectTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTeam" ADD CONSTRAINT "_ProjectTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
