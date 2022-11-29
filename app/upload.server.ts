import { writeAsyncIterableToWritable } from "@remix-run/node";
import type {
  UploadApiOptions,
  UploadApiResponse,
  DeleteApiResponse,
} from "cloudinary";
import cloudinary from "cloudinary";

export async function deleteImageFromCloudinary(
  publicId: string
): Promise<DeleteApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) =>
      error ? reject(error) : resolve(result)
    );
  });
}

export async function uploadImageToCloudinary(
  data: AsyncIterable<Uint8Array>,
  options: Omit<UploadApiOptions, "folder"> = {}
) {
  let uploadPromise = new Promise<UploadApiResponse | undefined>(
    async (resolve, reject) => {
      let uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "remix", ...options },
        (error, result) => {
          // if we have no file, we'll just duck out and resolve undefined
          if (error?.message.toLowerCase() === "empty file") {
            return resolve(undefined);
          }

          // if we have a result, we'll resolve it
          if (result) {
            return resolve(result);
          }

          // if we have an error, we'll reject the promise
          if (error) {
            reject(error);
          }

          // if we have no result and no error, we'll reject the promise
          reject(undefined);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
}
