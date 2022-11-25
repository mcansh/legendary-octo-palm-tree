import { writeAsyncIterableToWritable } from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "cloudinary";

export async function uploadImageToCloudinary(data: AsyncIterable<Uint8Array>) {
  let uploadPromise = new Promise<UploadApiResponse>(
    async (resolve, reject) => {
      let uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "remix",
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
}
