import { getAuth } from "@/lib/auth"; 
import Navbar from "@/components/common/Navbar";
import Todos from "@/components/home/Todos";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
const HomePage = async () => {
  const { env } = getCloudflareContext();
  const auth = getAuth(env);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <section>
      <Navbar/> 
      <Todos />
    </section>
  );
};

export default HomePage;