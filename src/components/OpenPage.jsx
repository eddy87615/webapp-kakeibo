import './OpenPage.css';

export default function OpenPage() {
  return (
    <>
      <div className="openpagebg">
        <div className="left"></div>
        <div className="right"></div>
        <div className="openimg">
          <img src="/public/logo.svg" alt="logo in starting page" />
          <h1>GrandBook</h1>
          <p>収支を簡単に記録！</p>
        </div>
      </div>
    </>
  );
}
