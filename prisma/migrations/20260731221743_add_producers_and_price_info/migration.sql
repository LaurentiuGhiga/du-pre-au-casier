-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "priceInfo" TEXT,
ADD COLUMN     "producerId" TEXT;

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_slug_key" ON "Producer"("slug");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
