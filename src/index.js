import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from "react-router-dom";
import history from './history';
import { Provider } from 'mobx-react'
import AppStore from './util/datastore'
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const TheRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
ReactDOM.render(
  // <Provider appStore={new AppStore()}>
  <TheRouter/>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// const paramsConfig = {
// 	'/projects/:projectName': [
// 		{ projectName: 'hello-world' },
// 		{ projectName: 'second-project' },
// 		{ projectName: ['third-project', 'fourth-project'] },
// 		projects
// 	],
// 	'/projects/:projectName/view': [
// 		{ projectName: 'hello-world' },
// 		{ projectName: 'second-project' },
// 		{ projectName: ['third-project', 'fourth-project'] },
// 		projects
// 	],
// 	'/projects/:projectName/achievements/:achievement': [
// 		{ projectName: 'hello-world' },
// 		{ projectName: 'second-project' },
// 		{ projectName: ['third-project', 'fourth-project'] },
// 		projects
// 	]
// };
