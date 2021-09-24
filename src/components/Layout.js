import Navbar from "@components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <style global jsx>{`
        html,
        body {
          background: black;
        }
      `}</style>
    </>
  );
}
