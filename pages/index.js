import Home from "screens/home";
import { getSession, signIn } from "next-auth/client";
import styles from "styles/home.module.scss";
import Button from "components/atoms/button";

const HomePage = ({ session }) => (
  <div>
    {!session && (
      <div className={styles.homeConnection}>
        <h2 className={styles.homeConnectionTitle}>Connexion</h2>

        <Button
          bgColor="red"
          color="white"
          size="large"
          handleClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
        >
          Connectez-vous via Google
        </Button>
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
