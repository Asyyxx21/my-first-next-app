"use client";

import { useEffect, useState } from "react";

type MountStampProps = {
  label: string;
};

export default function MountStamp({ label }: MountStampProps) {
  const [instance, setInstance] = useState("…");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setInstance(Math.random().toString(36).slice(2, 6));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span
      className="mount-stamp"
      title="Идентификатор экземпляра компонента"
    >
      <span className="mount-stamp-dot" aria-hidden="true" />
      {label}: {instance}
    </span>
  );
}
