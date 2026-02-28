-- CreateTable
CREATE TABLE "order" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "order_email_key" ON "order"("email");
