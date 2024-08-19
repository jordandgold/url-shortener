import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import "./App.css";
import Select from "react-select";
import { ShortenView } from "./components/ShortenView";
import { LengthenView } from "./components/LengthenView";

export interface OptionType {
  value: string;
  label: string;
}

enum AppViews {
  SHORTEN = "SHORTEN",
  LENGTHEN = "LENGTHEN",
}

const AppViewSelectOptions: OptionType[] = [
  { value: AppViews.SHORTEN, label: "Shortener" },
  { value: AppViews.LENGTHEN, label: "Lengthener" },
];

const App = () => {
  const [appView, setAppView] = useState<OptionType>(AppViewSelectOptions[0]);

  const handleAppViewChange = (option: OptionType | null) => {
    if (option) {
      setAppView(option);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="app-header">
          <span>URL</span>
          <Select
            value={appView}
            onChange={(event) => handleAppViewChange(event)}
            options={AppViewSelectOptions}
            className="app-view-select"
          />
        </div>
        {appView.value === AppViews.SHORTEN ? (
          <ShortenView />
        ) : (
          <LengthenView />
        )}
      </div>
    </div>
  );
};

export default App;
