import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "./Animation.css";

const startAddr = 2048;

function Animation({ sprites }) {
  const [offset, setOffset] = useState(-1);

  useEffect(() => {
    const tl = gsap.timeline({ yoyo: true, repeat: -1 });
    tl.to({}, { duration: 0.5 });

    tl.addLabel("startPixels");
    tl.to(
      "#binary-0-1, #binary-1-1",
      {
        y: `+=${blockSize + 2}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "startPixels"
    );
    tl.to(
      "#binary-0-2, #binary-1-2",
      {
        y: `+=${blockSize * 2 + 4}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "startPixels"
    );
    tl.to(
      "#binary-0-3, #binary-1-3",
      {
        y: `+=${blockSize * 3 + 6}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "startPixels"
    );

    tl.addLabel("secondPixels");
    tl.to(
      "#binary-0-0",
      {
        x: `+=${blockSize * 3 + 1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-1-0",
      {
        x: `+=${-1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-0-1",
      {
        x: `+=${blockSize * 2 + 1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-0-2",
      {
        x: `+=${blockSize + 1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-0-3",
      {
        x: `+=${1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-1-1",
      {
        x: `+=${-blockSize - 1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-1-2",
      {
        x: `+=${-blockSize * 2 - 1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );
    tl.to(
      "#binary-1-3",
      {
        x: `+=${-blockSize * 3 - 1}`,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "secondPixels"
    );

    tl.addLabel("colorPixels", "+=.1");
    tl.to(
      "#binary-0-0>rect, #binary-1-0>rect",
      { fill: "rgb(0, 0, 0)" },
      "colorPixels"
    );
    tl.to(
      "#binary-0-0>text, #binary-1-0>text",
      { fill: "white" },
      "colorPixels"
    );
    tl.to(
      "#binary-0-1>rect, #binary-1-1>rect",
      { fill: "rgb(222, 222, 255)" },
      "colorPixels"
    );
    tl.to(
      "#binary-0-2>rect, #binary-1-2>rect",
      { fill: "rgb(33, 33, 255)" },
      "colorPixels"
    );
    tl.to(
      "#binary-0-2>text, #binary-1-2>text",
      { fill: "white" },
      "colorPixels"
    );
    tl.to(
      "#binary-0-3>rect, #binary-1-3>rect",
      { fill: "rgb(255, 0, 0)" },
      "colorPixels"
    );
    tl.to(
      "#binary-0-3>text, #binary-1-3>text",
      { fill: "white" },
      "colorPixels"
    );

    tl.to({}, { duration: 0.5 });

    return () => {
      tl.time(0);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (sprites) {
        setOffset((prev) => (prev < 63 ? prev + 1 : prev));
      }
    }, 1000);

    return () => clearInterval(id);
  }, [sprites]);

  const byte = offset >= 0 && sprites ? sprites[startAddr + offset] : 0;

  return (
    <svg width="600" height="300">
      <HexView data={sprites} offset={offset} />
      <g transform={`translate(0, ${blockSize * 4})`}>
        <text
          x={blockSize * 4 + 1}
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="700"
        >
          HEX
        </text>
        <BlockValue
          x={blockSize * 3}
          y={blockSize}
          value={((byte >> 4) & 0xf).toString(16).toUpperCase()}
        />
        <BlockValue
          x={blockSize * 4 + 2}
          y={blockSize}
          value={(byte & 0xf).toString(16).toUpperCase()}
        />
      </g>
      <g transform={`translate(0, ${blockSize * 6})`}>
        <text
          x={blockSize * 4 + 1}
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="700"
        >
          BINARY
        </text>
        <Byte id="binary" y="22" x="0" value={byte} />
      </g>
    </svg>
  );
}

const blockSize = 22;

function BlockValue({
  x = 0,
  y = 0,
  id,
  value,
  width = blockSize,
  blockColor = "#ddd",
  textColor = "#333",
}) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      <rect
        x="0"
        y="0"
        width={width}
        height={blockSize}
        stroke="0"
        fill={blockColor}
      />
      <text
        x={width / 2}
        y="13"
        fill={textColor}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value ?? 0}
      </text>
    </g>
  );
}

function Nibble({ x = 0, y = 0, id, value }) {
  const children = [];
  for (let i = 0; i < 4; i++) {
    children.push(
      <BlockValue
        x={i * blockSize}
        id={`${id}-${i}`}
        key={i}
        value={(value >> (3 - i)) & 1}
      />
    );
  }

  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

function Byte({ x = 0, y = 0, id, value }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <Nibble id={`${id}-${0}`} value={(value >> 4) & 0xf} />
      <Nibble id={`${id}-${1}`} x={blockSize * 4 + 2} value={value & 0xf} />
    </g>
  );
}

function HexView({ x = 0, y = 0, data, offset }) {
  const children = [];
  if (data) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 4; i++) {
      children.push(
        <text
          y={13 + i * blockSize}
          dominantBaseline="middle"
          fill="#777"
          key={i}
        >
          {(startAddr + i * 16).toString(16).toUpperCase().padStart(4, "0")}
        </text>
      );
    }

    const currentAddress = startAddr + offset;
    for (let addr = startAddr; addr < startAddr + 64; addr++) {
      children.push(
        <BlockValue
          x={x + 50}
          y={y}
          value={data[addr].toString(16).toUpperCase().padStart(2, "0")}
          key={addr}
          width={30}
          blockColor={addr === currentAddress ? "#aaf" : "#ddd"}
          textColor={addr < currentAddress ? "#777" : "#333"}
        />
      );

      x += 30;
      if (addr % 16 === 7) x += 2;
      if (addr % 16 === 15) {
        x = 0;
        y += blockSize;
      }
    }
  }

  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

export default Animation;
