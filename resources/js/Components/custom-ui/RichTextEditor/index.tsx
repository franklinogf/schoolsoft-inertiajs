import { Button } from "@/Components/ui/button";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  RedoIcon,
  Strikethrough,
  Underline as UnderlineIcon,
  UndoIcon,
  Unlink,
} from "lucide-react";
import { useEffect } from "react";
import "./rich-text-editor.css";

interface RichTextEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "",
  disabled,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Highlight,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Superscript,
      SubScript,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.isEmpty ? "" : editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "border-input block field-sizing-content min-h-16 w-full bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "prose prose-sm sm:prose-base max-w-full",
        ),
      },
    },
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("relative w-full overflow-hidden rounded-md border pb-3", className)}>
      <div className="sticky top-0 left-0 z-20 flex w-full items-center justify-between border-b bg-transparent">
        <ToolBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
function ToolBarButton({
  onClick,
  disabled,
  icon,
  active,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Button
      className={cn("size-8 cursor-pointer rounded-none", {
        "bg-accent": active,
      })}
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
}
function ToolBar({ editor }: { editor: Editor }) {
  return (
    <ScrollArea className="w-full pb-0.5 whitespace-nowrap">
      <div className="flex w-max items-center">
        <ToolBarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          icon={<UndoIcon className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          icon={<RedoIcon className="size-4" />}
        />

        <Separator orientation="vertical" className="h-6!" />

        <ToolBarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          icon={<Bold className="size-4" />}
          active={editor.isActive("bold")}
        />

        <ToolBarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          icon={<Strikethrough className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={<Italic className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          icon={<UnderlineIcon className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={!editor.can().chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
          icon={<Highlighter className="size-4" />}
        />
        <Separator orientation="vertical" className="h-6!" />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          icon={<Heading1 className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          icon={<Heading2 className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          icon={<Heading3 className="size-4" />}
        />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
          active={editor.isActive("heading", { level: 4 })}
          icon={<Heading4 className="size-4" />}
        />
        <Separator orientation="vertical" className="h-6!" />

        <ToolBarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          icon={<AlignLeft className="size-4" />}
        />

        <ToolBarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          disabled={!editor.can().chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          icon={<AlignCenter className="size-4" />}
        />

        <ToolBarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          icon={<AlignRight className="size-4" />}
        />

        <ToolBarButton
          aria-label="Align justify"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
          icon={<AlignJustify className="size-4" />}
        />
        <Separator orientation="vertical" className="h-6!" />
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={<List className="size-4" />}
        />

        <ToolBarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          icon={<ListOrdered className="size-4" />}
        />
        <Separator orientation="vertical" className="h-6!" />
        <ToolBarButton
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor
                .chain()
                .focus()
                .setLink({
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                })
                .run();
            }
          }}
          disabled={!editor.can().chain().focus().setLink({ href: "https://example.com" }).run()}
          data-state={editor.isActive("link") ? "on" : "off"}
          icon={<LinkIcon className="size-4" />}
        />

        <ToolBarButton
          onClick={() => {
            editor.chain().focus().unsetLink().run();
          }}
          disabled={!editor.can().chain().focus().unsetLink().run()}
          icon={<Unlink className="size-4" />}
        />
      </div>
      <ScrollBar orientation="horizontal" className="h-1.5!" />
    </ScrollArea>
  );
}
