import re

with open('/Users/mirelebernardes/Desktop/betel/script.js', 'r') as f:
    content = f.read()

# Remove animateCounter function and intersection observer logic (lines ~80-116)
content = re.sub(
    r'// =====================\n// 4\. NUMBER COUNTERS\n// =====================.*?// =====================\n// 5\. TESTIMONIALS SLIDER',
    '// =====================\n// 5. TESTIMONIALS SLIDER',
    content,
    flags=re.DOTALL
)

# Remove .stat-card from animateEls selector
content = content.replace(
    "'.service-card, .fleet-card, .diff-card, .stat-card, .about__content, .about__image-wrapper'",
    "'.service-card, .fleet-card, .diff-card, .about__content, .about__image-wrapper'"
)

with open('/Users/mirelebernardes/Desktop/betel/script.js', 'w') as f:
    f.write(content)

