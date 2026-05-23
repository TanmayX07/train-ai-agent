const RAPIDAPI_BASE_URL =
  process.env.RAPIDAPI_BASE_URL ?? "https://irctc1.p.rapidapi.com";
const RAPIDAPI_HOST =
  process.env.RAPIDAPI_HOST ?? "irctc1.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const searchTrains = async (query: string) => {
  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY is missing");
  }

  const url = new URL("/api/v1/searchTrain", RAPIDAPI_BASE_URL);
  url.searchParams.set("query", query);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `RapidAPI request failed with ${response.status}: ${errorBody}`
    );
  }

  return response.json();
};

export const getRunningStatus = async (
  trainNo: string,
  startDay = "1"
) => {
  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY is missing");
  }

  const url = new URL("/api/v1/liveTrainStatus", RAPIDAPI_BASE_URL);
  url.searchParams.set("trainNo", trainNo);
  url.searchParams.set("startDay", startDay);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `RapidAPI request failed with ${response.status}: ${errorBody}`
    );
  }

  return response.json();
};
