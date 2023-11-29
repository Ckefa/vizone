import { useState, useEffect } from "react";

type parVal = {
  title: string;
  url: string;
  thumb: string;
};

function Test() {
  const [data, setData] = useState<parVal[]>([]);

  console.log("Testing the App...");

  useEffect(() => {
    let [start, end] = [0, 0];
    const fetchData = () => {
      fetch(`http://localhost/videos?start=${start}&end=${end}`)
        .then((resp) => resp.json())
        .then((resp) => {
          setData((prev) => {
            [start, end] = [end, end + 16];
            console.log(start, end);
            return [...prev, ...resp.data];
          });
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-5 flex-wrap">
      {data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}

export default Test;
