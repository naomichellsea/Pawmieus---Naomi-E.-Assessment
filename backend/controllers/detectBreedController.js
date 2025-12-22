import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const detectBreed = async (req, res) => {
    try {
        // ✅ Ensure image file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const imagePath = path.join(__dirname, "../uploads", req.file.filename);

        // ✅ Check if the image file exists before proceeding
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: "Uploaded image not found" });
        }

        console.log(`Processing image: ${imagePath}`);

        // ✅ Execute Python script
        const pythonProcess = spawn("python3", [
            path.join(__dirname, "../detect_breed.py"), // Correct Python script path
            imagePath
        ]);

        let resultData = "";
        let errorData = "";

        // ✅ Capture standard output (stdout)
        pythonProcess.stdout.on("data", (data) => {
            resultData += data.toString().trim();
        });

        // ✅ Capture errors (stderr)
        pythonProcess.stderr.on("data", (data) => {
            errorData += data.toString();
        });

        // ✅ Handle process completion
        pythonProcess.on("close", (code) => {
            if (code === 0) {
                // ✅ Split breeds by comma (if multiple breeds detected)
                const detectedBreeds = resultData.split(",").map(b => b.trim());

                console.log(`🐶 Detected breeds:`, detectedBreeds);
                res.json({ breeds: detectedBreeds });  // ✅ Send clean breed names
            } else {
                console.error(`❌ YOLO detection failed: ${errorData}`);
                res.status(500).json({ error: "YOLO detection failed", details: errorData });
            }
        });

    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
