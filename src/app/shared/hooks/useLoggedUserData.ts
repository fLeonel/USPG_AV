import { useEffect, useState } from "react";
import { User } from "@/domain/entities/user";

export function useLoggedUserData() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error();

        const data = await res.json();
        setUserData(data.user);
      } catch (error) {
        console.log(error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user: userData, loading };
}
