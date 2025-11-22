from livereload import Server
from build import bundle

# Initial build
bundle()

server = Server()
# Watch the src directory for changes and rebuild
server.watch('src/**/*', bundle)
# Serve the current directory on port 9000
server.serve(port=9000, host='localhost')
