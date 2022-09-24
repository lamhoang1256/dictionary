import { LayoutHome } from "layouts";
import Head from "next/head";
import { wordsApi } from "server/word";
import { IWord } from "types";
import { uuid } from "uuidv4";

interface HomePageProps {
  words: IWord[];
}

const HomePage = ({ words }: HomePageProps) => {
  console.log("words: ", words);
  return (
    <>
      <Head>
        <title>HomePage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>HomePage</LayoutHome>
    </>
  );
};

export async function getStaticProps() {
  await wordsApi.deleteWord("83e9c2e6-b6ad-465d-9443-0f609ba35886");
  const words = await wordsApi.getAll();
  return {
    props: {
      words,
    },
  };
}

export default HomePage;
