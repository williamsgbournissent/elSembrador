import UserTable from "@/components/UI/UserTable";
import { User } from "./columns";

async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error("Error");
    } else {
      if (Array.isArray(responseData.users)) {
        return responseData.users;
      } else {
        return [];
      }
    }
  } catch (error) {
    console.log("error loading users", error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section className="py-24">
      <div className="container">
        <UserTable users={users} />
      </div>
    </section>
  );
}
