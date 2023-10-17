import IconArrowLeft from "./icon-arrow-left.svg";
import "../../styles/chat-mobile.css";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
const ChatHeader = ({ channel, user, onBack }: any) => (
  <div className="w-full flex px-3 justify-between">
    <button className="w-fit" onClick={onBack}>
      <ArrowLeftIcon className="h-5 w-5 ml-10 cursor-pointer" />
    </button>
    <span className="font-semibold">{channel.name}</span>
    <span className="text-transparent opacity-0">{user.nickname}</span>
  </div>
);

export default ChatHeader;