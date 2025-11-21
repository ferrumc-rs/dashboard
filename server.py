from livereload import Server

server = Server()
# Watch the index.html file for changes
server.watch('index.html')
# Serve the current directory on port 9000
server.serve(port=9000, host='localhost')
