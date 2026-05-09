/* eslint-disable */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Dummy Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@bintang-audio.com" },
    update: {},
    create: {
      name: "Admin Bintang",
      email: "admin@bintang-audio.com",
      phone: "081281916880",
      role: "ADMIN",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "budi.santoso@example.com" },
    update: {},
    create: {
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      phone: "08123456789",
      role: "CUSTOMER",
    },
  });

  // 2. Create Dummy Equipment
  const equipmentData = [
    {
      name: "Yamaha DXR15",
      category: "Speaker",
      price: 500000,
      imageUrl: "https://images.unsplash.com/photo-1751810458361-bcf5913e31ef?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "AVAILABLE",
    },
    {
      name: "QSC K12.2 Active Loudspeaker",
      category: "Speaker",
      price: 450000,
      imageUrl: "https://images.unsplash.com/photo-1605367355152-441604a43b23?q=80&w=600&auto=format&fit=crop",
      status: "AVAILABLE",
    },
    {
      name: "JBL SRX815P",
      category: "Speaker",
      price: 600000,
      imageUrl: "https://images.unsplash.com/photo-1596765796248-26f50b284988?q=80&w=600&auto=format&fit=crop",
      status: "AVAILABLE",
    },
    {
      name: "Korg Kronos 2 88-Key",
      category: "Keyboard",
      price: 1200000,
      imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop",
      status: "AVAILABLE",
    },
    {
      name: "Yamaha Montage 8",
      category: "Keyboard",
      price: 1500000,
      imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=600&auto=format&fit=crop",
      status: "AVAILABLE",
    },
    {
      name: "Behringer X32 Digital Mixer",
      category: "Mixer",
      price: 1800000,
      imageUrl: "https://images.unsplash.com/photo-1595520467722-98c9fd0f8fbd?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "AVAILABLE",
    },
    {
      name: "Allen & Heath SQ-5",
      category: "Mixer",
      price: 2000000,
      imageUrl: "https://images.unsplash.com/photo-1615599865187-28562140bbd0?q=80&w=600&auto=format&fit=crop",
      status: "AVAILABLE",
    },
    {
      name: "Shure SM58 Dynamic Vocal Mic",
      category: "Microphone",
      price: 150000,
      imageUrl: "https://images.unsplash.com/photo-1662049373330-b22c93d21c27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "AVAILABLE",
    },
    {
      name: "Sennheiser EW 100 G4 Wireless",
      category: "Microphone",
      price: 350000,
      imageUrl: "https://images.unsplash.com/photo-1583344604584-6997b695191b?q=80&w=600&auto=format&fit=crop",
      status: "RENTED",
    },
    {
      name: "XLR Cable 10m Pro Set",
      category: "Cables",
      price: 50000,
      imageUrl: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=600&auto=format&fit=crop",
      status: "AVAILABLE",
    },
  ];

  for (const item of equipmentData) {
    await prisma.equipment.create({
      data: {
        name: item.name,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl,
        status: item.status as "AVAILABLE" | "RENTED",
      },
    });
  }

  // 3. Create a Dummy Booking
  const rentedEq = await prisma.equipment.findFirst({
    where: { status: "RENTED" },
  });

  if (rentedEq) {
    const rentalDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 2); // 2 days from now

    await prisma.booking.create({
      data: {
        userId: customer.id,
        rentalDate: rentalDate,
        returnDate: returnDate,
        status: "CONFIRMED",
        totalAmount: rentedEq.price * 2,
        items: {
          create: [
            {
              equipmentId: rentedEq.id,
              priceAtRent: rentedEq.price,
            },
          ],
        },
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

