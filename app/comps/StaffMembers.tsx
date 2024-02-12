import React, { useState } from "react";
import people from "../../team.json";
import { StaffMember } from "./StaffMember";
import { Select } from "./Select";

const teams = [...new Set(people.data.map((employee) => employee.team))];
const colors = [
  "red",
  "green",
  "blue",
  "orange",
  "pink",
  "purple",
  "yellow",
  "brown",
  "black",
  "grey",
  "white",
];
const teamData = Object.fromEntries(
  teams.map((department, i) => [
    department,
    {
      color: colors[i],
      count: people.data.filter((employee) => employee.team === department)
        .length,
    },
  ])
);
const selectItems = [
  { text: "All", value: "all" },
  ...teams.map((v) => {
    return { text: `${v} (${teamData[v].count})`, value: v };
  }),
];

export const StaffMembers = () => {
  const [selectedTeams, setSelectedTeams] = useState(teams); // maybe someday multiple departments can be selected
  const onAllDepartmentsClick = () => setSelectedTeams(teams);
  return (
    <div style={{ margin: "30px auto", maxWidth: 500 }}>
      <Select
        onValueChange={(value) => {
          if (value === "all") onAllDepartmentsClick();
          else setSelectedTeams([value]);
        }}
        value={selectedTeams.length === teams.length ? "all" : selectedTeams[0]}
        button={
          <button>
            Departments{" "}
            {selectedTeams.length === teams.length
              ? `All`
              : `${selectedTeams.join(", ")} (${
                  teamData[selectedTeams[0]].count
                })`}
          </button>
        }
        items={selectItems}
      />
      <section
        className="staff-members-container"
        style={{
          height: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
      >
        {people.data
          .filter((member) => selectedTeams.includes(member.team))
          .map((member, i: number) => (
            // might be nice to add id attached to each member - good for animation
            <StaffMember
              key={i}
              onTeamClick={() => setSelectedTeams([member.team])}
              teamData={teamData}
              {...member}
            />
          ))}
        {selectedTeams.length === 1 ? (
          <button onClick={onAllDepartmentsClick}>See all departments</button>
        ) : null}
      </section>
    </div>
  );
};
