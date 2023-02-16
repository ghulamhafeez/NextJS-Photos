import Link from "next/link";
import Image from "next/image";
export default function Home({ data }) {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div>
      <h2>NextJs Photos</h2>
      {data?.slice(0, 20).map((x) => {
        return (
          <Link href={`/photos/${x.id}`} key={x.id}>
            <Image
              loader={myLoader}
              src={x.url}
              alt="Picture"
              width={150}
              height={150}
            />
          </Link>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
