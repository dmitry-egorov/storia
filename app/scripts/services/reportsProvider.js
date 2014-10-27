'use strict';

angular
.module ('stServices')
.service('reportsProvider', ['chance', 'FBURL', '$firebase', 'fbDebug', function(chance, FBURL, $firebase, fbDebug)
{
    var ref = new Firebase(FBURL);

    this.getBy = function(reportId)
    {
        var reportRef = ref.child('reports').child(reportId);

        fbDebug.watchValue(reportRef, 'report');

        return $firebase(reportRef).$asObject();
    };
}]);

