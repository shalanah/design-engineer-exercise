import React, { useState } from "react";
import people from "../../team.json";
import { StaffMember } from "./StaffMember";
import { Select } from "./Select";
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

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
  const [isSearching, setIsSearching] = useState(false); // maybe someday multiple departments can be selected
  const [search, setSearch] = useState(""); // maybe someday multiple departments can be selected
  const setAllTeamsSelected = () => setSelectedTeams(teams);
  const total = people.data.length;
  const showAllTeams = selectedTeams.length === teams.length;
  const cleanSearch = search.trim();
  const useSearch = cleanSearch.length > 0;
  const filteredPeople = people.data.filter(
    (member) =>
      selectedTeams.includes(member.team) &&
      (!isSearching ||
        !useSearch ||
        member.name.toLowerCase().includes(search.toLowerCase()))
  );
  const count = filteredPeople.length;
  return (
    <div style={{ margin: "30px auto", maxWidth: 500 }}>
      <div
        className="d-flex align-items-center"
        style={{
          fontSize: ".9rem",
          padding: "0px 38px 0px 30px",
          height: 50,
          borderBottom: "1px solid #efefef",
          gap: 10,
        }}
      >
        <button onClick={() => setIsSearching(true)} style={{ lineHeight: 0 }}>
          <MagnifyingGlassIcon width={20} height={20} />
        </button>
        {isSearching && (
          <label>
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        )}
        <Select
          onValueChange={(value) => {
            if (value === "all") setAllTeamsSelected();
            else setSelectedTeams([value]);
          }}
          value={showAllTeams ? "all" : selectedTeams[0]}
          button={
            <button
              className="d-flex align-items-center"
              style={{ gap: 3, marginLeft: 5 }}
            >
              Departments <ChevronDownIcon style={{ marginTop: "-2" }} />
            </button>
          }
          items={selectItems}
        />
        <span>
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
          height: "500px",
          overflowY: "auto",
          position: "relative",
          gap: 10,
          display: "flex",
          flexDirection: "column",
          scrollMargin: "10px",
          borderBottom: "1px solid #efefef",
        }}
      >
        <div
          style={{
            height: 10,
            flexShrink: 0,
          }}
        />
        {filteredPeople.map((member, i: number) => (
          // might be nice to add id attached to each member - good for animation
          <StaffMember
            itemIndex={i}
            key={`${member.name}-${i}-${selectedTeams.join("-")}`}
            onTeamClick={() => setSelectedTeams([member.team])}
            teamData={teamData}
            {...member}
          />
        ))}
        <div
          style={{
            height: 10,
            flexShrink: 0,
          }}
        />
        {/* Text if nothing is selected */}
        {/* {selectedTeams.length === 1 ? (
          <button onClick={setAllTeamsSelected}>See all departments</button>
        ) : null} */}
      </section>
    </div>
  );
};
