import { Button, Dropdown, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Notes } from "../../typings";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const Notes = ({ setNotes, setDummyNote, notes, close, categories }: any) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();
  const [note, setNote] = useState({ text: "", topic: "", note: "", _id: "" });

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    const mutations: Notes = {
      _type: "notes",
      note: text,
      topic: topic,
      category: category,
      email: user?.emailAddresses[0].emailAddress!,
    };

    setDummyNote(mutations);

    // const result = await fetch(`/api/addNotes`, {
    //   body: JSON.stringify(mutations),
    //   method: "POST",
    // });
    fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    }).then(async (res) => {
      const json = await res.json();
      console.log(json.message.results[0].document);
      const newTodo = json.message.results[0].document;
      setNotes([...notes, newTodo]);
    });

    router.replace(router.pathname);

    // const json = await result.json();
    // setNotes([...notes, json]);
    // router.replace(router.pathname);
    // setDummyNote(null);
    // return json;
  };
  const handleSet = async (id: string, topic: string) => {
    // e.preventDefault();
    const mutations = {
      note: text,
      _id: id,
      topic: topic,
    };

    const result = await fetch(`/api/setNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };
  return (
    <div>
      {" "}
      <div className="border border-white/30 overflow-hidden bg-[#212121] space-y-5  h-fit   w-full px-2 rounded-xl py-2">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <input
              className="bg-transparent border-b flex border-white/40 justify-center  outline-none "
              placeholder="Category"
              minLength={2}
              // type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              className="bg-transparent border-b border-white/40 flex justify-center  outline-none "
              placeholder="Topic"
              minLength={3}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-20 flex   flex-col items-center">
          {user ? (
            <div>
              <div>
                <div className="flex space-x-5 items-center justify-center"></div>
                <ReactQuill
                  theme="snow"
                  className="h-36 w-full !border !border-white/10   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                  value={text || note?.note}
                  onChange={setText}
                />
                {/* <TextArea notes={notess[0]?.note} text={text} setText={setText} /> */}
                <div
                  onClick={(e) => {
                    if (topic.length > 1 && category.length > 1) {
                      handleSubmit(e);
                      close();
                    }
                  }}
                  className="bg-opacity-30  w-fit mt-16 rounded-lg active:scale-105 bg-white flex p-2 justify-center items-center"
                >
                  <button className=" text-sm select-none  text-[#dddddd] relative px-5">
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Notes;
