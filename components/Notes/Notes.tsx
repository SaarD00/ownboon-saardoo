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
  const [showcat, setShowCat] = useState(true);
  const propernote = notes.filter(
    (notee: any) => (notee.email = user?.emailAddresses[0].emailAddress)
  );

  const filteredCategories = propernote?.filter((nootee: any) =>
    nootee.category?.toLowerCase().includes(category.toLowerCase())
  );

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
      <div className="md:min-h-[35vw] min-h-[80vw] w-full flex items-left flex-col p-3  !bg-[#101010]      overflow-hidden  space-y-5   rounded-xl">
        <div className="flex justify-center items-center">
          <div
            onMouseEnter={() => setShowCat(true)}
            className="flex flex-col gap-5"
          >
            <input
              className="bg-transparent text-[7vw] md:text-[2.5vw]  border-b border-white/40 flex justify-center  outline-none "
              placeholder="Topic"
              minLength={3}
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              className="bg-transparent text-[6vw] md:text-[2vw]  border-b flex border-white/40 justify-center  outline-none "
              placeholder={notes[0]?.category}
              minLength={2}
              value={category}
              // type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
            {category.length > 2 && showcat && (
              <div
                onMouseLeave={() => setShowCat(false)}
                onMouseEnter={() => setShowCat(true)}
                className=" absolute top-52 mt-2 w-56 rounded-md shadow-lg bg-[#303030]/10 backdrop-blur-lg text-white ring-1 ring-black ring-opacity-5"
              >
                <div className="py-2 gap-4 flex flex-col">
                  {/* @ts-ignore */}
                  {filteredCategories.map((note, index) => (
                    <h1
                      key={index}
                      onClick={() => {
                        setCategory(note.category);
                        setShowCat(false);
                      }}
                      className="block px-4  py-2 text-sm text-neutral-300 p-1 backdrop-blur-lg hover:bg-[#101010]/20 hover:border hover:border-white/10 rounded-md hover:text-neutral-200"
                    >
                      {note.category}
                    </h1>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-12 flex  w-full flex-col items-start">
          {user ? (
            <div>
              <ReactQuill
                theme="snow"
                className="md:h-[30vw] h-[60vw] md:w-[30vw] w-[70vw]     "
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
                className=" mt-14 bg-opacity-30  w-full  rounded-lg active:scale-105 bg-white flex p-2 justify-center items-center"
              >
                <button className=" text-sm select-none  text-[#dddddd] relative px-5">
                  Done
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Notes;
