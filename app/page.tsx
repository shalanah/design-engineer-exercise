"use client";

import { StaffMembers } from "./comps/StaffMembers";
import { StaffContextProvider } from "./hooks/useStaffContext";

export default function Home() {
  return (
    <main>
      <StaffContextProvider>
        <StaffMembers />
      </StaffContextProvider>
    </main>
  );
}
