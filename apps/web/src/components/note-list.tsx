import { noteService } from "@/lib/services";
import { getSession } from "@/lib/auth/utils";
import { NoteCard } from "./note-card";

interface NoteListProps {
  search?: string;
}

export async function NoteList({ search }: NoteListProps) {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }

  const notes = await noteService.getNotes(session.user.id, search);

  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>
          {search
            ? `No notes found matching "${search}"`
            : "No notes yet. Create your first note!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

