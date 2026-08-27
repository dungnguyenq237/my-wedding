import { useState } from "react";

import { weddingConfig } from "../../config/wedding";
import type { PersonConfig } from "../../types/wedding";

const Portrait = ({ person }: { person: PersonConfig }) => {
  const [failed, setFailed] = useState(false);
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="portrait" aria-label={`${person.name} portrait placeholder`}>
      <span aria-hidden="true">{initials}</span>
      {!failed && (
        <img
          src={person.photo}
          alt={person.name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const PersonPage = ({ person }: { person: PersonConfig }) => (
  <article className="person-page">
    <p className="eyebrow">THE {person.role.toUpperCase()}</p>
    <Portrait person={person} />
    <h2 className="script-name">{person.name}</h2>
    <p className="family-label">{person.role === "bride" ? "Daughter" : "Son"} of</p>
    <p className="family-names">
      Mr. {person.father}
      <span>&amp;</span>
      Mrs. {person.mother}
    </p>
  </article>
);

export const InvitationSpread = () => (
  <section className="invitation-spread" aria-labelledby="invitation-title">
    <h1 id="invitation-title" className="sr-only">
      Wedding invitation for {weddingConfig.couple.bride.name} and{" "}
      {weddingConfig.couple.groom.name}
    </h1>
    <PersonPage person={weddingConfig.couple.bride} />
    <div className="spine-ornament" aria-hidden="true">
      <span>✦</span>
      <time dateTime={weddingConfig.date}>{weddingConfig.displayDate}</time>
      <span>✦</span>
    </div>
    <PersonPage person={weddingConfig.couple.groom} />
  </section>
);

