import style from "./loginLauyot.module.css";

export default function Layout({ children }) {
  return (
    <>
      <header className={style.header}>
          <h1 className={style.h}>Foody<span>.</span></h1>
        </header>
        <main style={{width:'100%',height:'87vh',display:'flex',justifyContent:'center'}}>{children}</main>
    </>
  );
}
