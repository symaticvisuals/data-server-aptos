import FixtureData from "../models/Fixtures";

const fetchOddsByFixtureId = async (fixtureId: string) => {
  const numericFixtureId = parseInt(fixtureId, 10);
  console.log(`Querying for fixture ID: ${numericFixtureId}`);

  const fixture = await FixtureData.findOne({ "fixture.id": numericFixtureId });
  if (!fixture) {
    return { data: null, message: "Fixture not found" };
  }

  const { odds } = fixture;
  if (odds === null || !odds.bookmakers || odds.bookmakers.length === 0) {
    return { data: null, message: "Odds not found" };
  }

  // Assuming the odds we're interested in are in the first bookmaker's bets
  const betValues = odds.bookmakers[0].bets[0].values;

  // Transform the array into an object
  const oddsObject: { [key: string]: string } = {};
  betValues.forEach((value: any) => {
    if (value.value.toLowerCase() === "home") {
      oddsObject.home = value.odd;
    } else if (value.value.toLowerCase() === "away") {
      oddsObject.away = value.odd;
    } else if (value.value.toLowerCase() === "draw") {
      oddsObject.draw = value.odd;
    }
  });

  oddsObject.fixtureId = fixtureId;

  return { data: oddsObject, message: "Odds found" };
};

export { fetchOddsByFixtureId };
