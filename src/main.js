import Vue from 'vue'
import App from './App.vue'
import Chart from 'chart.js'



new Vue({
    el: '#app',
    render: h => h(App)
});

console.log("test");

var roleArn = 'YOUR_ROLE_ARN';
var bucketName = 'xodata';
var AWS = require('aws-sdk');

var AWSCognito =

AWS.config.region = 'us-east-1';
var authenticationData = {
    Username : 'yue.yuanyuan@gmail.com',
    Password : 'yuan1208',
};
var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

var poolData = { UserPoolId : 'us-east-1_RNh9Lil9V',
    ClientId : '68gqtscn87gg12rmf46j8t2064'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

var userData = {
    Username : 'yue.yuanyuan@gmail.com',
    Pool : userPool
};

var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
        console.log('idToken + ' + result.idToken.jwtToken);
    },

    onFailure: function(err) {
        alert(err);
    },

});
var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1_RNh9Lil9V'
});
AWS.config.credentials = creds;


var s3 = new AWS.S3({
    params: {
        Bucket: bucketName
    }
});
s3.listObjects(function(err, data) { console.log(err, data); });


var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        onAnimationComplete: done,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function done() {
    document.getElementById("canvas_link").src = document.getElementById("myChart").toDataURL();
};

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {
        'title': 'How Much Pizza I Ate Last Night',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
