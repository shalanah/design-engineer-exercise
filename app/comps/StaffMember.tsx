import React from "react";
import "./StaffMember.css";
import Image from "next/image";
import { TeamButton } from "./TeamButton";
import { getShorthandCountry, StaffMemberProps } from "../utils/team";

export type StaffMemberDisplayProps = StaffMemberProps & {
  teamData: any;
  onTeamClick: () => void;
  itemIndex: number;
  noAnimation?: boolean;
};

export const StaffMember = ({
  onTeamClick,
  teamData,
  itemIndex,
  noAnimation = false,
  team = "Engineering",
  name = "Adnan",
  emoji = "memo_1",
  role = "Software Engineer",
  location = "Global Cost of Living ",
  start_date = "Jan 4, 2016",
  country = "",
  city = "Church Of Living Grace (Cheung Sha Wan) 基督教恩霖堂(長沙灣堂)",
}: StaffMemberDisplayProps) => {
  const teamColor = teamData[team].color;
  // use dd/dt html tag
  return (
    <div
      className="staff-member-container"
      style={{
        // @ts-ignore
        "--outline": teamColor,
        animation: !noAnimation
          ? `fadeIn 0.5s ease ${Math.min(itemIndex, 20) * 0.15}s both` // TODO: make a min func
          : "fadeIn 0s both",
      }}
    >
      <div className="photo-container">
        <div className="pos-full pos-up-left photo-bg" />
        <Image
          className="photo"
          src={`/avatars/${emoji}.png`}
          alt={name}
          width={60}
          height={60}
        />
      </div>
      <div
        className="d-flex justify-content-center flex-column align-items-start gap-2"
        style={{ paddingTop: 4 }}
      >
        <h2 style={{ fontSize: ".9rem" }} className="text">
          {name}
        </h2>
        <p>{role}</p>
      </div>
      <div
        style={{
          margin: "auto 0 auto auto",
          fontSize: ".7rem",
        }}
        className="d-flex flex-column align-items-end justify-content-end"
      >
        <TeamButton onClick={onTeamClick} color={teamColor} team={team} />
        <div
          className="d-flex align-items-center gap-5"
          style={{ paddingRight: 10, textAlign: "right" }}
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
    </div>
  );
};
