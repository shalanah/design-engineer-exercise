import React from "react";
import "./StaffMember.css";

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
  teamData: any;
  onTeamClick: () => void;
  itemIndex: number;
};

export const StaffMember = ({
  onTeamClick,
  teamData,
  itemIndex,
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
  const teamColor = teamData[team].color;
  // use dd/dt html tag
  return (
    <div
      className="staff-member"
      style={{
        height: 72,
        // border: "1px solid #e4e8e9",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
        borderRadius: 20,
        margin: "0 15px",
        padding: "15px 15px",
        display: "flex",
        gap: 8,
        fontSize: ".8rem",
        animation:
          itemIndex < 20
            ? `fadeIn 0.5s ease ${itemIndex * 0.15}s both`
            : "fadeIn 0s both",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          // background: "#f7f7f7",
          borderRadius: "50%",
          background: teamColor,
        }}
      />
      <div className="d-flex justify-content-center flex-column">
        <h2 style={{ fontSize: ".9rem" }}>{name}</h2>
        <p>{role}</p>
      </div>
      <div style={{ margin: "auto 0 auto auto" }}>
        <button
          onClick={onTeamClick}
          style={{
            fontSize: ".7rem",
            padding: ".25em 1em",
            borderRadius: "10px",
            display: "flex",
            gap: 8,
            color: teamColor,
            alignItems: "center",
          }}
        >
          {team}
          <div
            style={{
              width: 8,
              height: 8,
              background: "currentColor",
              borderRadius: "50%",
            }}
          />
        </button>
      </div>
      {/* <p>{location}</p> */}
    </div>
  );
};
