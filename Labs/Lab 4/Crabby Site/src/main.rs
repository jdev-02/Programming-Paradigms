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
        //proceed normally

        let parts: Vec<&str> = request_line.split_whitespace().collect(); //split request line into parts to extract path
        let path = if parts.len() >= 2 { parts[1] } else { "/" }; //get path from request line or default to root

        let file_path = match path {
            "/" => "index.html", //serve index.html for root
            _ => &path[1..], //strip leading slash to get filename
        };

        let response = match fs::read_to_string(file_path) {
            Ok(contents) => {
                let status_line = "HTTP/1.1 200 OK"; //success response
                let length = contents.len(); //length of file
                format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}") //format! adds file's contents as the body of the success response. content-length header is set to size of response body which here is size of our html fiile
            }
            Err(_) => {
                let status_line = "HTTP/1.1 404 NOT FOUND"; //error response
                let contents = fs::read_to_string("404.html").unwrap_or_else(|_| "404 Not Found".to_string()); //fallback if 404.html is missing
                let length = contents.len(); //length of fallback message
                format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}") //format! adds fallback contents as body of error response
            }
        };

        stream.write_all(response.as_bytes()).unwrap(); //call as bytes on response to convert string to bytes to send across tcp connection. and we use unwrap bc it coudl fail. normally would add error handling in real app
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
