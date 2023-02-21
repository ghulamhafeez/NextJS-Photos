import React from "react";
import Image from "next/image";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await res.json();

  const paths = data.map((x) => {
    return {
      params: {
        photosdetail: x.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.photosdetail;

  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const PhotosDetail = ({ data }) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div style={{ paddingLeft: 200 }}>
      <h2>Image Detail</h2>

      <Image
        key={data.id}
        loader={myLoader}
        src={data.url}
        alt="Picture of the author"
        width={500}
        height={500}
      />

      <h3>Title: {data.title}</h3>
      <h4>Id: {data.id}</h4>
    </div>
  );
};
export default PhotosDetail;
