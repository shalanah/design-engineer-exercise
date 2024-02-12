import React, { useState } from "react";
import people from "../../team.json";
import { StaffMember } from "./StaffMember";
import { Select } from "./Select";
import { Cross2Icon } from "@radix-ui/react-icons";

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
  const setAllTeamsSelected = () => setSelectedTeams(teams);
  const total = people.data.length;
  const showAllTeams = selectedTeams.length === teams.length;
  const filteredPeople = people.data.filter((member) =>
    selectedTeams.includes(member.team)
  );
  const count = filteredPeople.length;
  return (
    <div style={{ margin: "30px auto", maxWidth: 500 }}>
      <div
        className="d-flex align-items-center"
        style={{
          fontSize: ".9rem",
          padding: "10px 25px 10px 10px",
          height: 50,
        }}
      >
        <Select
          onValueChange={(value) => {
            if (value === "all") setAllTeamsSelected();
            else setSelectedTeams([value]);
          }}
          value={showAllTeams ? "all" : selectedTeams[0]}
          button={<button>Departments </button>}
          items={selectItems}
        />
        <span style={{ marginLeft: 10 }}>
          {showAllTeams ? null : (
            <>
              {selectedTeams.map((item) => (
                <button
                  onClick={setAllTeamsSelected}
                  className="d-flex align-items-center"
                  style={{
                    gap: ".4em",
                    fontSize: ".75rem",
                    padding: ".25em .75em",
                    border: "1px solid #ccc",
                    borderRadius: "1em",
                  }}
                  key={item}
                >
                  {item}
                  <Cross2Icon width={10} height={10} />
                </button>
              ))}
            </>
          )}
        </span>
        <span style={{ margin: "auto 0 auto auto", fontSize: ".75rem" }}>
          {count} of {total}
        </span>
      </div>
      <section
        className="staff-members-container"
        style={{
          height: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
      >
        {filteredPeople.map((member, i: number) => (
          // might be nice to add id attached to each member - good for animation
          <StaffMember
            key={i}
            onTeamClick={() => setSelectedTeams([member.team])}
            teamData={teamData}
            {...member}
          />
        ))}
        {selectedTeams.length === 1 ? (
          <button onClick={setAllTeamsSelected}>See all departments</button>
        ) : null}
      </section>
    </div>
  );
};
