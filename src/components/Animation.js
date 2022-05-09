import { useEffect } from "react";
import { gsap } from "gsap";
import "./Animation.css";

function Animation({ sprites }) {
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

  return (
    <svg width="600" height="300">
      <g>
        <text
          x={blockSize * 4 + 1}
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="700"
        >
          BINARY
        </text>
        <Byte id="binary" y="22" x="0" />
      </g>
      <HexView y={blockSize * 6} data={sprites} />
    </svg>
  );
}

const blockSize = 22;

function BlockValue({ x = 0, y = 0, id, value, width = blockSize }) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      <rect
        x="0"
        y="0"
        width={width}
        height={blockSize}
        stroke="0"
        fill="#ddd"
      />
      <text
        x={width / 2}
        y="13"
        fill="#333"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value ?? 0}
      </text>
    </g>
  );
}

function Nibble({ x = 0, y = 0, id }) {
  const children = [];
  for (let i = 0; i < 4; i++) {
    children.push(<BlockValue x={i * blockSize} id={`${id}-${i}`} key={i} />);
  }

  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

function Byte({ x = 0, y = 0, id }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <Nibble id={`${id}-${0}`} />
      <Nibble id={`${id}-${1}`} x={blockSize * 4 + 2} />
    </g>
  );
}

function HexView({ x = 0, y = 0, data }) {
  const children = [];
  if (data) {
    for (let addr = 0; addr < 16; addr++) {
      let x = addr * 30;
      if (addr >= 8) x += 2;
      children.push(
        <BlockValue
          x={x}
          value={data[addr].toString(16).padStart(2, "0")}
          key={addr}
          width={30}
        />
      );
    }
  }

  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

export default Animation;
