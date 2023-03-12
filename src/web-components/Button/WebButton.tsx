import Button from "../../components/Button/Button";
import reactToWebComponent from "react-to-webcomponent";

import React from "react";
import * as ReactDOM from "react-dom/client";

const WebButton = reactToWebComponent(Button, React, ReactDOM);

customElements.define("custom-button", WebButton);
