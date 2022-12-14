import Layout from "../components/layout";

export default function IndexPage() {
  return (
    <Layout>
      <h1>Steady</h1>
      <p>
        <div
          id={"insert_steady_checkout_here"}
          style={{ display: "none" }}
        ></div>
        .
        <a
          className={"steady-login-button"}
          data-size={"medium"}
          data-language={"de"}
          style={{ display: "none" }}
        ></a>
      </p>
    </Layout>
  );
}
