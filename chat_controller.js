angular.module('app',[pubnub.angular.service])
    .controller('ChatCtrl', function($scope, Pubnub){
       //name of channel for chat room
       $scope.channel = 'messages-channel';
       //generates a random number 1-100 and converts into a string using a LoDash metho
       $scope.uuid = _.random(100).toString();

       Pubnub.init({
          publish_key: 'pub-c-acf89b12-cbf4-4b80-84d1-ba17dc5537ea',
          subscribe_key: 'sub-c-b3744b22-0726-11e6-a9bb-02ee2ddab7fe',
          uuid: $scope.uuid
       });
       //sends the messages over PubNub network
       $scope.sendMessage = function(){
            //dont' send an empty message
            if (!$scope.messageContent || $scope.messageContent === ""){
                return;
            }
            Pubnub.publish({
                channel: $scope.channel,
                message: {
                    content: $scope.messageContent,
                    sender_uuid: $scope.uuid,
                    date: new Date()
                },
                callback: function(m) {
                    console.log(m);
                }
            });
            //Reset the messageContent's input
            $scope.messageContent = '';
        }
    });
