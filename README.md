# Interactive Window Tabs Box

## About

A simple application made with React (NextJs) and local storage. The user can open the application in multiple tabs and move the box around. The box will be visible in all tabs.

The application was inspired by Björn Staal and [Momcilo Popov](https://www.linkedin.com/in/momciloo/)

[Original repo](https://github.com/Momciloo/fun-with-sockets/tree/main) from Momcilo Popov

## Demo

![AnimationDemo3](https://github.com/quocbao19982009/BoxOverLap/assets/86527891/c5c6b5c9-2f5a-4612-ad83-680138d5bfe1)


[Demo Link](https://box-over-lap.vercel.app/)

# Running the Experiment Locally

## Install Dependencies:

1. Install WebSocket server and Frontend dependencies:

```
npm run installAll
```

If you want to install only the Frontend dependencies:

```
npm run installFrontend
```

2. Run the application:

```
npm run dev
```

If you only want to run the application with local storage, use:

```
npm run client
```

## Two Methods to Run the Application:

### Method 1: Using WebSocket

Open the WebSocket version in two separate tabs:

Tab 1: http://localhost:3000?id=1

Tab 2: http://localhost:3000?id=2

### Method 2: Using LocalStorage

Open the LocalStorage version in separate tabs:

Tab 1: http://localhost:3000/local/1

Tab 2: http://localhost:3000/local/2

Tab 3: http://localhost:3000/local/3

By following these steps, you should be able to run the experiment locally with WebSocket or LocalStorage, depending on your preference.
