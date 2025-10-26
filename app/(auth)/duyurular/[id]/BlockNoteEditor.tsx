"use client";

import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useCreateBlockNote } from "@blocknote/react";

type BlockNoteEditorProps = {
  content: any;
};

export default function BlockNoteEditor({ content }: BlockNoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent: content ? (content as any as PartialBlock[]) : undefined,
  });

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200">
      <BlockNoteView editor={editor} editable={false} theme="light" />
    </div>
  );
}