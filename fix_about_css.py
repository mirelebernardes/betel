import re

with open('/Users/mirelebernardes/Desktop/betel/style.css', 'r') as f:
    content = f.read()

# Replace .about__image-block background
new_block = """.about__image-block {
  width: 100%;
  aspect-ratio: 4/3;
  background: url("about_truck.png") no-repeat center/cover;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-lg);
}"""

content = re.sub(
    r'\.about__image-block\s*\{.*?\n\}',
    new_block,
    content,
    flags=re.DOTALL,
    count=1
)

# Remove the .about__image-block::before completely
content = re.sub(
    r'/\*\s*Truck illustration inside the "image" block\s*\*/\n\.about__image-block::before\s*\{.*?\n\}',
    '',
    content,
    flags=re.DOTALL,
    count=1
)

with open('/Users/mirelebernardes/Desktop/betel/style.css', 'w') as f:
    f.write(content)

