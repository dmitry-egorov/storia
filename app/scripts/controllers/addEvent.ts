/// <reference path="../_all.ts" />

'use strict';


module StoriaApp
{
    export class AddEventDialogController
    {
        private title: string;

        public static $inject = ['$scope', '$location', 'EventsStorage'];
        constructor($scope, private $location, private eventsStorage: StoriaApp.EventsStorage)
        {
            this.title = '';
            $scope.vm = this;
        }

        tryAddEvent(title: string)
        {
            this.eventsStorage.addEventPromiseId(title).then(id =>
            {
                this.$location.path('/events/' + id);
            });

            return true;
        }
    }
}

/**
 * @ngdoc function
 * @name storiaApp.controller:AddEventCtrl
 * @description
 * # AddEventCtrl
 * Controller of the storiaApp
 */
angular.module('storiaApp').controller('AddEventCtrl', StoriaApp.AddEventDialogController);
