/// <reference path="../_all.ts" />

'use strict';


module StoriaApp
{
    export class AddEventDialogController
    {
        title: string;
        cantAdd: boolean;

        private busy: boolean;

        public static $inject = ['$scope', '$location', 'EventsStorage'];

        constructor($scope, private $location, private eventsStorage: StoriaApp.EventsStorage)
        {
            this.busy = false;
            this.title = '';
            $scope.vm = this;
            $scope.$watch('vm.title', () =>
            {
                this.updateCantAdd();
            })
        }

        tryAddEvent()
        {
            this.busy = true;
            this.updateCantAdd();

            this.eventsStorage.addEvent(this.title).then(id =>
            {
                this.$location.path('/events/' + id);
                this.busy = false;
                this.updateCantAdd();
            });

            return true;
        }

        private updateCantAdd()
        {
            this.cantAdd = !this.title || this.title.trim() === '' || this.busy;
        }
    }
}
