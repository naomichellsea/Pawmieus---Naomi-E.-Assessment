import sys
import os
from ultralytics import YOLO

# ✅ Get the image path from command line
image_path = sys.argv[1]

# ✅ Ensure the image exists before running inference
if not os.path.exists(image_path):
    print("Error: Image file not found")
    sys.exit(1)

# ✅ Load YOLO model correctly
script_dir = os.path.dirname(os.path.abspath(__file__))  # Get script directory
model_path = os.path.join(script_dir, "best.pt")  # Path to YOLO model

if not os.path.exists(model_path):
    print("Error: Model file not found")
    sys.exit(1)

# ✅ Load model
model = YOLO(model_path)

# ✅ Run inference
try:
    results = model(image_path, verbose=False)  # 🔥 `verbose=False` to reduce unwanted logs

    detected_breeds = set()

    for result in results:
        if hasattr(result, "boxes"):  # ✅ Ensure 'boxes' attribute exists
            for box in result.boxes:
                class_id = int(box.cls) if hasattr(box, "cls") else None
                if class_id is not None and hasattr(result, "names") and class_id in result.names:
                    breed_name = result.names[class_id].strip()
                    detected_breeds.add(breed_name)

    # ✅ Print only detected breed names (comma-separated if multiple)
    print(",".join(detected_breeds) if detected_breeds else "Unknown")

except Exception as e:
    print(f"Error: YOLO inference failed - {str(e)}")
    sys.exit(1)
