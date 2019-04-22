//app.js
const express = require("express");
const path = require("path");

let app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || "3000";

/* listen()メソッドを実行して環境変数ポートor3000番ポートで待ち受け。*/
const server = app.listen(port, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

// Import Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("./tweet-todoapp-firebase-adminsdk-sc6tt-827d132b82.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tweet-todoapp.firebaseio.com"
});

// Get a database reference to our posts
const db = admin.database();
const usersRef = db.ref("/users"); // userリスト

// Attach an asynchronous callback to read the data at our posts reference
const cron = require("node-cron");
cron.schedule("00 30 13 * * *", () => {
  console.log("定期ツイート実行(開始)");
  taskStart();
});
cron.schedule("00 59 23 * * *", () => {
  console.log("定期ツイート実行(終了)");
  taskStart();
});

function taskStart() {
  let today = new Date();
  today = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  usersRef.off();
  usersRef.on("child_added", async snapshot => {
    const user = snapshot.val();
    db.ref("/todos/" + user.uid)
      .orderByChild("deadLine")
      .equalTo(today)
      .once("value", result => {
        const tasks = [];
        const data = result.val();
        for (let key in data) {
          let { task, status } = data[key];
          tasks.push({ task, status });
        }
        postTweet(user, tasks, today);
      });
  });
}

const twitter = require("twitter");
const fs = require("fs");
function postTweet(userInfo, tasks, today) {
  const clientUser = {};
  // APIキー
  clientUser["consumer_key"] = process.env.CONSUMER_KEY;
  clientUser["consumer_secret"] = process.env.CONSUMER_SECRET;
  clientUser["access_token_key"] = userInfo.token;
  clientUser["access_token_secret"] = userInfo.secretKey;

  const client = new twitter(clientUser);
  if (tasks.length > 0) {
    // タスク内容とステータスを文章化します
    const taskStatus = fromArrayToSentence(tasks);
    // Twitterにt投稿をします
    client.post(
      "statuses/update",
      {
        status: `【やることリスト】${today}
${taskStatus}
https://sudokzt-todoapp.herokuapp.com/`
      },
      function(error, tweet) {
        if (!error) {
          console.log(tweet);
        } else {
          console.log(error);
        }
      }
    );
  }
}

// タスク内容とステータスを文章化します
function fromArrayToSentence(tasks) {
  let sentence = "";
  tasks.forEach(task => {
    sentence += `[${task.status}] ${task.task}
`;
  });
  return sentence;
}
