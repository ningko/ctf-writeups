---
layout: post
title: "back to school"
date: 2026-03-07
categories:
    - prog
    - net
---

**site:** root-me

**Statement**

> To start this test using the TCP protocol, you need to connect to a program on a network socket.
>> - Calculate the square root of number 1 and multiply by number 2.
>> - Then round the result to two decimal places.
>> - You have 2 seconds to send the correct answer from the moment the program sends you the calculation.

**Challenge connection information**
> Host: challenge01.root-me.org
\
> Protocol: TCP
\
> Port: 52002

---

When connecting (using the command `nc`), the response is this:

```console
$ nc challenge01.root-me.org 52002

====================
 GO BACK TO COLLEGE
====================
You should tell me the answer of this math operation in less than 2 seconds !

Calculate the square root of (number a) and multiply by (number b) =
```

And taking anything over 2 seconds results in:

```console
[!] Too slow, you cannot solve this challenge! You lost ^-^
```

So the challenge here would be to write a script that can receive the numbers (which are random in each session), make the operation and send it back in that amount of time.

Such script would look something like this:

<!-- this theme is kind of an eyesore no offense, not changing it tho -->
```console
import socket

HOST = "challenge01.root-me.org"
PORT = 52002

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

data = s.recv(1024).decode()

data = data.split()

a = float(data[27])
b = float(data[31])

res = round((a ** 0.5) * b, 2)

s.send(f"{res}\n".encode())

flag = s.recv(1024).decode()
print(flag)

s.close()
```

What this does, pretty much, is:
- Import the `socket` library,
- The `s` var creates a new socket (`socket.socket`) using a given *address family* (`socket.AF_INET`) and *socket type* (`socket.SOCK_STREAM`). `AF_INET` and `SOCK_STREAM` are the default for each const.
    - `AF_INET` is used to indicate a IPv4 address family. If, for example, we were working with IPv6, we'd use `AF_INET6`, etc.
    - `SOCK_STREAM` indicates it's a **TCP** socket. If we were dealing with a **UDP** socket, we'd be using `SOCK_DGRAM`.
- We then use `.connect()` to connect to the remote socket, using the `HOST` and `PORT` defined for the challenge
- The `data` var receives the response given by the program, in the form of a **bytes object**, representing the data received, using the method `.recv()`. We specify the max. amount of data received with the *bufsize* parameter (in this case, `1024` bytes), and convert it to a readable string using `.decode()` (which is just a normal python method)
- Since the response format doesn't change but the numbers we have to calculate do, we can get their position to read and calculate by using `.split()`. This will turn `data` into an array (like the one below) where number `a` is always at index 27 (`data[27]`) and number `b` is at index 31 (`data[31]`):

```
['====================', 'GO', 'BACK', 'TO', 'COLLEGE', '====================', 'You', 'should', 'tell', 'me', 'the', 'answer', 'of', 'this', 'math', 'operation', 'in', 'less', 'than', '2', 'seconds', '!', 'Calculate', 'the', 'square', 'root', 'of', '(a)', 'and', 'multiply', 'by', '(b)', '=']
```

- We retrieve and calculate these numbers (`res` var) and then send the result back using the socket method `.send()`, enconded into a bytes-like object for the program to read (`.encode()`)
- We then use `.recv()` once again to retrieve the next response given by the program (the flag), which goes through the same decoding process as before
- And finally, we close the socket (`.close()`).

Running the script will do all of this automatically and return the flag.

```console
$ python3 script.py 
[+] Good job ! Here is your flag: RM{***_*******_***_****}
```