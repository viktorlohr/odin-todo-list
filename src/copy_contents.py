from pathlib import Path
import subprocess

cwd = Path("./src")
content = ""
for file_path in cwd.glob("**/*.ts"):
    content += "//File:" + str(file_path) + "\n"
    content += file_path.read_text() + "\n\n\n"
    print(file_path)

# with open("copied_contents", "w") as f:
#     f.write(content)

subprocess.run(["pbcopy"], input=content, text=True)
