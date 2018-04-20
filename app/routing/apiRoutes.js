var friendData = require("../data/friends.js");


module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
        res.json(friendData);
      });

  app.post("/api/survey", function(req, res) {
    var leastUserName = "Siyan";
    var leastUserPhoto = "http://sonify.psych.gatech.edu/people/images/siyan_zhou.jpg";
    
    var leastScoreDiff = 50;
    
    friendData.forEach((userN)=>{
        var CurrentScoreDiff = 0;
       
        for(let i=0; i<userN.scores.length; i++){
           let eachScoreDiff = Math.abs(Number(req.body.scores[i]) - Number(userN.scores[i])); 
           CurrentScoreDiff += eachScoreDiff;

        }
        if (CurrentScoreDiff < leastScoreDiff){
            leastUserName = userN.name;
            leastUserPhoto = userN.photo;
            leastScoreDiff = CurrentScoreDiff;
           
        }

    });
   
    var leastUser = {
        name: leastUserName,
        photo: leastUserPhoto
    };

    res.json(leastUser);
    friendData.push(req.body);
  });
}

