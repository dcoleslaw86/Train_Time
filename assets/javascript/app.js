  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDJJaN_ZyzcGVFP3pfDEz9Zsvo-l31bSnk",
    authDomain: "train-time-hw-bcf59.firebaseapp.com",
    databaseURL: "https://train-time-hw-bcf59.firebaseio.com",
    projectId: "train-time-hw-bcf59",
    storageBucket: "train-time-hw-bcf59.appspot.com",
    messagingSenderId: "403597668417",
    appId: "1:403597668417:web:5fe68ab99b09c01af556c0",
    measurementId: "G-Q4NJ5ZXW6B"
  };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var time = "";
    var frequency = "";

    $("#submitButton").on("click", function(event){
      event.preventDefault();
      trainName = $("#newName").val().trim();
      destination = $("#newDestination").val().trim();
      time = $("#newTime").val().trim();
      frequency = $("#newFrequency").val().trim();
      
      database.ref().push({
        name: trainName,
        destination: destination,
        time: time,
        frequency: frequency,
      })

      $("#newName").val("");
      $("#newDestination").val("");
      $("#newTime").val("");
      $("#newFrequency").val("");
    })

    database.ref().on("child_added", function(childSnapshot) {

      var train = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTrainTime = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;
      var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % frequency;
      var minutesAway = frequency - tRemainder;
      var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

      $("#trainData").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")
    });