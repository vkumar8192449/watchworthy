import MoviesComponent from "../components/MoviesComponent";
import AllRatings from "../components/AllRating";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <MoviesComponent />
      <AllRatings />
    </>
  );
}
