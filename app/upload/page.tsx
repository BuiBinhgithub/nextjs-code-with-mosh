"use client";
import React from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface UploadResult {
  public_id: string;
}

const UploadPage = () => {
  const [uploadResult, setUploadResult] = React.useState<string | null>("");
  return (
    <>
      {uploadResult && (
        <CldImage src={uploadResult} width="300" height={"300"} alt={"image"} />
      )}
      <CldUploadWidget
        onSuccess={(result) => {
          if (!result.info) return;

          const info = result.info as { public_id: string };
          setUploadResult(info.public_id);
        }}
        uploadPreset="something"
      >
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
