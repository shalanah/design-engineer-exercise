import React, { useState } from "react";
import team from "../../team.json";
import { StaffMember } from "./StaffMember";

const departmentList = [...new Set(team.data.map((employee) => employee.team))];
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
const departmentWithColors = Object.fromEntries(
  departmentList.map((department, i) => [department, colors[i]])
);

export const StaffMembers = () => {
  const [departmentsSelected, setDepartmentsSelected] =
    useState(departmentList);
  const onAllDepartmentsClick = () => setDepartmentsSelected(departmentList);
  return (
    <section
      style={{
        margin: "30px auto",
        maxWidth: 500,
        height: "calc(100vh - 200px)",
        overflowY: "auto",
      }}
    >
      {team.data
        .filter((member) => departmentsSelected.includes(member.team))
        .map((member, i: number) => (
          // might be nice to add id attached to each member - good for animation
          <StaffMember
            key={i}
            onDepartmentClick={() => setDepartmentsSelected([member.team])}
            departmentWithColors={departmentWithColors}
            {...member}
          />
        ))}
      {departmentsSelected.length === 1 ? (
        <button onClick={onAllDepartmentsClick}>See all departments</button>
      ) : null}
    </section>
  );
};
