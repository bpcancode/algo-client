import { FaHeart } from "react-icons/fa";
import { Visulization } from "../models/models";
import { NavLink } from "react-router";

function VisulizationCard({ visulization }: { visulization: Visulization }) {
  
  return (
    <NavLink to={`/view/${visulization.id}`}>
    <div className="w-72 bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden transition duration-300 cursor-pointer hover:scale-105 hover:shadow-xl">
      <div className="h-40 bg-gray-800 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-30"></div>
        <iframe
          srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${visulization.title}</title>
<style>${visulization.css}</style>
</head>
<body>
${visulization.html}
<script>${visulization.js}</script>
</body>
</html>`}
          className="w-full h-full"
          title={visulization.title}
        />
        <div className="absolute top-2 right-2 bg-opacity-50 p-2 rounded-full flex items-center space-x-2">
          <div className="flex flex-col items-center">
          <FaHeart size={25} className={visulization.isVoted ? "text-red-500" : ""} />
          <p className="text-sm">{visulization.voteCount} votes</p>

          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{visulization.title}</h3>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-400">{visulization.userName}</p>
          <div>
            <p className="text-sm text-gray-400">{visulization.views} views</p>
          </div>
        </div>
      </div>
    </div>
    </NavLink>

  );
}

export default VisulizationCard;
