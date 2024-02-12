import React from "react";

export type StaffMemberProps = {
  team: string;
  name: string;
  role: string;
  location: string;
  salary: string;
  avatar: string;
  start_date: string;
  country: string;
  city: string;
};

export type StaffMemberDisplayProps = StaffMemberProps & {
  departmentWithColors: any;
  onDepartmentClick: () => void;
};

export const StaffMember = ({
  onDepartmentClick,
  departmentWithColors,
  team = "Engineering",
  name = "Adnan",
  role = "Software Engineer",
  location = "Global Cost of Living ",
  salary = "$157,827",
  avatar = "Placeholder_avatar.jpg",
  start_date = "Jan 4, 2016",
  country = "",
  city = "Church Of Living Grace (Cheung Sha Wan) 基督教恩霖堂(長沙灣堂)",
}: StaffMemberDisplayProps) => {
  // use dd/dt html tag
  return (
    <div
      style={{
        border: "1px solid red",
        borderRadius: 20,
        padding: "15px 15px",
        display: "flex",
        gap: 8,
        fontSize: ".8rem",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          background: "#f7f7f7",
          borderRadius: "50%",
        }}
      />
      <div className="d-flex justify-content-center flex-column">
        <h2 style={{ fontSize: ".9rem" }}>{name}</h2>
        <p>{role}</p>
      </div>
      <div style={{ margin: "auto 0 auto auto" }}>
        <button
          onClick={onDepartmentClick}
          style={{
            fontSize: ".7rem",
            padding: ".25em 1em",
            borderRadius: "10px",
            display: "flex",
            gap: 8,
            color: departmentWithColors[team],
            alignItems: "center",
          }}
        >
          {team}
          <div
            style={{
              width: 8,
              height: 8,
              background: departmentWithColors[team],
              borderRadius: "50%",
            }}
          />
        </button>
      </div>
      {/* <p>{location}</p> */}
    </div>
  );
};
