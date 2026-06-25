import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // =========================
  // USERS (upsert to avoid duplicate)
  // =========================
  const userData = [
    {
      name: "Sendy",
      email: "sendy@gmail.com",
      phone: "081111111111",
      password: hashedPassword,
      role: "ADMIN",
    },
    {
      name: "Budi",
      email: "budi@gmail.com",
      phone: "082222222222",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Andi",
      email: "andi@gmail.com",
      phone: "083333333333",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Rina",
      email: "rina@gmail.com",
      phone: "084444444444",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Dewi",
      email: "dewi@gmail.com",
      phone: "085555555555",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Fajar",
      email: "fajar@gmail.com",
      phone: "086666666666",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Asep",
      email: "asep@gmail.com",
      phone: "087777777777",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Nina",
      email: "nina@gmail.com",
      phone: "088888888888",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Rahmat",
      email: "rahmat@gmail.com",
      phone: "089999999999",
      password: hashedPassword,
      role: "CUSTOMER",
    },
    {
      name: "Siska",
      email: "siska@gmail.com",
      phone: "081212121212",
      password: hashedPassword,
      role: "CUSTOMER",
    },
  ];

  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        phone: user.phone,
        password: user.password,
        role: user.role,
      },
      create: user,
    });
  }

  console.log("Users seeded");

  // =========================
  // EQUIPMENTS (upsert to avoid duplicate)
  // =========================
  const equipmentData = [
    {
      name: "Speaker JBL EON",
      category: "Speaker",
      price: 500000,
      imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d",
    },
    {
      name: "Mixer Yamaha MG16",
      category: "Mixer",
      price: 350000,
    },
    {
      name: "Microphone Shure SM58",
      category: "Microphone",
      price: 100000,
    },
    {
      name: "Power Amplifier Crown",
      category: "Amplifier",
      price: 450000,
    },
    {
      name: "Subwoofer 18 Inch",
      category: "Speaker",
      price: 600000,
    },
    {
      name: "Wireless Mic Sony",
      category: "Microphone",
      price: 200000,
    },
    {
      name: "Lighting Beam 230W",
      category: "Lighting",
      price: 700000,
    },
    {
      name: "Fog Machine",
      category: "Effect",
      price: 250000,
    },
    {
      name: "DJ Controller Pioneer",
      category: "DJ",
      price: 800000,
    },
    {
      name: "Monitor Speaker",
      category: "Speaker",
      price: 300000,
    },
  ];

  for (const eq of equipmentData) {
    // Check if equipment with same name exists
    const existing = await prisma.equipment.findFirst({
      where: { name: eq.name },
    });
    if (!existing) {
      await prisma.equipment.create({ data: eq });
    }
  }

  console.log("Equipments seeded");

  // ambil data user & equipment
  const allUsers = await prisma.user.findMany();
  const allEquipments = await prisma.equipment.findMany();

  // =========================
  // BOOKINGS + BOOKING ITEMS
  // =========================
  // Check if bookings already exist
  const existingBookings = await prisma.booking.count();
  if (existingBookings === 0) {
    for (let i = 0; i < 10; i++) {
      const user = allUsers[i % allUsers.length];
      const equipment1 = allEquipments[i % allEquipments.length];
      const equipment2 = allEquipments[(i + 1) % allEquipments.length];

      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          totalAmount: equipment1.price + equipment2.price,
          rentalDate: new Date(),
          returnDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          status: i % 2 === 0 ? "CONFIRMED" : "PENDING",
          items: {
            create: [
              {
                equipmentId: equipment1.id,
                priceAtRent: equipment1.price,
              },
              {
                equipmentId: equipment2.id,
                priceAtRent: equipment2.price,
              },
            ],
          },
        },
      });

      console.log(`Booking ${booking.id} seeded`);
    }
  } else {
    console.log("Bookings already exist, skipping...");
  }

  console.log("All seed completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
