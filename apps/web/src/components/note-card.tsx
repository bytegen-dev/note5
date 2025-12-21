"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ElectricBorder from "@/components/ElectricBorder";
import type { Note } from "@notes/database";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to handle system theme preference
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const borderColor = isDark ? "oklch(70% 0.211 285.75)" : "oklch(47.8% 0.211 285.75)";

  return (
    <Link href={`/notes/${note.id}`}>
      <div
        className="relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <ElectricBorder
            color={borderColor}
            speed={1}
            chaos={1}
            thickness={2}
            className="h-full"
          >
            <Card className="h-full transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {note.content}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </ElectricBorder>
        ) : (
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="line-clamp-2">{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {note.content}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Link>
  );
}

