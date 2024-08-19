# Example

This example is meant to illustrate how a simple agent that parrots back what the user is saying can be connected to ChatWidget. The parrot agent used in this example is implemented in the [DialogueKit](https://github.com/iai-group/dialoguekit) toolkit.

## Setup

First, install dependencies by running:

```bash
pip install -r example/requirements.txt
```

Then, start the server by running:

```bash
python example/parrot.py
```

Leave the terminal open to keep the server running. Open a new terminal window to set up and start the client.

Install Node if you don't have it from [here](https://nodejs.org/en/download/).

Then run:

```bash
npm install
```

```bash
npm start
```

This should automatically launch the client in your browser, and the client should be able to communicate with the server.
