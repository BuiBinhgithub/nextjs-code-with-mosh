import React from "react";

interface Props {
  params: { id: number };
}
const PhotoDetailPage = ({ params: { id } }: Props) => {
  return <div>PhotoDetailPage {id}</div>;
};

export default PhotoDetailPage;
