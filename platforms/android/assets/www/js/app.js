angular.module('contactsApp', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('contactsCtrl', function($scope, $cordovaContacts){
  var selectedContacts = {};
    $scope.anuj = function(con,index,event) {
      // console.log('event',event);
      // console.log('con',con);
      alert(JSON.stringify(con.phoneNumbers[0].value));
      if(selectedContacts[con.phoneNumbers[0].value]){
        alert("yes");
        //selectedContacts.splice(con.phoneNumbers[0].value,1);
        delete selectedContacts[con.phoneNumbers[0].value];
        alert(JSON.stringify(selectedContacts));
      }else{
        alert("no");
        selectedContacts[con.phoneNumbers[0].value]=con;
        // alert(selectedContacts.indexOf(con));
        alert(JSON.stringify(selectedContacts));
      }
      
       /*for (var i = 0; i < $scope.phoneContacts.length; i++) {
        for (var j = 0; j <  selectedContacts.length; i++) {
          if(con[j] = $scope.phoneContacts[i]){
            selectedContacts.splice(index,1);
          }else{
            selectedContacts.push(contact);
          }
        }
      };*/
    }

    

    $scope.import = function(){
      alert(selectedContacts);
    }
  $scope.getContacts = function() {
    $scope.phoneContacts = [];

    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if (contact.phoneNumbers && contact.phoneNumbers[0].value) {
          $scope.phoneContacts.push(contact);
          selectedContacts[contact.phoneNumbers[0].value]=contact;
        };
      }
      $scope.checked =true;
    };

    function onError(contactError) {
      /*alert(contactError);*/
    };

    var options = {};
    options.multiple = true;

    $cordovaContacts.find(options).then(onSuccess, onError);
  };
  
});
