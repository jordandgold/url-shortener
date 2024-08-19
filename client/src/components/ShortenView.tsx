import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { FromServerError, FromServerShortenUrl } from "../../api/models";
import validator from "validator";

export const ShortenView = () => {
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValid, setInputValid] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);

    if (validator.isURL(event.target.value)) {
      setError(null);
      setInputValid(true);
    } else {
      setError("Please input a valid URL");
      setInputValid(false);
    }
  };

  const handleShortenUrl = async (): Promise<void> => {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        original_url: inputValue,
      }),
    });
    if (response.ok) {
      const data: FromServerShortenUrl = await response.json();
      setShortenedUrl(data.shortened_url);
    } else {
      const error: FromServerError = await response.json();
      setError(error.error);
    }
  };

  return (
    <React.Fragment>
      {error && <div className="error-container">{error}</div>}
      {!shortenedUrl ? (
        <div className="form-container">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => handleInputChange(event)}
            placeholder="Enter a URL to shorten..."
            name="original_url"
          />
          <button
            disabled={!inputValue || !inputValid}
            onClick={handleShortenUrl}
          >
            Shorten
          </button>
        </div>
      ) : (
        <React.Fragment>
          <h4>Here is your shortened URL:</h4>
          <div className="result-container">{shortenedUrl}</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
