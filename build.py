import os
import re
import base64

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def bundle():
    print("Bundling dashboard...")
    
    if not os.path.exists('src/index.html'):
        print("Error: src/index.html not found")
        return

    html = read_file('src/index.html')
    
    # 1. Inject Components
    components = {
        'sidebar': 'src/components/sidebar.html',
        'header': 'src/components/header.html',
        'modals': 'src/components/modals.html'
    }
    
    for name, path in components.items():
        if os.path.exists(path):
            print(f"Injecting component: {name}")
            content = read_file(path)
            html = html.replace(f'<!-- COMPONENT: {name} -->', content)
        else:
            print(f"Warning: Component {path} not found")

    # 2. Inject Pages
    pages = {
        'overview': 'src/pages/overview.html',
        'console': 'src/pages/console.html',
        'players': 'src/pages/players.html',
        'config': 'src/pages/config.html'
    }

    for name, path in pages.items():
        if os.path.exists(path):
            print(f"Injecting page: {name}")
            content = read_file(path)
            html = html.replace(f'<!-- PAGE: {name} -->', content)
        else:
            print(f"Warning: Page {path} not found")

    # 3. Inline CSS
    print("Inlining CSS...")
    css_path = 'src/css/style.css'
    if os.path.exists(css_path):
        css_content = read_file(css_path)
        html = html.replace(f'<link rel="stylesheet" href="{css_path}">', f'<style>{css_content}</style>')
    else:
        print(f"Warning: {css_path} not found")

    # 4. Inline JS
    print("Inlining JS...")
    js_files = ['src/js/dashboard.js', 'src/js/charts.js']
    for js_file in js_files:
        if os.path.exists(js_file):
            js_content = read_file(js_file)
            html = html.replace(f'<script src="{js_file}"></script>', f'<script>{js_content}</script>')
        else:
            print(f"Warning: {js_file} not found")

    # 5. Inline Favicon
    print("Inlining Favicon...")
    if os.path.exists('favicon.ico'):
        with open('favicon.ico', 'rb') as f:
            favicon_b64 = base64.b64encode(f.read()).decode('utf-8')
        html = html.replace('href="favicon.ico"', f'href="data:image/x-icon;base64,{favicon_b64}"')

    # 6. Basic Cleanup (Remove comments)
    # Be careful not to remove conditional comments or important markers if any
    # Removing HTML comments
    html = re.sub(r'<!--(.*?)-->', '', html, flags=re.DOTALL)
    
    # Remove empty lines to minify slightly
    html = "\n".join([line for line in html.splitlines() if line.strip()])

    # Output
    output_path = 'dashboard.min.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"Build complete! Output: {output_path}")

if __name__ == '__main__':
    bundle()
