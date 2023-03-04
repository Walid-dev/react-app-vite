import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
// import { Api } from "./Api";
// import { Container } from "react-bootstrap";
// import { Topbar } from "./components/topbar/Topbar";
// import { Feed } from "./components/feed/Feed";
// import { RightBar } from "./components/rightbar/Rightbar";
// import { Leftbar } from "./components/leftbar/Leftbar";

import "./App.css";
import { UseEffectUseMemoTips } from "./components/tips/UseEffectUseMemoTips";
import { UseEffectCleanUpTips } from "./components/tips/UseEffectCleanUpTips";
import { UseEffectApi } from "./components/tips/UseEffectApi";
import { Posts } from "./components/tips/Posts";
import { GetApiData } from "./components/tips/GetApiData";
import { OpenAPI } from "./components/openapi/OpenAPI";
import { CurrentTest } from "./components/tips/CurrentTest";
import { LastTest } from "./components/tips/LastTest";
import { Work2 } from "./components/tips/Work2";
import { UseReducerTips } from "./components/tips/use-reducer/UseReducerTips";
import UseReducerForm from "./components/tips/use-reducer/UseReducerForm";
import { MainItem } from "./components/main-item/MainItem";
import { Form } from "./components/form-item/Form";
import { Training } from "./components/training/Training";
import { Item } from "./components/item/Item";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Item />} />
        <Route path="/sandwiches" element={<Form />} />
        <Route path="/currentTest" element={<CurrentTest />} />
        <Route path="/get_server_data" element={<GetApiData />} />
        <Route path="/openapi" element={<OpenAPI />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/:test">
          <Route
            index
            element={
              <div className="test">
                <Link to="./UseEffectUseMemoTips">UseEffectUseMemoTips</Link>
                <Link to="./UseEffectCleanUpTips">UseEffectCleanUpTips</Link>
                <Link to="./UseEffectApi">UseEffectApi</Link>
                <Link to="./UseEffectUpdateFields">UseEffectUpdateFields</Link>
                <Link to="./UseReducerTips">UseReducerTips</Link>
                <Link to="./mainItem">Component</Link>
                <Link to="./training">Training</Link>
              </div>
            }
          />
          <Route
            path="UseEffectUseMemoTips"
            element={
              <div className="test">
                <UseEffectUseMemoTips />
              </div>
            }
          />
          <Route
            path="UseEffectCleanUpTips"
            element={
              <div className="test">
                <UseEffectCleanUpTips />
              </div>
            }
          />

          <Route
            path="UseEffectUpdateFields"
            element={
              <div className="test">
                <Work2 />
              </div>
            }
          />

          <Route
            path="UseReducerTips"
            element={
              <div className="test">
                <UseReducerTips />
                <UseReducerForm />
              </div>
            }
          />
          <Route
            path="training"
            element={
              <div className="test">
                <Training />
              </div>
            }
          />
          <Route
            path="mainItem"
            element={
              <div className="test">
                <MainItem />
              </div>
            }
          />
          <Route
            path="UseEffectApi"
            element={
              <div className="test">
                <UseEffectApi />
              </div>
            }
          />
        </Route>
        <Route
          path="posts"
          element={
            <div className="test">
              <Posts />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />

        {/* <Topbar />
      <div className="homeContainer">
        <Leftbar />
        <Feed />
        <RightBar />
      </div> */}
      </Routes>
    </div>
  );
}

export default App;
