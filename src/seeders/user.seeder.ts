// seeders/userSeeder.ts
import { User } from "@/modules/user/user.model";
import { Package } from "@/modules/package/package.model";
import { Subscription } from "@/modules/subscription/subscription.model";
import bcrypt from "bcryptjs";

const userSeeder = async () => {
  try {
    const deleteResult = await User.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} user(s)`);

    await User.insertMany([
      {
        name: "Admin",
        email: "admin@gmail.com",
        phone: "08123467123",
        password: await bcrypt.hash("password", 10),
        role: "admin",
        isVerified: true,
      },
      {
        name: "Kevin Pandoh",
        email: "owner@gmail.com",
        phone: "08123467123",
        password: await bcrypt.hash("password", 10),
        role: "owner",
        isVerified: true,
      },
      {
        name: "Mesiasi Supit",
        email: "sashi@test.com",
        phone: "08123467123",
        password: await bcrypt.hash("password", 10),
        role: "owner",
        isVerified: true,
      },
    ]);

    await User.insertMany([
      {
        name: "Kevin",
        email: "tenant@gmail.com",
        phone: "08123467123",
        password: await bcrypt.hash("password", 10),
        role: "tenant",
        isVerified: true,
      },
      {
        name: "Sashi",
        email: "mesiasi@test.com",
        phone: "08123467123",
        password: await bcrypt.hash("password", 10),
        role: "tenant",
        isVerified: true,
      },
    ]);

    console.log("User seeder completed successfully");

    // ✅ Tambahkan Subscription Gratis untuk Owner
    const freePackage = await Package.findOne({ type: "free" });
    if (!freePackage) {
      throw new Error("Free package not found, seed packages first!");
    }

    const owners = await User.find({ role: "owner" });

    const subscriptions = owners.map((owner) => ({
      owner: owner._id,
      package: freePackage._id,
      status: "active",
      duration: 0,
      startDate: new Date(),
      endDate: null,
    }));

    await Subscription.insertMany(subscriptions);
    console.log("Free subscriptions assigned to all owners!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

export default userSeeder;
