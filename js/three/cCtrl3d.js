
//can probably use array.reduce to do this
function pairArray(a) {
  var temp = a.slice();
  var arr = [];

  while (temp.length) {
    arr.push(temp.splice(0,2));
  }

  return arr;
}

cApp.controller('cCtrl', function($scope, $http, $location, anchorSmoothScroll, $timeout) {
		
	$scope.data = null;
	
	$scope.referrenceGenome = [];
	$scope.liveGenome = [];
	
	$scope.geneRegions = null;
	$scope.users = null;
	$scope.selectedUser = null;
	$scope.selectedGenome = null;
	$scope.selectedGeneRegion = null;
	$scope.lookingAt = 0;

	//for highlighting
	$scope.isInGeneRange= function(x){
		if($scope.selectedGeneRegion != null)
			return (x > $scope.selectedGeneRegion.start  ) && (x < $scope.selectedGeneRegion.end  );
				
		if(	$scope.selectedGenome != null)
			return x == $scope.selectedGenome.index;
	}
		
	 $scope.reset = function() {
		$scope.liveGenome = angular.copy($scope.referrenceGenome);
     };
	 
	 //scrolls to a gene in the view
	 
	 $scope.scrollToGenome = function(){
		 $scope.selectedGeneRegion = null;
		 if($scope.selectedGenome != null)$scope.scrollToGene($scope.selectedGenome.index);
	 }
	 
	 $scope.scrollToGeneRegion = function(){
		 $scope.selectedGenome = null;
		 if($scope.selectedGeneRegion != null){
			highLightRegion($scope.selectedGeneRegion);
			$scope.scrollToGene($scope.selectedGeneRegion.start);
		 }
	 }
	 
	 $scope.scrollToGene = function (gene){
       //$location.hash(gene);
       //anchorSmoothScroll.scrollTo(gene);
	   $scope.lookingAt = gene;
	   threeScrollToGene(gene);
     };
	 
	 $scope.getGenderPic = function(gender){
		 return gender == "male" ? "static/male.png" : "static/female.png";
	 }
		
	$http({
	  method: 'GET',
	  url: 'data/data.json'
	}).then(function successCallback(response) {		
		$scope.data = response.data;
		$scope.referrenceGenome = pairArray(response.data.referrenceGenome);
		$scope.geneRegions = response.data.geneRegions;
		$scope.users = response.data.users;
		$scope.render();
    }, function errorCallback(response){
		//do some logging
		console.log("Loading Data from Local File instead (cross origin fail on local)");
		$scope.data = DataFactory.getTestData();
		$scope.referrenceGenome = pairArray($scope.data.referrenceGenome);
		//clone array
		$scope.reset();
		$scope.geneRegions = $scope.data.geneRegions;
		$scope.users = $scope.data.users;
		$scope.render();
	});
	
	$scope.render = function(){
		renderDNA($scope.liveGenome);
	}
	
	$scope.updateThreeDNA = function(){
		updateThreeDNA($scope.referrenceGenome,$scope.liveGenome);
	};

	
	$scope.updateDNA = function(userSequence){
		//refresh the DNA
		$scope.reset();
		for(block in userSequence){
			
			//gotta convert it into the DNA array style
			var isEven = userSequence[block].index%2 == 0;
			var secondIndex = isEven ? 0 : 1;
			
			$scope.liveGenome[parseInt(userSequence[block].index/2)][secondIndex] = userSequence[block].letter;
		}
		
		$scope.updateThreeDNA();
	}
	
	$scope.selectUser = function(user){
		$scope.selectedUser = user;
		$scope.updateDNA(user.sequence);
	}
	
});
