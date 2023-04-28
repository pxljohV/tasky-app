import React from "react";
import { useState, useEffect } from "react";
const userInput = React.createRef();
const openMenu = React.createRef();
const load = React.createRef();
const save = React.createRef();
const item = React.createRef();
const warning = React.createRef();

let initList = [];
let initId = 0;

export default function Main() {
  const [list, setList] = useState(initList);
  const [id, setId] = useState(initId);
  const [input, setInput] = useState("");

  function handler() {
    //stores array values on list
    if (input.length > 0) {
      setId((n) => n + 1);
      setList((arr) => [...arr, { id: id, msg: input, strike: false }]);
      setInput("");
      userInput.current.value = "";
      //console.log(list);
    }
  }
  function showWarning() {
    warning.current.classList.remove("dn")
  }
  function getValues() {
    //get values from local
    const currentValues = localStorage.getItem("list");
    //console.log(currentValues);
    setList((arr) => JSON.parse(currentValues));
    openMenu.current.classList.remove("open")
    openMenu.current.classList.add("close");
  }
  function saveLocal() {
    //saves complete array from list to local
    localStorage.setItem("list", JSON.stringify(list));
    save.current.classList.add("bg-green", "white");
    save.current.innerText = "SAVED ✔";
    openMenu.current.classList.remove("open");
    openMenu.current.classList.add("close");
    setList((arr) => []);
    userInput.current.value = "";
  }
  function OpenMenu() {
    if (openMenu.current.classList.contains("open")) {
      openMenu.current.classList.remove("open");
      openMenu.current.classList.add("close");
    } else {
      openMenu.current.classList.remove("close");
      openMenu.current.classList.add("open");
      save.current.classList.remove("bg-green", "white");
      save.current.innerText = "SAVE";
    }
  }

  useEffect(() => {
    //console.log(list);
  }, [list, userInput]);

  return (
    <div className="overflow-hidden relative roboto sans-serif b ">

      <div className="w-100 mw6 bg-black-50 vh-100 fixed z-2 center dn relative" ref={warning} >
        <div className="w-100 center tc purply pa4 pv5" style={{ position: "absolute", top: "40%", transform: "translateY(-50%)", left: "50%", transform: "translateX(-50%)" }} >

          <p className="thin f5 mb4 white yellow">Override saved data?</p>
          <div>
            <button className="pa2 w-30 b--none glow pointer grow" onClick={() => {
              saveLocal(
                warning.current.classList.add("dn")
              )
            }}>Yes</button>
            <button className="pa2 w-30 bg-red b--none glow pointer grow" onClick={(e) => {
              warning.current.classList.add("dn")
            }}>Cancel</button>
          </div>
        </div>
      </div>


      <div className="pa2">
        <div
          className="w-100 pa4 green overflow-hidden relative  z-1 pointer glowy purply "
          onClick={OpenMenu}
        >
          <h1 className="nunito ">Tasky </h1>
        </div>
        <div className=" w-100  center tc pa  close flex" ref={openMenu}>
          <button
            className="pa2 pointer pointer f7 black w-50 br2 b--none"
            onClick={getValues}
          >
            LOAD
          </button>
          <button
            className="pa2 ml4  pointer blackpointer bb f7 w-50 br2 b--none"
            ref={save}
            onClick={() => {
              const currentValues = localStorage.getItem("list");
              if (currentValues.length > 2) {
                showWarning()
              } else saveLocal()
            }
            }
          >
            SAVE
          </button>
        </div>

        <div className="pa4 tc center w-100 flex items-center justify-center mt3 ">
          <input
            type="text"
            className="pa2 br2 b--none bg-white bt"
            maxLength="30"
            ref={userInput}
            vaule={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="pa2 ml4 w3 pointer b--none br2 bg-green"
            onClick={handler}
          >
            ✎
          </button>
        </div>

        <div className="vh-75 overflow-y-scroll bg-black-20 ">
          {list.map((i, index) => {
            return (
              <div
                key={i.id}
                className="flex items-center justify-between br2 purply bb b--black-80"
              >
                <div
                  key={i.id}
                  className="flex pa2 br b--white-10 w-100"
                  onClick={(e) => {
                    if (!e.target.classList.contains("strike")) {
                      e.target.classList.add("strike");
                    } else {
                      e.target.classList.remove("strike");
                    }
                  }}
                >
                  <p>
                    {index + 1}. {i.msg}
                  </p>
                </div>

                <div
                  className="red pa2 ph4 pointer"
                  onClick={(e) => {
                    setList((arr) => arr.filter((item) => item.id !== i.id));
                  }}
                >
                  <p style={{ pointerEvents: "none" }}>X</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pa3  center tc white  f7">
          <p>0.2.2</p>
          <p className="white o-20"> pxljoh</p>
        </div>
      </div>
    </div>

  );
}
