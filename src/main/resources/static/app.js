var userApp = angular.module('user', []);

userApp.controller('MainController', function($http, $window) {
    var vm = this;

    vm.password = "";
    vm.percent = 0;
    vm.showPassword = false;
    

    vm.stats = [
    	{ text: 'Muito Curta', color: '#f45642'}, 
    	{ text: 'Muito Fraco', color: '#f4ac41'}, 
    	{ text: 'Fraco', color: '#f4df41'}, 
    	{ text: 'Boa', color: '#f4f141'},
    	{ text: 'Forte', color: '#c1f441'}, 
    	{ text: 'Muito Forte', color: '#64f441'}
    ];
    
    vm.textButton = vm.stats[0].text;
    vm.colorButton = {'background-color': vm.stats[0].color};
    vm.myStyle = {'width': vm.percent+'%',
	      	      'background-color': vm.stats[0].color};
    
    vm.result = vm.stats[0];
    vm.result.password = "";
    vm.result.percent = 0;
    
    vm.validatePassword = function(password) {
        
        vm.percent = 0;
        vm.percent = vm.percent + (password.length*4);
        var requirements = 0;
        
        //Positives
        if (password.length > 8) {
        	requirements++;
        }
        if ((password.match(/[A-Z]/g) || []).length > 0) {
            vm.percent = vm.percent + ((password.length-(password.match(/[A-Z]/g) || []).length)*2);
            requirements++;
        }
        if ((password.match(/[a-z]/g) || []).length > 0){
            vm.percent = vm.percent + ((password.length-(password.match(/[a-z]/g) || []).length)*2);
            requirements++;
        }
        if ((password.match(/[0-9]/g) || []).length > 0 && (password.match(/[0-9]/g) || []).length<password.length) {
            vm.percent = vm.percent + ((password.match(/[0-9]/g) || []).length*4);
            requirements++;
        }
        if ((password.match(/[^a-z^A-Z^0-9]/g) || []).length > 0) {
        	vm.percent = vm.percent + ((password.match(/[^a-z^A-Z^0-9]/g) || []).length*6);
            requirements++;
        }
        var middleNumbersSimbols = 0;
        if ((password.match(/[^a-z^A-Z]/g) || []).length > 0) {
        	if ((password.match(/[^a-z^A-Z]/g) || []).length == password.length) {
        		middleNumbersSimbols = (password.match(/[^a-z^A-Z]/g) || []).length-2;
        	} else if ((password.match(/[^a-z^A-Z]/g) || []).length != password.length) {
        		middleNumbersSimbols = (password.match(/[^a-z^A-Z]/g) || []).length-1;
        	}
        	console.log("middleNumbersSimbols",(middleNumbersSimbols*2));
        	vm.percent = vm.percent + (middleNumbersSimbols*2);
            requirements++;
        }
        
        if (requirements>=4) {
        	vm.percent = vm.percent + (requirements*2);
        }
        
        if ((password.match(/[A-Z]/g) || []).length > 0) {
        	console.log("maior",((password.length-(password.match(/[A-Z]/g) || []).length)*2));
        }
        if ((password.match(/[a-z]/g) || []).length > 0){
        	console.log("menor",((password.length-(password.match(/[a-z]/g) || []).length)*2));
        }
        console.log("numeros",((password.match(/[0-9]/g) || []).length)*4);
        console.log("caracter",(password.match(/[^a-z^A-Z^0-9]/g) || []).length*6);

        console.log("requirements",requirements);
        
        
        //Negatives
        if ((password.match(/[a-zA-Z]/g) || []).length == password.length) {
        	console.log("Letters Only",password.length);
        	vm.percent = vm.percent - (password.length);
        }
        if ((password.match(/[0-9]/g) || []).length == password.length) {
        	console.log("Numbers Only",password.length);
        	vm.percent = vm.percent - (password.length);
        }
        
        var repeatCharacters = 0;
        for (var i = 0; i < password.length; i++) {
        	for (var j = 0; j < password.length; j++) {
        		if (i != j && password.charAt(i) == password.charAt(j)){
        			repeatCharacters++;
        			break;
        		}
        	}
    	}

        console.log("repeatCharacters",repeatCharacters);
        vm.percent = vm.percent - (repeatCharacters);
        
        var consecutiveUppercase = 0;
        for (var i = 0; i < password.length; i++) {
    		if (i != 0 && (password.charAt(i-1).match(/[A-Z]/g) || []).length == 1 && (password.charAt(i-1).match(/[A-Z]/g) || []).length == (password.charAt(i).match(/[A-Z]/g) || []).length){
    			consecutiveUppercase++;
    		}
    	}
        
        console.log("consecutiveUppercase",consecutiveUppercase);
        vm.percent = vm.percent - (consecutiveUppercase*2);
        
        var consecutiveLowercase = 0;
        for (var i = 0; i < password.length; i++) {
    		if (i != 0 && (password.charAt(i-1).match(/[a-z]/g) || []).length == 1 && (password.charAt(i-1).match(/[a-z]/g) || []).length == (password.charAt(i).match(/[a-z]/g) || []).length){
    			consecutiveLowercase++;
    		}
    	}
        
        console.log("consecutiveLowercase",consecutiveLowercase);
        vm.percent = vm.percent - (consecutiveLowercase*2);
        
        var consecutiveNumbers = 0;
        for (var i = 0; i < password.length; i++) {
    		if (i != 0 && (password.charAt(i-1).match(/[0-9]/g) || []).length == 1 && (password.charAt(i-1).match(/[0-9]/g) || []).length == (password.charAt(i).match(/[0-9]/g) || []).length){
    			consecutiveNumbers++;
    		}
    	}
        
        console.log("consecutiveNumbers",consecutiveNumbers);
        vm.percent = vm.percent - (consecutiveNumbers*2);
        
        if (vm.percent < 0) {
        	vm.percent = 0;
        }
        if (vm.percent > 100)
            vm.percent = 100;
        
        if (vm.percent == 0 ) {
        	vm.result = vm.stats[0];
        } else if (vm.percent > 0 && vm.percent <= 20) {
        	vm.result = vm.stats[1];
        } else if (vm.percent > 20 && vm.percent <= 40) {
        	vm.result = vm.stats[2];
        } else if (vm.percent > 40 && vm.percent <= 60) {
        	vm.result = vm.stats[3];
        } else if (vm.percent > 60 && vm.percent <= 80) {
        	vm.result = vm.stats[4];
        } else if (vm.percent > 80 && vm.percent <= 100) {
        	vm.result = vm.stats[5];
        }
        
        vm.textButton = vm.result.text;
        vm.colorButton = {'background-color': vm.result.color};
        vm.myStyle = {'width': vm.percent+'%',
        		      'background-color': vm.result.color};
        
        //result
        vm.result = vm.stats[0];
        vm.result.password = password;
        vm.result.percent = vm.percent;
    };
    
    vm.save = function(result) {
    	$http.post('/rest/password', result).then(function (res) {
    		console.log(res);
    	});
    }


});