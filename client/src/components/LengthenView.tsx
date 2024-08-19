import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { FromServerError, FromServerShortenUrl } from "../../api/models";

export const LengthenView = () => {
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [lengthenedUrl, setLengthenedUrl] = useState<string | null>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleLengthenUrl = async (): Promise<void> => {
    const response = await fetch("/lengthen", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shortened_url: inputValue,
      }),
    });
    if (response.ok) {
      const data: FromServerShortenUrl = await response.json();
      setLengthenedUrl(data.original_url);
    } else {
      const error: FromServerError = await response.json();
      setError(error.error);
    }
  };

  return (
    <React.Fragment>
      {error && <div className="error-container">{error}</div>}
      {!lengthenedUrl ? (
        <div className="form-container">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => handleInputChange(event)}
            placeholder="Enter a URL to lengthen..."
            name="shortened_url"
          />
          <button disabled={!inputValue} onClick={handleLengthenUrl}>
            Lengthen
          </button>
        </div>
      ) : (
        <React.Fragment>
          <h4>Here is your lengthened URL:</h4>
          <div className="result-container">{lengthenedUrl}</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
