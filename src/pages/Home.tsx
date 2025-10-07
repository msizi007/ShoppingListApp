import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  const lists = null;
  return (
    <div className="homePage">
      <Navbar isLoggedIn={true} />
      <div className="input-group flex-nowrap p-5">
        <input type="text" className="form-control" placeholder="Search..." />
        <button className="input-group-text" id="addon-wrapping">
          Search
        </button>
        <button className="input-group-text" id="addon-wrapping">
          Add New
        </button>
      </div>
      {lists ? (
        0
      ) : (
        <>
          <h2 className="text-center mt-5">Nothing Available at the moment.</h2>
          <p className="text-center">All added lists willl appear here..</p>
        </>
      )}
    </div>
  );
}
