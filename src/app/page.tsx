"use client";

import { useUserStore } from "../store/user.store";

export default function Home() {

  const {user} = useUserStore((state) => state);

  console.log("User in Home page:", user);
  
  
  return (
    <div>{user ? user.name : "No user found"}</div>
  );
};