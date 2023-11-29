import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

type parVal = {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  host: string;
};

type parVid = {
  link: string;
  title: string;
  thumb: string;
};

function Home({ setUrl, host }: parVal) {
  const [data, setData] = useState<parVid[]>([]);
  const navigate = useNavigate();

  console.log("<<<Rendering Homepage>>>");

  useEffect(() => {
    let [start, end] = [0, 0];
    const fetchData = () => {
      fetch(`${host}videos?start=${start}&end=${end}`)
        .then((resp) => resp.json())
        .then((resp) => {
          setData((prev) => {
            [start, end] = [end, end + 12];
            console.log(end);
            return [...prev, ...resp.data];
          });
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const videoPlayer = (link: string) => {
    console.log(link);
    setUrl(link.replace("watch?v=", ""));
    navigate("/watch");
  };

  return (
    <div className="flex gap-4 justify-around flex-wrap">
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => videoPlayer(item.link)}
          className="flex flex-col justify-cente w-[23vw]"
        >
          {!item.title ? (
            <Spin className="w-[23vw] h-[25vh]" />
          ) : (
            <React.Fragment>
              <img src={item.thumb} alt="" className="w-[23vw] h-[25vh]" />
              <div>{item.title}</div>
            </React.Fragment>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
