var curApp=angular.module("currencyRate",[]);
curApp.controller('currencyCtrl',function($scope,$http,$interval,$filter){	    
     $scope.updateData = function(){ 
        //For displaying the Updated time
        var CurrentDate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var time = $filter('date')(new Date(), 'HH:mm:ss');
        $scope.message="Last Updated (" +CurrentDate +" -  " + time+")";
        //Calling the currency api
        $http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10", {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
        }).then(function (response) {
            $scope.currencyData=response.data;
            $scope.currencyName=[]; 
            $scope.currencyRate=[];
            //loop for fetching the Currency Name and Currency Rate
            for(i=0;i<$scope.currencyData.length;i++){
                $scope.currencyName.push($scope.currencyData[i].name);
                $scope.currencyRate.push(parseFloat($scope.currencyData[i].price_usd));

            }
            //Implementing heighchart functionality
            var myChart = Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'USD Currency Conversions '
                },
                xAxis: {
                    categories: $scope.currencyName //Contains currency name
                },
                yAxis: {
                    title: {
                        text: 'USD Rate'
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    showInLegend: false,
                    data:  $scope.currencyRate // Contains currency rate
                }]
            });

        });

    };
    $scope.updateData();//Calling first time
    //Sequentially Calling updateData function every 300000(5min) milliseconds
    $interval($scope.updateData, 300000);         
});