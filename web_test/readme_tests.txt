

Send data to the client.

Return:
    0   when the connection has been closed
    -1  on error
    >0  number of bytes written on success


VSCPWEB_API int web_write( struct web_connection *,
                                const void *buf,
                                size_t len );

Send data to the client using printf() semantics.
Works exactly like web_write(), but allows to do message formatting.

VSCPWEB_API int web_printf( struct web_connection *,
                                PRINTF_FORMAT_STRING(const char *fmt),
                                ...) PRINTF_ARGS(2, 3);

Send a part of the message body, if chunked transfer encoding is set.
Only use this function after sending a complete HTTP request or response
header with "Transfer-Encoding: chunked" set.

VSCPWEB_API int web_send_chunk( struct web_connection *conn,
                                    const char *chunk,
                                    unsigned int chunk_len );

---

Send contents of the entire file together with HTTP headers.

VSCPWEB_API void web_send_file( struct web_connection *conn,
                                                                            const char *path );
---

Send HTTP error reply.

VSCPWEB_API void web_send_http_error( struct web_connection *conn,
                                            int status_code,
                                            PRINTF_FORMAT_STRING(const char *fmt),
                                            ...) PRINTF_ARGS(3, 4);

---

Send HTTP digest access authentication request.
Browsers will send a user name and password in their next request, showing
an authentication dialog if the password is not stored.

Parameters:
    conn: Current connection handle.
    realm: Authentication realm. If NULL is supplied, the sever domain
           set in the authentication_domain configuration is used
Return:
   < 0   Error


VSCPWEB_API int
web_send_digest_access_authentication_request( struct web_connection *conn,
                                                    const char *realm );

---

Check if the current request has a valid authentication token set.
A file is used to provide a list of valid user names, realms and
password hashes. The file can be created and modified using the
mg_modify_passwords_file API function.

Parameters:
    conn: Current connection handle.
    realm: Authentication realm. If NULL is supplied, the sever domain
           set in the authentication_domain configuration is used.
    filename: Path and name of a file storing multiple password hashes.

Return:
   > 0   Valid authentication
   0     Invalid authentication
   < 0   Error (all values < 0 should be considered as invalid
           authentication, future error codes will have negative
           numbers)
   -1    Parameter error
   -2    File not found


VSCPWEB_API int
web_check_digest_access_authentication( struct web_connection *conn,
                                                const char *realm,
                                                const char *filename);

---

Send contents of the entire file together with HTTP headers.

Parameters:
  conn: Current connection handle.
  path: Full path to the file to send.
  mime_type: Content-Type for file.  NULL will cause the type to be
             looked up by the file extension.

VSCPWEB_API void web_send_mime_file( struct web_connection *conn,
                                            const char *path,
                                            const char *mime_type );

---

Send contents of the entire file together with HTTP headers.
   Parameters:
     conn: Current connection information.
     path: Full path to the file to send.
     mime_type: Content-Type for file.  NULL will cause the type to be
                looked up by the file extension.
     additional_headers: Additional custom header fields appended to the header.
                         Each header should start with an X-, to ensure it is
                         not included twice.
                         NULL does not append anything.

VSCPWEB_API void web_send_mime_file2( struct web_connection *conn,
                                            const char *path,
                                            const char *mime_type,
                                            const char *additional_headers );

---

Store body data into a file.

Read entire request body and store it in a file "path".

 Return:
     < 0   Error
     >= 0  Number of bytes stored in file "path".

VSCPWEB_API long long web_store_body( struct web_connection *conn,
                                            const char *path );

---


web_read

Read data from the remote end, return number of bytes read.
   Return:
     0     connection has been closed by peer. No more data could be read.
     < 0   read error. No more data could be read from the connection.
     > 0   number of bytes read into the buffer.

VSCPWEB_API int web_read( struct web_connection *,
                                void *buf,
                                size_t len );

---

Get the value of particular HTTP header.

   This is a helper function. It traverses request_info->http_headers array,
   and if the header is present in the array, returns its value. If it is
   not present, NULL is returned.

VSCPWEB_API const char *web_get_header( const struct web_connection *,
                                            const char *name );

---

// Get a value of particular form variable.
//
//   Parameters:
//     data: pointer to form-uri-encoded buffer. This could be either POST data,
//           or request_info.query_string.
//     data_len: length of the encoded data.
//     var_name: variable name to decode from the buffer
//     dst: destination buffer for the decoded variable
//     dst_len: length of the destination buffer
//
//   Return:
//     On success, length of the decoded variable.
//     On error:
//        -1 (variable not found).
//        -2 (destination buffer is NULL, zero length or too small to hold the
//            decoded variable).
//
//   Destination buffer is guaranteed to be '\0' - terminated if it is not
//   NULL or zero length.
//

VSCPWEB_API int web_get_var( const char *data,
                                    size_t data_len,
                                    const char *var_name,
                                    char *dst,
                                    size_t dst_len );

---

// Get a value of particular form variable.
//
//   Parameters:
//     data: pointer to form-uri-encoded buffer. This could be either POST data,
//           or request_info.query_string.
//     data_len: length of the encoded data.
//     var_name: variable name to decode from the buffer
//     dst: destination buffer for the decoded variable
//     dst_len: length of the destination buffer
//     occurrence: which occurrence of the variable, 0 is the first, 1 the
//                 second...
//                this makes it possible to parse a query like
//                b=x&a=y&a=z which will have occurrence values b:0, a:0 and a:1
//
//   Return:
//     On success, length of the decoded variable.
//     On error:
//        -1 (variable not found).
//        -2 (destination buffer is NULL, zero length or too small to hold the
//            decoded variable).
//
//   Destination buffer is guaranteed to be '\0' - terminated if it is not
//   NULL or zero length.
//

VSCPWEB_API int web_get_var2( const char *data,
                                    size_t data_len,
                                    const char *var_name,
                                    char *dst,
                                    size_t dst_len,
                                    size_t occurrence );

---

// Fetch value of certain cookie variable into the destination buffer.
//
//   Destination buffer is guaranteed to be '\0' - terminated. In case of
//   failure, dst[0] == '\0'. Note that RFC allows many occurrences of the same
//   parameter. This function returns only first occurrence.
//
//   Return:
//     On success, value length.
//     On error:
//        -1 (either "Cookie:" header is not present at all or the requested
//            parameter is not found).
//        -2 (destination buffer is NULL, zero length or too small to hold the
//            value). *
//

VSCPWEB_API int web_get_cookie( const char *cookie,
                                        const char *var_name,
                                        char *buf,
                                        size_t buf_len );

---

// Download data from the remote web server.
//     host: host name to connect to, e.g. "foo.com", or "10.12.40.1".
//     port: port number, e.g. 80.
//     use_ssl: wether to use SSL connection.
//     error_buffer, error_buffer_size: error message placeholder.
//     request_fmt,...: HTTP request.
//   Return:
//     On success, valid pointer to the new connection, suitable for web_read().
//     On error, NULL. error_buffer contains error message.
//   Example:
//     char ebuf[100];
//     struct web_connection *conn;
//     conn = web_download("google.com", 80, 0, ebuf, sizeof(ebuf),
//                        "%s", "GET / HTTP/1.0\r\nHost: google.com\r\n\r\n");
//

VSCPWEB_API struct web_connection *
web_download( const char *host,
                    int port,
                    int use_ssl,
                    char *error_buffer,
                    size_t error_buffer_size,
                    PRINTF_FORMAT_STRING(const char *request_fmt),
                    ...) PRINTF_ARGS(6, 7);

---

Close the connection opened by web_download().

VSCPWEB_API void web_close_connection( struct web_connection *conn );

---

Process form data.
Returns the number of fields handled, or < 0 in case of an error.
Note: It is possible that several fields are already handled successfully
(e.g., stored into files), before the request handling is stopped with an
error. In this case a number < 0 is returned as well.
In any case, it is the duty of the caller to remove files once they are
no longer required.


VSCPWEB_API int web_handle_form_request( struct web_connection *conn,
                                            struct web_form_data_handler *fdh );

---

Convenience function -- create detached thread.
   Return: 0 on success, non-0 on error.

typedef void *(*web_thread_func_t)(void *);
VSCPWEB_API int web_start_thread( web_thread_func_t f, void *p );

---

Get text representation of HTTP status code.

VSCPWEB_API const char *
web_get_response_code_text( const struct web_connection *conn,
                                int response_code );

---

Return CivetWeb version.

VSCPWEB_API const char *web_version( void );

---

URL-decode input buffer into destination buffer.
   0-terminate the destination buffer.
   form-url-encoded data differs from URI encoding in a way that it
   uses '+' as character for space, see RFC 1866 section 8.2.1
   http://ftp.ics.uci.edu/pub/ietf/html/rfc1866.txt
   Return: length of the decoded data, or -1 if dst buffer is too small.

VSCPWEB_API int web_url_decode( const char *src,
                                        int src_len,
                                        char *dst,
                                        int dst_len,
                                        int is_form_url_encoded );

---

// URL-encode input buffer into destination buffer.
//   returns the length of the resulting buffer or -1
//   is the buffer is too small.
//

VSCPWEB_API int web_url_encode( const char *src,
                                        char *dst,
                                        size_t dst_len );

---

// Print error message to the opened error log stream.
//   This utilizes the provided logging configuration.
//     conn: connection (not used for sending data, but to get parameters)
//     fmt: format string without the line return
//     ...: variable argument list
//   Example:
//     web_cry(conn,"i like %s", "logging");
//

VSCPWEB_API void web_cry( const struct web_connection *conn,
                                PRINTF_FORMAT_STRING(const char *fmt),
                                ...) PRINTF_ARGS(2, 3);

---

// Connect to a TCP server as a client (can be used to connect to a HTTP server)
//
//   Parameters:
//     host: host to connect to, i.e. "www.wikipedia.org" or "192.168.1.1" or
//     "localhost"
//     port: server port
//     use_ssl: make a secure connection to server
//     error_buffer, error_buffer_size: buffer for an error message
//
//   Return:
//     On success, valid web_connection object.
//     On error, NULL. Se error_buffer for details.
//

VSCPWEB_API struct web_connection *
web_connect_client( const char *host,
                        int port,
                        int use_ssl,
                        char *error_buffer,
                        size_t error_buffer_size );

---

VSCPWEB_API struct web_connection *
web_connect_client_secure( const struct web_client_options *client_options,
                                char *error_buffer,
                                size_t error_buffer_size );

---


// Wait for a response from the server
//
//   Parameters:
//     conn: connection
//     ebuf, ebuf_len: error message placeholder.
//     timeout: time to wait for a response in milliseconds (if < 0 then wait
//   forever)
//
//   Return:
//     On success, >= 0
//     On error/timeout, < 0

VSCPWEB_API int web_get_response( struct web_connection *conn,
                                        char *ebuf,
                                        size_t ebuf_len,
                                        int timeout );



/////////////////////////////////////////////////////////////////////
//                          WEBSOCKET
////////////////////////////////////////////////////////////////////

Send data to a websocket client wrapped in a websocket frame.  Uses
web_lock_connection to ensure that the transmission is not interrupted,
i.e., when the application is proactively communicating and responding to
a request simultaneously.

Send data to a websocket client wrapped in a websocket frame.
This function is available when civetweb is compiled with -DUSE_WEBSOCKET

Return:
    0   when the connection has been closed
    -1  on error
    >0  number of bytes written on success

VSCPWEB_API int web_websocket_write( struct web_connection *conn,
                                        int opcode,
                                        const char *data,
                                        size_t data_len );

Send data to a websocket server wrapped in a masked websocket frame.  Uses
web_lock_connection to ensure that the transmission is not interrupted,
i.e., when the application is proactively communicating and responding to
a request simultaneously.

Send data to a websocket server wrapped in a masked websocket frame.
This function is available when civetweb is compiled with -DUSE_WEBSOCKET

Return:
    0   when the connection has been closed
    -1  on error
    >0  number of bytes written on success

VSCPWEB_API int web_websocket_client_write( struct web_connection *conn,

Blocks until unique access is obtained to this connection. Intended for use
with websockets only.
Invoke this before web_write or web_printf when communicating with a
websocket if your code has server-initiated communication as well as
communication in direct response to a message.

VSCPWEB_API void web_lock_connection( struct web_connection *conn );
VSCPWEB_API void web_unlock_connection( struct web_connection *conn );

---

// Connect to a websocket as a client
//
//   Parameters:
//     host: host to connect to, i.e. "echo.websocket.org" or "192.168.1.1" or
//   "localhost"
//     port: server port
//     use_ssl: make a secure connection to server
//     error_buffer, error_buffer_size: buffer for an error message
//     path: server path you are trying to connect to, i.e. if connection to
//   localhost/app, path should be "/app"
//     origin: value of the Origin HTTP header
//     data_func: callback that should be used when data is received from the
//   server
//     user_data: user supplied argument
//
//   Return:
//     On success, valid web_connection object.
//     On error, NULL. Se error_buffer for details.
//

VSCPWEB_API struct web_connection *
web_connect_websocket_client( const char *host,
                                    int port,
                                    int use_ssl,
                                    char *error_buffer,
                                    size_t error_buffer_size,
                                    const char *path,
                                    const char *origin,
                                    web_websocket_data_handler data_func,
                                    web_websocket_close_handler close_func,
                                    void *user_data );
                                                                                    int opcode,
                                                                                        const char *data,
                                                                                        size_t data_len );
---



gcc cgi_test-c
mv a.out cgi_test.CGI
test with http://localhost:8884test_web/cgi_test.cgi

test plain html image load
http://localhost:8884/test_web/100images.htm

testing image loads with lua server scripts
http://localhost:8884/test_web/1000images.lua

CORS test (use from different machine - not 'localhost')
http://localhost:8884/test_web/cors.html

Delayed output
delayed.cgi

websocket echo with lua
http://localhost:8884/test_web/echo.lua

cgi environment variables
/home/akhe/development/VSCP/vscp-ux/web_test/env.cgi

http://localhost:8884/test_web/websocket.xhtml
websocket.lua
echo.lua

---

cgi scripts
===========

Environment variables
---------------------

addenv( env, "SERVER_NAME=%s", conn->ctx->config[AUTHENTICATION_DOMAIN] );
    addenv( env, "SERVER_ROOT=%s", conn->ctx->config[DOCUMENT_ROOT] );
    addenv( env, "DOCUMENT_ROOT=%s", conn->ctx->config[DOCUMENT_ROOT] );
    addenv( env, "SERVER_SOFTWARE=%s/%s", "vscpweb", web_version() );

    // Prepare the environment block
    addenv( env, "%s", "GATEWAY_INTERFACE=CGI/1.1");
    addenv( env, "%s", "SERVER_PROTOCOL=HTTP/1.1");
    addenv( env, "%s", "REDIRECT_STATUS=200"); // For PHP

    if ( conn->client.lsa.sa.sa_family == AF_INET6 ) {
        addenv( env, "SERVER_PORT=%d", ntohs( conn->client.lsa.sin6.sin6_port ) );
    }
    else {
        addenv( env, "SERVER_PORT=%d", ntohs( conn->client.lsa.sin.sin_port ) );
    }

    sockaddr_to_string( src_addr, sizeof( src_addr ), &conn->client.rsa );
    addenv( env, "REMOTE_ADDR=%s", src_addr );

    addenv( env, "REQUEST_METHOD=%s", conn->request_info.request_method );
    addenv( env, "REMOTE_PORT=%d", conn->request_info.remote_port );

    addenv( env, "REQUEST_URI=%s", conn->request_info.request_uri );
    addenv( env, "LOCAL_URI=%s", conn->request_info.local_uri );

    // SCRIPT_NAME
    uri_len = (int)strlen( conn->request_info.local_uri );
    if ( NULL == conn->path_info ) {
        if ( conn->request_info.local_uri[uri_len - 1] != '/' ) {
            // URI: /path_to_script/script.cgi
            addenv( env, "SCRIPT_NAME=%s", conn->request_info.local_uri );
        }
        else {
            // URI: /path_to_script/ ... using index.cgi
            const char *index_file = strrchr(prog, '/');
            if ( index_file ) {
                addenv( env,
                            "SCRIPT_NAME=%s%s",
                            conn->request_info.local_uri,
                            index_file + 1 );
            }
        }
    }
    else {
        // URI: /path_to_script/script.cgi/path_info
        addenv( env,
                    "SCRIPT_NAME=%.*s",
                    uri_len - (int) strlen(conn->path_info),
                    conn->request_info.local_uri );
    }

    addenv( env, "SCRIPT_FILENAME=%s", prog );
    if ( NULL == conn->path_info ) {
        addenv( env, "PATH_TRANSLATED=%s", conn->ctx->config[DOCUMENT_ROOT] );
    }
    else {
        addenv( env,
                    "PATH_TRANSLATED=%s%s",
                    conn->ctx->config[DOCUMENT_ROOT],
                    conn->path_info );
    }

    addenv( env, "HTTPS=%s", (conn->ssl == NULL) ? "off" : "on" );

    if ( ( s = web_get_header(conn, "Content-Type")) != NULL ) {
        addenv( env, "CONTENT_TYPE=%s", s );
    }

    if ( conn->request_info.query_string != NULL ) {
        addenv(env, "QUERY_STRING=%s", conn->request_info.query_string);
    }

    if ( ( s = web_get_header(conn, "Content-Length")) != NULL) {
        addenv(env, "CONTENT_LENGTH=%s", s);
    }

    if ( ( s = getenv("PATH")) != NULL ) {
        addenv(env, "PATH=%s", s);
    }

    if ( conn->path_info != NULL ) {
        addenv(env, "PATH_INFO=%s", conn->path_info);
    }

    if ( conn->status_code > 0 ) {
        // CGI error handler should show the status code
        addenv( env, "STATUS=%d", conn->status_code );
    }

#if defined(_WIN32)
    if ( ( s = getenv("COMSPEC")) != NULL ) {
        addenv(env, "COMSPEC=%s", s);
    }
    if ( ( s = getenv("SYSTEMROOT")) != NULL ) {
        addenv(env, "SYSTEMROOT=%s", s);
    }
    if ( ( s = getenv("SystemDrive")) != NULL ) {
        addenv(env, "SystemDrive=%s", s);
    }
    if ( ( s = getenv("ProgramFiles")) != NULL ) {
        addenv(env, "ProgramFiles=%s", s);
    }
    if ( ( s = getenv("ProgramFiles(x86)")) != NULL ) {
        addenv(env, "ProgramFiles(x86)=%s", s);
    }
#else
    if ( ( s = getenv("LD_LIBRARY_PATH")) != NULL ) {
        addenv(env, "LD_LIBRARY_PATH=%s", s);
    }
#endif /* _WIN32 */

    if ( ( s = getenv("PERLLIB")) != NULL ) {
        addenv(env, "PERLLIB=%s", s);
    }

    if ( conn->request_info.remote_user != NULL ) {
        addenv(env, "REMOTE_USER=%s", conn->request_info.remote_user);
        addenv(env, "%s", "AUTH_TYPE=Digest");
    }

    // Add all headers as HTTP_* variables
    for ( i = 0; i < conn->request_info.num_headers; i++ ) {

        (void)web_snprintf( conn,
                                    &truncated,
                                    http_var_name,
                                    sizeof( http_var_name ),
                                    "HTTP_%s",
                                    conn->request_info.http_headers[i].name );

        if ( truncated ) {
            web_cry( conn,
                            "%s: HTTP header variable too long [%s]",
                            __func__,
                            conn->request_info.http_headers[i].name );
            continue;
        }

        // Convert variable name into uppercase, and change - to _
        for ( p = http_var_name; *p != '\0'; p++ ) {
            if (*p == '-') {
                *p = '_';
            }

            *p = (char) toupper(*(unsigned char *) p);
        }

        addenv( env,
                    "%s=%s",
                    http_var_name,
                    conn->request_info.http_headers[i].value );
    }

    // Add user-specified variables
    s = conn->ctx->config[CGI_ENVIRONMENT];
    while ((s = next_option(s, &var_vec, NULL)) != NULL) {
        addenv(env, "%.*s", (int) var_vec.len, var_vec.ptr);
    }

    env->var[env->varused] = NULL;
    env->buf[env->bufused] = '\0';
