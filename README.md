# Chat Widget

## About

This is a simple chat widget that can be embedded into any website. It is built with React and uses [Socket.io](https://socket.io/) for communication with the server.

## Usage

To use this widget, you need to have a server running. You can find instructions on how to set up the server [here](../README.md).
Add the following code to your website:

<!-- TODO change the path to the compiled files -->

```html
<link rel="manifest" href="/iai-group/chatwidget/build/asset-manifest.json" />
<link rel="stylesheet" href="/iai-group/chatwidget/build/static/css/main.css" />
<script
  type="text/javascript"
  src="/iai-group/chatwidget/build/static/js/main.js"
></script>
```

The widget can be initialized in one of two ways:

  * Add the following div to your website:
  `<div id="chatWidgetContainer"></div>`
  * Add the following script to your website:
  `<script>initChatWidget()</script>`

There is configuration associated with the widget. You can pass it to the `initChatWidget` function as an object or to the `div` element as attributes.

| Attribute           | Description             | Default value                 |
| ------------------- | ----------------------- | -----------------------       |
| `data-name`         | Name of the chat bot    | `Chatbot`                     |
| `data-server-url`   | URL of the server       | `http://127.0.0.1:5000/chat`  |
| `data-use-feedback` | Whether to use feedback | false                         |
| `data-use-login`    | Whether to login users  | false                         |

Example usage:

```html
<div
  id="chatWidgetContainer"
  data-name="Chatbot"
  data-server-url="http://127.0.0.1:5000/chat"
  data-use-feedback
  data-use-login
></div>
```

```html
<script>
  initChatWidget({
    name: "Chatbot",
    serverUrl: "http://127.0.0.1:5000/chat",
    useFeedback: true,
    useLogin: true,
  });
</script>
```

After initialization, the widget can be opened by clicking on the button in the bottom right corner of the screen.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

To install all necessary packages, run:

```bash
npm install
```

This should generate `node_modules` folder.

To run the app in the development mode, use:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

**NB! Remember to change the path to the compiled files you just built in the `index.html` file.**

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
