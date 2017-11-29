angular.module('vote', [])
  .controller('MainCtrl', [
    '$scope', '$http',

    function ($scope, $http) {
      $scope.votes = [];
      $scope.addCandidate = function () {
        var newvote = { name: $scope.formContent, upvotes: 0 };
        $scope.formContent = name;
        $http.post('/votes', newvote).success(function (data) {
          $scope.votes.push(data);
        });
      };

      $scope.addVotes = () => {
        console.log('inside addVotes');
        $scope.votes.forEach((v) => {
          console.log('selected: ' + v.selected + ' name: ' + v.name);
          if (v.selected === v.name) {
            $scope.upvote(v);
          }
        });
      };

      $scope.upvote = function (vote) {
        return $http.put('/votes/' + vote._id + '/upvote')
          .success(function (data) {
            console.log("upvote worked");
            vote.upvotes = vote.data;
          });
      };

      $scope.incrementUpvotes = function (vote) {
        $scope.upvote(vote);
      };


      $scope.getAll = function () {
return $http.get('/votes').success((data) => {
angular.copy(data, $scope.votes);
});
};

$scope.getAll();

	$scope.removeCandidate = function (object) {
         console.log('deleting ' + object.name + " with id: " + object._id);
         $http.delete('/votes/' + object._id)
         .success((data) => {
           console.log('delete worked');
         });      
      $scope.getAll();
};
    }
  ]);

