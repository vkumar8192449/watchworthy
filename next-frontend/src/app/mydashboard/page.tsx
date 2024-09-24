"use client";

import Header from "../../components/Header";
import AllRatings from "../../components/AllRating";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../context/UserContext";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect if user is not authenticated
    }
  }, [user, loading, router]);

  return (
    <>
      <Header />
      {loading ? <></> : <AllRatings />}
    </>
  );
}
