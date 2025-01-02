import os
import json

# Path to the posts folder
POSTS_FOLDER = "posts"

# Path to the index.json file
INDEX_FILE = os.path.join(POSTS_FOLDER, "index.json")

def update_index():
    # Get all .json files in the posts folder
    post_files = [f for f in os.listdir(POSTS_FOLDER) if f.endswith(".json") and f != "index.json"]

    # Sort files by name (optional, adjust sorting logic if needed)
    post_files.sort()

    # Create the data structure for index.json
    index_data = {"files": post_files}

    # Write the updated data to index.json
    with open(INDEX_FILE, "w") as f:
        json.dump(index_data, f, indent=2)

    print(f"Updated {INDEX_FILE} with {len(post_files)} post files.")

if __name__ == "__main__":
    update_index()
