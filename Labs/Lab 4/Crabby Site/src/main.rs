use std::{
    fs, //filesystem module for reading content of file (file io)
    io::{BufReader, prelude::*}, //for io ops for streams
    net::{TcpListener, TcpStream},
}; //libs

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap(); //unmutable var listener that call bind function from lib tcplistener (object instantiation) to bind a port to listen
    //unwrap will stop the program if the errors occur

    for stream in listener.incoming() { //incoming method returns iterator giving sequence of TCPStreams
        //process each connection in turn and produce streaam to handle
        let stream = stream.unwrap();  //stop program if any errors occur otherwise print connection estab

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream); //create buf reader instance to read stream

    if let Some(Ok(request_line)) = buf_reader.lines().next() {
        //proceed normally if we successfully read the first line of the HTTP request

        let parts: Vec<&str> = request_line.split_whitespace().collect(); 
        //split request line into parts to extract method, path, and protocol (e.g. "GET /hello.html?msg=Hi HTTP/1.1")

        let path = if parts.len() >= 2 { parts[1] } else { "/" }; 
        //get path from request line or default to root if malformed (e.g. "/hello.html?msg=Hi")

        let (route, query) = match path.split_once('?') { 
            Some((r, q)) => (r, q), 
            None => (path, ""), 
        };  //split path into route and query string using '?' as delimiter. if no query string, default to empty via none 

        use std::collections::HashMap; 
        //import HashMap from std lib to store query parameters as key-value pairs

        let params: HashMap<_, _> = query 
            .split('&') 
            .filter_map(|pair| pair.split_once('=')) 
            .collect(); 
        //split query string into individual key=value pairs, then split each pair into key and value, and collect into hashmap

        let file_path = match route { 
            "/" => "index.html", 
            _ => &route[1..], 
        }; 
        //determine which file to serve based on route. strip leading '/' to get filename (e.g. "/hello.html" → "hello.html")

        let mut contents = fs::read_to_string(file_path).unwrap_or_else(|_| "<h1>404 Not Found</h1>".to_string()); 
        //read file contents from disk. if file doesn't exist, fallback to hardcoded 404 html via unwrap method

        if route == "/hello.html" || route == "/404.html" { 
            //only inject message into hello.html or 404.html — index.html stays static

            if let Some(msg) = params.get("msg") { 
                let decoded_msg = msg.replace('+', " "); 
                //replace '+' with space to simulate basic URL decoding (e.g. "Hello+World" → "Hello World")

                contents = contents.replace("{{message}}", &decoded_msg); 
                //replace placeholder in html with decoded message from query string
            } else { 
                contents = contents.replace("{{message}}", "No message provided."); 
                //fallback message if 'msg' param is missing
            }
        }

        let status_line = "HTTP/1.1 200 OK"; 
        //set success status line for HTTP response

        let length = contents.len(); 
        //calculate length of response body (html content)

        let response = format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}"); 
        //construct full HTTP response with headers and body

        stream.write_all(response.as_bytes()).unwrap(); 
        //send response bytes over TCP stream to client. unwrap used for simplicity (would handle errors in production)
    } else {
        //silently ignore extra requests from my browser i dont feel like handling right now. research shows even requests for the favico will not match this logic bc its an extra get so we can just skip
        return;
    }
}
    /*
    if request_line == "GET / HTTP/1.1" { 
        let status_line = "HTTP/1.1 200 OK";
        let contents = fs::read_to_string("index.html").unwrap();
        let length = contents.len(); //length of file

        let response =
            format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}"); //format! adds file's contents as the body of the success response. content-length header is set to size of response body which here is size of our html fiile
        stream.write_all(response.as_bytes()).unwrap(); //call as bytes on response to convert string to bytes to send across tcp connection. and we use unwrap bc it coudl fail. normally would add error handling in real app
    } else {
        let status_line = "HTTP/1.1 404 NOT FOUND";
        let contents = fs::read_to_string("404.html").unwrap();
        let length = contents.len();

        let response = format!(
            "{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}"
        );

        stream.write_all(response.as_bytes()).unwrap();
    }
}
*/
