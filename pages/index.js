import Home from "screens/home";
import { getSession, signIn } from "next-auth/client";

const HomePage = ({ session }) => (
  <div>
    {!session && (
      <div>
        <div>
          <img src="consortium_logo.svg" alt="" />
          <h1 size="h2">Connexion</h1>

          <button
            icon="icon"
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            {/* <Google /> */}
            Connectez-vous via Google
          </button>
        </div>
      </div>
    )}

    {session && <Home />}
  </div>
);

export default HomePage;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}
