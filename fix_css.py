import re

with open('/Users/mirelebernardes/Desktop/betel/style.css', 'r') as f:
    content = f.read()

# Replace .hero background
new_hero = """.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background:
    linear-gradient(135deg, rgba(17,30,56,0.85) 0%, rgba(28,45,82,0.7) 60%, rgba(232,148,26,0.2) 100%),
    url("background_site.jpg");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}"""

content = re.sub(
    r'\.hero\s*\{.*?\n\}',
    new_hero,
    content,
    flags=re.DOTALL,
    count=1
)

# Remove .hero::before background illustration completely
content = re.sub(
    r'/\*\s*Moving truck background illustration\s*\*/\n\.hero::before\s*\{.*?\n\}',
    '',
    content,
    flags=re.DOTALL,
    count=1
)

with open('/Users/mirelebernardes/Desktop/betel/style.css', 'w') as f:
    f.write(content)

