import team from "../team.json";
import { StaffMember, StaffMemberProps } from "./base/StaffMember";

export default function Home() {
  return (
    <main>
      <section>
        {team.data.map((member: StaffMemberProps, i: number) => (
          // might be nice to add id attached to each member - good for animation
          <StaffMember key={i} {...member} />
        ))}
      </section>
    </main>
  );
}
