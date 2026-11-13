"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import MountStamp from "@/app/components/MountStamp";

interface BlogTemplateProps {
  children: ReactNode;
}

export default function BlogTemplate({ children }: BlogTemplateProps) {
  useEffect(() => {
    console.log("BlogTemplate смонтирован заново");
  }, []);

  return (
    <div className="blog-template">
      <div className="template-badge">
        <span className="status-dot status-dot-blue" aria-hidden="true" />
        <span>template</span>
        <MountStamp label="экземпляр" />
        <span className="template-note">
          создаётся заново при каждом переходе
        </span>
      </div>
      {children}
    </div>
  );
}
