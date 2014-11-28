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

        tryAddEvent()
        {
            this.eventsStorage.addEventPromiseId(this.title).then(id =>
            {
                this.$location.path('/events/' + id);
            });

            return true;
        }
    }
}

angular.module('storiaApp').controller('AddEventCtrl', StoriaApp.AddEventDialogController);
