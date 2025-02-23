import path from "path";
import express from "express";
import multer from "multer";
import News from "./newsModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const newsRoute = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "newsuploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Your allowed to uopload images only", false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 2MB
  },
});

// newsRoute.post(
//   "/create/news",
//   upload.single("filename"),
//   authMiddleware,
//   async (req, res) => {
//     const { title, category, image_url, publish_date, status, source_type } =
//       req.body;
//     const filename = req?.file?.filename;
//     if (title && category && publish_date && status && source_type) {
//       try {
//         if (source_type.own || source_type.other) {
//           if (filename || image_url) {
//             if (filename) {
//               const news = new News({
//                 title: title,
//                 category: category,
//                 status: status,
//                 publish_date: publish_date,
//                 source_type: source_type,
//                 image: filename,
//               });
//               await news.save();

//               res.status(200).json({
//                 success: true,
//                 message: "News created successfully",
//               });
//             } else {
//               const news = new News({
//                 title: title,
//                 category: category,
//                 status: status,
//                 publish_date: publish_date,
//                 source_type: source_type,
//                 image_url: image_url,
//               });
//               await news.save();

//               res.status(200).json({
//                 success: true,
//                 message: "News created successfully",
//               });
//             }
//           } else {
//             res.status(400).json({
//               success: false,
//               message: "Please provide news image type",
//             });
//           }
//         } else {
//           res.status(400).json({
//             success: false,
//             message: "Source type required",
//           });
//         }
//       } catch (error) {
//         console.log(error, "error");
//         res.status(400).json({
//           success: false,
//           message: `${error?.message}`,
//         });
//       }
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "something wents wrong",
//       });
//     }
//   }
// );

newsRoute.post(
  "/create/news",
  upload.single("filename"),
  authMiddleware,
  async (req, res) => {
    console.log("1-- Request received at /create/news"); // Debugging

    let { title, category, image_url, publish_date, status, source_type } =
      req.body;
    const filename = req?.file?.filename;

    console.log("2-- Raw Request body:", req.body); // Debugging
    console.log("3-- Uploaded file:", req.file); // Debugging

    // Removing unwanted whitespace and special characters
    title = title?.trim();
    category = category?.trim();
    image_url = image_url?.trim();
    publish_date = publish_date?.trim();
    status = status?.trim();

    console.log("4-- Cleaned Data:", {
      title,
      category,
      image_url,
      publish_date,
      status,
      source_type,
    });

    if (title && category && publish_date && status && source_type) {
      try {
        console.log("5-- Valid request data received"); // Debugging

        if (typeof source_type === "string") {
          try {
            source_type = JSON.parse(source_type); // Convert source_type to JSON if sent as a string
          } catch (error) {
            console.log("6-- Error parsing source_type:", error.message);
            return res.status(400).json({
              success: false,
              message: "Invalid source_type format",
            });
          }
        }

        console.log("7-- Parsed source_type:", source_type); // Debugging

        if (source_type?.own || source_type?.other) {
          console.log("8-- Source type is valid:", source_type); // Debugging

          if (filename || image_url) {
            console.log("9-- Image available:", filename || image_url); // Debugging

            if (filename) {
              console.log("10-- Saving news with uploaded image:", filename); // Debugging

              const news = new News({
                title,
                category,
                status,
                publish_date,
                source_type,
                image: filename,
              });
              await news.save();

              console.log("11-- News created successfully"); // Debugging
              return res.status(200).json({
                success: true,
                message: "News created successfully",
              });
            } else {
              console.log("12-- Saving news with image URL:", image_url); // Debugging

              const news = new News({
                title,
                category,
                status,
                publish_date,
                source_type,
                image_url,
              });
              await news.save();

              console.log("13-- News created successfully with image URL"); // Debugging
              return res.status(200).json({
                success: true,
                message: "News created successfully",
              });
            }
          } else {
            console.log("14-- Error: No image provided"); // Debugging
            return res.status(400).json({
              success: false,
              message: "Please provide news image type",
            });
          }
        } else {
          console.log("15-- Error: Invalid source type"); // Debugging
          return res.status(400).json({
            success: false,
            message: "Source type required",
          });
        }
      } catch (error) {
        console.log("16-- Error occurred:", error.message); // Debugging
        return res.status(400).json({
          success: false,
          message: `${error?.message}`,
        });
      }
    } else {
      console.log("17-- Error: Missing required fields"); // Debugging
      return res.status(400).json({
        success: false,
        message: "Something went wrong, missing required fields",
      });
    }
  }
);

export default newsRoute;
