import { Suspense } from "react";

import { NoteList } from "@/components/note-list";
import { CreateNoteButton } from "@/components/create-note-button";
import { SearchInput } from "@/components/search-input";

interface HomePageProps {
  searchParams: Promise<{ search?: string }>;
}

function NotesLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Suspense
          fallback={
            <div className="h-9 w-full max-w-md rounded-md bg-muted animate-pulse" />
          }
        >
          <SearchInput />
        </Suspense>
        <CreateNoteButton />
      </div>
      <Suspense fallback={<NotesLoading />}>
        <NoteList search={search} />
      </Suspense>
    </div>
  );
}
