"use client";

import moment from "moment";
import { v4 as uuid } from "uuid";
import { MessageData } from "@/utils/messageGenerator";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimatedListItem } from "@/components/animated-list-item";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { EditModal } from "@/components/modal";

export default function Home() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");

  const formatDate = (time: any) => {
    var momentObj = moment(time);
    var timeAgo = momentObj.fromNow();
    return timeAgo;
  };
  const addMessage = () => {
    setMessages((prev) => {
      if (task.trim() === "") return [...prev];
      return [...prev, { id: uuid(), content: task, time: Date.now() }];
    });
    setTask("");
  };

  const toggleMessage = (id: string) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages((prev) => {
        return prev.filter((i) => i != id);
      });
    } else {
      setSelectedMessages((prev) => {
        return [...prev, id];
      });
    }
  };

  const archiveMessages = () => {
    setMessages((prev) =>
      prev.filter((message) => !selectedMessages.includes(message.id))
    );
    setSelectedMessages([]);
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-zinc-900">
      <h1 className="text-neutral-50 text-6xl font-bold">To-do List 📋</h1>
      <div className="h-[400px] w-full max-w-lg">
        <div className="bg-white rounded-xl">
          <div className="flex gap-3 w-full border-b-zinc-100 border-b-[1px] p-4">
            <input
              type="text"
              placeholder="Add a task"
              value={task}
              className="outline-none w-full gap-3"
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="text-neutral-50 rounded-md px-2 bg-sky-400 hover:bg-sky-500 py-1 hover:text-neutral-200"
              onClick={addMessage}
            >
              <FaPlus />
            </button>
            <button
              className="text-neutral-50 mx-2 rounded-md px-2 bg-red-400 hover:bg-red-500 py-1 hover:text-neutral-200"
              onClick={archiveMessages}
            >
              <MdDelete />
            </button>
          </div>
          <div className="overflow-y-scroll px-3 py-2 max-h-[400px]">
            <ul>
              <AnimatePresence initial={false}>
                {messages.length == 0 && (
                  <AnimatedListItem>
                    <div className="flex items-center justify-center gap-1 flex-col">
                      <h1 className="text-center font-semibold py-1">
                        You have no tasks.
                      </h1>
                      <i className="text-center w-full">Add One!</i>
                    </div>
                  </AnimatedListItem>
                )}
                {[...messages].reverse().map((message) => (
                  <AnimatedListItem key={message.id}>
                    <div className="py-0.5 transition">
                      <div
                        className={`flex w-full p-4 justify-between items-center rounded-md transition-colors ${
                          selectedMessages.includes(message.id)
                            ? "bg-blue-400"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex flex-col">
                          <p
                            className={`font-medium transition-colors ${
                              selectedMessages.includes(message.id)
                                ? "text-white"
                                : "text-zinc-600"
                            }`}
                          >
                            {message.content}
                          </p>
                          <span
                            className={`text-sm transition-colors ${
                              selectedMessages.includes(message.id)
                                ? "text-zinc-100"
                                : "text-zinc-400"
                            }`}
                          >
                            {formatDate(message.time)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleMessage(message.id)}>
                            <CiBookmarkPlus
                              className={`font-black text-3xl ${
                                selectedMessages.includes(message.id)
                                  ? "text-black"
                                  : "text-zinc-500"
                              }`}
                            />
                          </button>
                          <EditModal
                            message={message.content}
                            selectedMessages={selectedMessages}
                            id={message.id}
                            setMessages={setMessages}
                          />
                        </div>
                      </div>
                    </div>
                  </AnimatedListItem>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
