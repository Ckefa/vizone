import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

type parVal = {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  host: string
};

type parVid = {
  link: string;
  title: string;
  thumb: string;
};

function Home({ setUrl, host }: parVal) {
  const [data, setData] = useState<parVid[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(host)
    fetch(`${host}videos`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setData(resp.data);
      })
      .catch((error) => console.log("Error fetching data????", error));
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
