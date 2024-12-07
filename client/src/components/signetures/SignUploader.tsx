import {
  createSign,
  deleteSign,
  fetchSign,
  resetSignView,
} from "@/store/sign/signeture.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Trash } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSearchParams } from "react-router-dom";

interface Props {
  index: number;
  image?: string;
}

const SignUploader: React.FC<Props> = ({ index }) => {
  const currentIndex = `sign${index}` as
    | "sign1"
    | "sign2"
    | "sign3"
    | "sign4"
    | "sign5"
    | "sign6";

  const { data, isLoading } = useAppSelector((state) => state.signeture);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const rowId = searchParams.get("update");
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("index", String(index));

      try {
        if (rowId) dispatch(createSign({ id: rowId, data: formData }));
      } catch (error: any) {
        console.error(error);
      }
    },
    [dispatch, index, rowId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const deleteHandler = () => {
    if (rowId) dispatch(deleteSign({ id: rowId, index: String(index) }));
  };

  useEffect(() => {
    if (rowId) dispatch(fetchSign(rowId));

    return () => {
      dispatch(resetSignView());
    };
  }, [dispatch, rowId]);

  return (
    <div>
      <div>
        {data &&
        typeof data?.[currentIndex] == "string" &&
        data?.[currentIndex].length > 20 ? (
          <div className="relative">
            <div className="h-20 w-full overflow-hidden flex justify-center bg-white">
              <img
                src={data?.[currentIndex] || ""}
                alt="Image preview"
                className="h-full object-cover"
              />
            </div>
            <div
              className="absolute top-0 bottom-0 left-0 right-0 bg-red-500/20 justify-center items-center opacity-0 hover:opacity-100 flex duration-300 z-50 cursor-pointer"
              onClick={deleteHandler}
            >
              <div className="">
                <Trash className=" text-red-500" />
              </div>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps({
              className: `border-dashed border-2 rounded p-6 text-center ${
                isDragActive ? "Border-blue-500 bg-blue-100" : "border-gray-400"
              }`,
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
            {isLoading && <p>Processing...</p>}
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUploader;
