'use strict'

angular.module('gatling.tracker',[]).

    controller('trackerCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
        $scope.trackingId = $routeParams.id;
        $scope.pendingCount= 0;
        $scope.inProgressCount = 0;
        $scope.completed = [ ];
        $scope.failed = [ ];
        $scope.cancelled = false;

        $http.get('/gatling/server/track/'+$scope.trackingId).success(function(data){
            $scope.pendingCount = data.trackingInfo.pendingCount;
            $scope.inProgressCount = data.trackingInfo.inProgressCount;
            $scope.completed = data.trackingInfo.completed;
            $scope.failed = data.trackingInfo.failed;
            $scope.cancelled = data.trackingInfo.cancelled;
        })

        $scope.cancelJob = function(){
                $http.post('/gatling/server/abort/'+$scope.trackingId,{})
                .success(function(data){
                    console.log(data);
                    $scope.cancelled = data.cancelled;
                });
            }
    }])
