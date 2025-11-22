from livereload import Server
from build import bundle

# Initial build
bundle()

server = Server()
# Watch the src directory for changes and rebuild
server.watch('src/**/*', bundle)
# Serve the dist directory on port 9000
server.serve(root='dist', port=9000, host='localhost')
