import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import { MessageData } from "@/utils/messageGenerator";

type Props = {
  message: string;
  selectedMessages: string[];
  id: string;
  setMessages: React.Dispatch<React.SetStateAction<MessageData[]>>;
};

export const EditModal = ({
  message,
  selectedMessages,
  id,
  setMessages,
}: Props) => {
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = data.get("message");
    setMessages((prev) => {
      return prev.map((msg) => {
        if (msg.id === id) {
          return { ...msg, content: message as string, time: Date.now() };
        }
        return msg;
      });
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="m-0 translate-y-1">
          <CiEdit
            className={`font-normal text-3xl ${
              selectedMessages.includes(id) ? "text-black" : "text-zinc-500"
            }`}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Task</DialogTitle>
            <DialogDescription>Edit your tasks easily.</DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-2" onSubmit={(e) => handleEdit(e)}>
            <input
              type="text"
              placeholder="Add a task"
              defaultValue={message}
              name="message"
              className="outline-none w-full gap-3 border-2 border-black rounded-lg p-2"
            />
            <button
              type="submit"
              className="w-fit px-3 py-1 rounded-lg text-white bg-zinc-800"
            >
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
