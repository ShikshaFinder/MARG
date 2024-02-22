// import { NextApiRequest, NextApiResponse } from "next";
// import { BlobServiceClient, BlobSASPermissions } from "@azure/storage-blob";
// import { v4 as uuidv4 } from "uuid";
// import supabase from "../../../supabase";

// const connectionString: string = process.env.AZURE_BLOB_CONNECTION_STRING || "";
// const containerName: string = process.env.AZURE_BLOB_CONTAINER_NAME || "";

// const blobServiceClient =
//   BlobServiceClient.fromConnectionString(connectionString);
// const containerClient = blobServiceClient.getContainerClient(containerName);

// export const config = {
//   api: {
//     bodyParser: false, // Next.js handles parsing automatically
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { image }: { image: any } = req.body; // Adjust 'any' to the actual type of 'image'

//     const blobName: string = uuidv4(); // Generate unique blob name
//     const blobClient = containerClient.getBlobClient(blobName);

//     const response = await blobClient.uploadBrowserData(image, {
//       blockSize: 4 * 1024 * 1024, // Customize for optimal performance
//       parallelism: 20, // Adjust based on network conditions
//       onProgress: (ev) => {
//         console.log(ev); // Monitor upload progress
//       },
//     });

//     const blobSasUrl: string = blobClient.generateSasUrl({
//       permissions: BlobSASPermissions.parse("r"),
//       expiresOn: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
//     });

//     const { data, error } = await supabase
//       .from("your_table_name")
//       .insert({ url: blobSasUrl });

//     if (error) {
//       throw new Error("Image URL saving failed: " + error.message);
//     }

//     res.status(201).json({ url: blobSasUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Image upload failed" });
//   }
// }
