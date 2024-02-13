import React from "react";
import "./StaffMember.css";
import Image from "next/image";

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
  emoji: string;
};

export type StaffMemberDisplayProps = StaffMemberProps & {
  teamData: any;
  onTeamClick: () => void;
  itemIndex: number;
};

const getShorthandCountry = (country: string) => {
  switch (country) {
    case "United States":
      return "USA";
    case "United Kingdom":
      return "UK";
    default:
      return country;
  }
};

export const StaffMember = ({
  onTeamClick,
  teamData,
  itemIndex,
  team = "Engineering",
  name = "Adnan",
  emoji = "memo_1",
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
        // @ts-ignore
        "--outline": teamColor,
        // border: "1px solid #e4e8e9",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
        borderRadius: 20,
        margin: "0 15px",
        padding: "11px 14px",
        display: "flex",
        gap: 10,
        fontSize: ".8rem",
        animation:
          itemIndex < 20
            ? `fadeIn 0.5s ease ${itemIndex * 0.15}s both`
            : "fadeIn 0s both",
      }}
    >
      <div
        style={{
          width: 45,
          height: 45,
          // background: "#f7f7f7",
          borderRadius: "50%",
          position: "relative",
          // overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            background: teamColor,
            borderRadius: "50%",
            opacity: 0.15,
          }}
        />
        <Image
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src={`/avatars/${emoji}.png`}
          alt={name}
          width={60}
          height={60}
        />
      </div>
      <div
        className="d-flex justify-content-center flex-column align-items-start"
        style={{ gap: 2, paddingTop: 4 }}
      >
        <h2 style={{ fontSize: ".9rem" }}>{name}</h2>
        <p>{role}</p>
      </div>
      <div
        style={{
          margin: "auto 0 auto auto",
          fontSize: ".7rem",
          gap: 0,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
        className="d-flex flex-column"
      >
        <button
          onClick={onTeamClick}
          style={{
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
        <div
          className="d-flex align-items-center"
          style={{ gap: 5, paddingRight: 10 }}
        >
          <span>
            {city}, {getShorthandCountry(country)}
          </span>
          <svg width={10} viewBox="0 0 256 256">
            <path
              fill={"currentColor"}
              d="m45 0c-19.537 0-35.375 15.838-35.375 35.375 0 8.722 3.171 16.693 8.404 22.861l26.971 31.764 26.97-31.765c5.233-6.167 8.404-14.139 8.404-22.861.001-19.536-15.837-35.374-35.374-35.374zm0 48.705c-8.035 0-14.548-6.513-14.548-14.548s6.513-14.548 14.548-14.548 14.548 6.513 14.548 14.548-6.513 14.548-14.548 14.548z"
              transform="matrix(2.81 0 0 2.81 1.407 1.407)"
            />
          </svg>
        </div>
      </div>
      {/* <p>{location}</p> */}
    </div>
  );
};
