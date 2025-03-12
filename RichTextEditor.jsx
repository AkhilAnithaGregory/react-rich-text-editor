import React, { useEffect, useRef } from "react";
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";
import { PiTextUnderlineBold } from "react-icons/pi";
import { GoListUnordered } from "react-icons/go";
import { VscListOrdered } from "react-icons/vsc";
import { LiaListAltSolid } from "react-icons/lia";
import { IoMdColorFill } from "react-icons/io";
import { LuType } from "react-icons/lu";
import { BsSubscript, BsSuperscript } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";

export const RichTextEditor = ({ getValue }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = editorRef.current;
    const handleInput = () => {
      const content = editor.innerHTML;
      getValue(content);
    };

    if (editor) {
      editor.addEventListener("input", handleInput);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("input", handleInput);
      }
    };
  }, [getValue]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const applyRomanNumerals = () => {
    execCommand("insertOrderedList");
    const lists = editorRef.current.getElementsByTagName("ol");
    for (let i = 0; i < lists.length; i++) {
      lists[i].style.listStyleType = "lower-roman";
    }
  };

  const insertLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const setHeading = (level) => {
    execCommand("formatBlock", `<h${level}>`);
  };

  return (
    <div style={style.container}>
      <div
        style={{
          padding: "10px",
          background: "#ededed",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            height: "30px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <button style={style.boxStyle} onClick={() => execCommand("bold")}>
              <FaBold />
            </button>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("italic")}
            >
              <FaItalic />
            </button>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("underline")}
            >
              <PiTextUnderlineBold />
            </button>
          </div>
          <div style={{ height: "100%", display: "flex" }}>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("strikethrough")}
            >
              <FaStrikethrough />
            </button>
            <button
              style={{
                textDecoration: "underline",
                background: "white",
                border: "1px solid gray",
                height: "100%",
                paddingTop: "2px",
                width: "30px",
              }}
              onClick={() => execCommand("insertHorizontalRule")}
            >
              A
            </button>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("insertUnorderedList")}
            >
              <GoListUnordered />
            </button>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("insertOrderedList")}
            >
              <VscListOrdered />
            </button>
            <button style={style.boxStyle} onClick={applyRomanNumerals}>
              <LiaListAltSolid />
            </button>
          </div>
          <button style={style.hyperlink} onClick={insertLink}>
            <FaLink />
            <span>Hyperlink</span>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            height: "30px",
            marginBottom: "10px",
          }}
        >
          <div style={{ height: "100%" }}>
            <label>Size</label>
            <select
              style={{
                outline: "none",
                background: "white",
                border: "1px solid gray",
                height: "25px",
                marginLeft: "10px",
                width: "52px",
              }}
              onChange={(e) => execCommand("fontSize", e.target.value)}
            >
              <option value="1">12</option>
              <option value="3" selected>
                16
              </option>
              <option value="4">24</option>
              <option value="5">32</option>
            </select>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <button style={style.boxStyle} onClick={() => setHeading(1)}>
              H1
            </button>
            <button style={style.boxStyle} onClick={() => setHeading(2)}>
              H2
            </button>
            <button style={style.boxStyle} onClick={() => setHeading(3)}>
              H3
            </button>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("subscript")}
            >
              <BsSubscript />
            </button>
            <button
              style={style.boxStyle}
              onClick={() => execCommand("superscript")}
            >
              <BsSuperscript />
            </button>
          </div>
          <div style={{ display: "flex", height: "100%", width: "80px" }}>
            <div style={style.paletteBorder}>
              <LuType />
              <input
                type="color"
                style={style.paletteColor}
                onChange={(e) => execCommand("foreColor", e.target.value)}
              />
            </div>

            <div style={style.paletteBorder}>
              <IoMdColorFill />
              <input
                type="color"
                value="#ffffff"
                style={style.paletteColor}
                onChange={(e) => execCommand("backColor", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={editorRef}
        id="editor"
        style={{
          border: "1px solid #ededed",
          outline: "none",
          padding: "10px",
          minHeight: "100px",
        }}
        contentEditable="true"
      ></div>
    </div>
  );
};

export const style = {
  container: {
    border: "1px solid #CCCCCC",
    borderRadius: "10px",
    minWidth: "400px",
  },
  boxStyle: {
    height: "100%",
    width: "30px",
    background: "white",
    border: "1px solid gray",
  },
  paletteBorder: {
    position: "relative",
    background: "white",
    border: "1px solid gray",
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
  },
  paletteColor: {
    position: "absolute",
    bottom: "-4px",
    left: "-2px",
    background: "none",
    border: "none",
    padding: "0px",
    margin: "0px",
    blockSize: "20px",
    inlineSize: "31px",
    right: "0px",
    width: "42px",
  },
  hyperlink: {
    alignItems: "center",
    gap: "5px",
    background: "white",
    border: "1px solid gray",
    fontSize: "10px",
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px",
    margin: 0,
    height: "100%",
  },
};

export default RichTextEditor;
