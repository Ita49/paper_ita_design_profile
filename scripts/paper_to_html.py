#!/usr/bin/env python3
"""
Convert Paper MCP get_jsx (inline-styles) output to standalone HTML.

Usage:
  python3 scripts/paper_to_html.py --title "Contact" --output website/screens/contact.html < contact.jsx
  cat contact.jsx | python3 scripts/paper_to_html.py --title "Contact" --output website/screens/contact.html
"""

import re
import sys
import argparse

# SVG attributes that are camelCase in JSX but kebab-case in HTML/SVG
SVG_ATTRS = {
    'strokeWidth': 'stroke-width',
    'strokeLinecap': 'stroke-linecap',
    'strokeLinejoin': 'stroke-linejoin',
    'strokeDasharray': 'stroke-dasharray',
    'strokeDashoffset': 'stroke-dashoffset',
    'strokeOpacity': 'stroke-opacity',
    'fillOpacity': 'fill-opacity',
    'fillRule': 'fill-rule',
    'clipRule': 'clip-rule',
    'clipPath': 'clip-path',
    'textAnchor': 'text-anchor',
    'dominantBaseline': 'dominant-baseline',
}


def camel_to_kebab(name):
    """Convert camelCase CSS property to kebab-case, handling vendor prefixes."""
    if name.startswith('Webkit'):
        rest = name[6:]
        return '-webkit-' + camel_to_kebab(rest[0].lower() + rest[1:])
    if name.startswith('MozOsx'):
        rest = name[6:]
        return '-moz-osx-' + camel_to_kebab(rest[0].lower() + rest[1:])
    if name.startswith('Moz'):
        rest = name[3:]
        return '-moz-' + camel_to_kebab(rest[0].lower() + rest[1:])
    s = re.sub(r'(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', s).lower()


def parse_style_object(style_str):
    """Parse a JSX style object string into a CSS string."""
    props = []
    # Match: propName: 'string value'  OR  propName: 123  OR  propName: 1.5
    pattern = re.compile(r"(\w+):\s*(?:'([^']*)'|\"([^\"]*)\"|(-?[\d.]+))")
    for m in pattern.finditer(style_str):
        prop = m.group(1)
        value = m.group(2) if m.group(2) is not None else \
                m.group(3) if m.group(3) is not None else \
                m.group(4)
        if value is not None and prop != 'type':  # skip JSX 'type' prop
            css_prop = camel_to_kebab(prop)
            # Escape any double quotes inside the value (e.g. font-family: "Inter")
            value = value.replace('"', '&quot;')
            props.append(f'{css_prop}: {value}')
    return '; '.join(props)


def jsx_to_html(jsx_str):
    """Convert Paper JSX (inline-styles) to plain HTML."""
    html = jsx_str.strip()

    # Paper's get_jsx returns a JSON string literal: "(\n  <div>...</div>\n)"
    # Decode it so we get real newlines and real quote chars.
    if html.startswith('"'):
        try:
            import json
            html = json.loads(html)
        except Exception:
            pass

    # Strip the outer paren wrapper: ( ... )
    html = re.sub(r'^\s*\(\s*\n?', '', html)
    html = re.sub(r'\s*\)\s*$', '', html)

    # Convert style={{ ... }} → style="..."
    def replace_style(m):
        css = parse_style_object(m.group(1))
        return f'style="{css}"'

    html = re.sub(r'style=\{\{([\s\S]*?)\}\}', replace_style, html)

    # Convert SVG camelCase props to kebab-case attributes
    for jsx_attr, html_attr in SVG_ATTRS.items():
        html = re.sub(rf'\b{re.escape(jsx_attr)}=', f'{html_attr}=', html)

    # Clean up empty attribute quotes from any missed JSX expressions
    html = re.sub(r'\{\s*\}', '', html)

    return html


HTML_TEMPLATE = '''\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — Ita Okponung</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ background: #0b0b0b; }}
    .screen-root {{ display: flex; justify-content: center; }}
  </style>
</head>
<body>
  <div class="screen-root">
{content}
  </div>
</body>
</html>
'''


def main():
    parser = argparse.ArgumentParser(description='Convert Paper MCP JSX to standalone HTML')
    parser.add_argument('--title', default='Screen', help='Page title')
    parser.add_argument('--output', '-o', help='Output file (default: stdout)')
    parser.add_argument('input', nargs='?', help='Input JSX file (default: stdin)')
    args = parser.parse_args()

    if args.input:
        with open(args.input) as f:
            jsx = f.read()
    else:
        jsx = sys.stdin.read()

    content = jsx_to_html(jsx)
    result = HTML_TEMPLATE.format(title=args.title, content=content)

    if args.output:
        with open(args.output, 'w') as f:
            f.write(result)
        print(f'Saved → {args.output}', file=sys.stderr)
    else:
        print(result)


if __name__ == '__main__':
    main()
