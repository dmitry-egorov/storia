'use strict';

var data =
{
    events:
    [
        {
            id: 1,
            title: 'Steam Controller announced by Valve',
            coverage:
            {
                isAvailable: true,
                author:
                {
                    image: 'https://pbs.twimg.com/profile_images/459068439680659459/SzuMbhsx_400x400.jpeg',
                    name: 'Evan Lahti',
                    publisherName: 'PC Gamer'
                },
                preview: '<p>Rounding out its set of living room-centric announcements this week, Steam Controller has been revealed by Valve, a 16-button, haptic-driven gamepad that Valve says is hackable, includes a touch screen, will feature sharable configurations, and has the ambitious goal of “supporting all games in the Steam catalog.” No price was announced for the controller, and it doesn\'t appear to feature motion control.</p><p>Original article: <a href="http://www.pcgamer.com/steam-controller-announced-by-valve/">Steam Controller announced by Valve</a></p>'
            }
        },
        {
            id: 2,
            title: 'Elon Musk introduces the Tesla ‘D’',
            coverage:
            {
                isAvailable: true,
                author:
                {
                    image: 'http://www.washingtonpost.com/wp-apps/imrs.php?src=http://www.washingtonpost.com/blogs/the-switch/files/2014/05/hayleyheadshot.jpg&w=32&h=32',
                    name: 'Hayley Tsukayama',
                    publisherName: 'The Washington Post'
                },
                preview: '<p>Elon Musk punts on self-driving car with Tesla ‘D’ announcement. “The "D" stood for "dual motor" that enables all-wheel drive — an automotive innovation first dreamed up in 1893,” reports The Washington Post\'s Justin Moyer. “Among the "D’s" features: 0 to 60 mph in 3.2 seconds, a 275-mile range and a radar system that can recognize pedestrians. It can also park itself and, on private property, meet you at the door. Not among the “D’s” features: A heretofore unimagined self-driving system that re-invents driving as we know it.”</p><p>Original article: <a href="http://www.washingtonpost.com/blogs/the-switch/wp/2014/10/10/the-switchboard-elon-musk-introduces-the-tesla-d/">The Switchboard: Elon Musk introduces the Tesla ‘D’</a></p>'
            }
        },
        {
            id: 3,
            title: 'Cure for cancer found',
            coverage:
            {
                isAvailable: false
            }
        }
    ]
};

/**
 * @ngdoc function
 * @name storiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the storiaApp
 */
angular
.module('storiaApp')
.controller('MainCtrl', function ($scope)
{
    $scope.events = data.events;
});
